import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShelterModule } from './shelter/shelter.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseError } from 'mongoose';
import { PetModule } from './pet/pet.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_SERVER}/?retryWrites=true&w=majority&appName=PiclesCluster`,
        dbName:process.env.MONGO_DATABASE,
        connectionErrorFactory:(e:MongooseError) => {
          return e
        }
      }),
      
    }),
    ShelterModule,
    PetModule,
    /* MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_SERVER}/${process.env.MONGO_DATABASE}/?retryWrites=true&w=majority&appName=PiclesCluster`,
    ), */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
