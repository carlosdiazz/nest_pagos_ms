import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { Request, Response } from 'express';

//Propio
import { envs } from 'src/config/envs';
import { PaymentSessionDto } from './dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(envs.STRIPE_SECRET);

  public async createPaymentSession(paymentSessionDto: PaymentSessionDto) {
    const { currrency, orderId } = paymentSessionDto;
    const lineItems = paymentSessionDto.items.map((item) => {
      return {
        price_data: {
          currency: currrency,
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.queantity,
      };
    });

    const session = await this.stripe.checkout.sessions.create({
      // Colocar aqui el ID de mi orden
      payment_intent_data: {
        metadata: {
          orderId: orderId,
        },
      },

      line_items: lineItems,
      mode: 'payment',
      success_url: envs.STRIPE_SUCCESS_URL,
      cancel_url: envs.STRIPE_CANCEL_URL,
    });

    return session;
  }

  async stripeWebhook(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'];
    let event: Stripe.Event;
    const endpointSecret = envs.STRIPE_ENDPOINTSECRET;
    try {
      event = this.stripe.webhooks.constructEvent(
        req['rawBody'],
        sig,
        endpointSecret,
      );
    } catch (e) {
      res.status(400).send(`Webhook Error: ${e.message}`);
      return;
    }
    switch (event.type) {
      case 'charge.succeeded':
        //TODO llamar Microservicio
        console.log(event.data.object.metadata.orderId);
        break;

      default:
        console.log(`Event ${event.type} not handled`);
    }

    res.status(200).json({ msg: sig });
  }
}
