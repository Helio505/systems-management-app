import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SystemModule } from './system/system.module';

@Module({
  imports: [SystemModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
