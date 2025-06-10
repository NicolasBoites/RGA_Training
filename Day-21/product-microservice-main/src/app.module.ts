import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // type: 'mysql',
      type: 'mongodb',
      url: 'mongodb://localhost:27017/microservicedb',
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: null,
      // database: 'product_microservice',
      entities: [ProductEntity],
      synchronize: true, // SOLO para desarrollo, NO en producción
    }),
    TypeOrmModule.forFeature([ProductEntity])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
