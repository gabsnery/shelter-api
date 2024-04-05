import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShelterModule } from './shelter/shelter.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ShelterModule,ConfigModule.forRoot(),MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@piclescluster.rp7cza0.mongodb.net/picles/?retryWrites=true&w=majority&appName=PiclesCluster`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
