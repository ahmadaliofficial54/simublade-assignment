import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'api-key',
) {
  constructor() {
    const headerKeyApiKey = process.env.API_KEY_SECRET;
    super(
      { header: headerKeyApiKey, prefix: '' },
      true,
      async (apiKey: string, done: any) => {
        await this.validate(apiKey, done);
      },
    );
  }

  async validate(apiKey: string, done: any): Promise<any> {
    if (apiKey !== process.env.API_KEY_SECRET) {
      done(new UnauthorizedException(), null);
    }
    done(null, true);
  }
}
