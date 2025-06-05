import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
// import { TransformInterceptor } from './common/interceptor/interceptor.transform';
import { LoggingInterceptor } from './common/interceptor/loggin.interceptors';

async function bootstrap() {

  const app = await NestFactory.create(AppModule,  { cors: true });
  // app.useGlobalInterceptors(new TransformInterceptor()); // Comented because there is a problem with NodeJS

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // necesario para que @Transform() funcione
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());


  const config = new DocumentBuilder()
    .setTitle('Project example')
    .setDescription('The project API description')
    .setVersion('1.0')
    .addTag('project')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/swagger', app, documentFactory, {
    jsonDocumentUrl: 'api/swagger/json',
  });



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
