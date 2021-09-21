import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketplacePgRepository } from "@unique-network/unique-migrations-seeds"
import config from './config';
import { OffersController } from './offers/offers.controller';
import { OffersService } from './offers/offers.service';
import { OnHoldController } from './on-hold/on-hold.controller';
import { OnHoldService } from './on-hold/on-hold.service';
import { TradesController } from './trades/trades.controller';
import { TradesService } from './trades/trades.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      connectionFactory: () => {
        const repository = new MarketplacePgRepository({
          host: config.dbHost,
          port: config.dbPort,
          username: config.dbUser,
          password: config.dbPassword,
          database: config.dbName,
          logger: "advanced-console",
          logging: "all"
        });
        return repository.connect();
      },
      useFactory: () => ({})
    })
  ],
  controllers: [
    OffersController,
    TradesController,
    OnHoldController
  ],
  providers: [
    OffersService,
    TradesService,
    OnHoldService
  ],
})
export class AppModule {}
