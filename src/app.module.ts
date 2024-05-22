import { Module } from '@nestjs/common';
import { PaymentsModule } from './components/payments/payments.module';

@Module({
  imports: [PaymentsModule],
})
export class AppModule {}
