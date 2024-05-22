import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto';
import { Request, Response } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-session')
  public async createPaymentSession(
    @Body() paymentSessionDto: PaymentSessionDto,
  ) {
    return this.paymentsService.createPaymentSession(paymentSessionDto);
  }

  @Post('webhook')
  public async stripeWebhook(@Req() req: Request, @Res() res: Response) {
    console.log('StripeWebHool Call');
    return this.paymentsService.stripeWebhook(req, res);
  }

  @Get('success')
  public async success() {
    return { message: 'success' };
  }

  @Get('cancel')
  public async cancel() {
    return { message: 'cancel' };
  }
}
