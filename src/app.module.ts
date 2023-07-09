import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, ReviewModule],
})
export class AppModule {}
