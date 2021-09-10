import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketplacePgRepository } from "@unique-network/unique-migrations-seeds"
import config from './config';
import { OffersController } from './offers/offers.controller';
import { OffersService } from './offers/offers.service';

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
  controllers: [OffersController],
  providers: [
    OffersService,
  ],
})
export class AppModule {}
