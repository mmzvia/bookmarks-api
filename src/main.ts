import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: true,
    }),
  );
  const reflector = app.get(Reflector);
  const csi = new ClassSerializerInterceptor(reflector, {
    excludeExtraneousValues: true,
  });
  app.useGlobalInterceptors(csi);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
