import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, database, username, password } = configService.database;
        return {
          type: 'postgres',
          host,
          database,
          password,
          username,
          port: 5432,
          entities: ['dist/**/*.entity.{ts,js}'],
          synchronize: true,
        };
      },
      inject: [config.KEY],
    }),
  ],
})
export class DatabaseModule {}
