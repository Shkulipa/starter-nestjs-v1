import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/models/user/user.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import mongooseConfig from 'src/configs/database/mongo/mongoose.config';
import { modeConfig } from 'src/configs/app/mode.config';
import { MongoConnection } from 'src/providers/database/mongo/mongoConnection';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from 'src/configs/app/mailer.config';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(modeConfig),
    MongooseModule.forRootAsync(mongooseConfig),
    MailerModule.forRootAsync(mailerConfig),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, MongoConnection],
})
export class AppModule {}
