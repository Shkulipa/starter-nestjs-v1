import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { S3Module } from 'src/models/s3/s3.module';
import { JwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { Country, CountrySchema } from './entities/country.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
    S3Module,
    JwtModule,
    UserModule,
  ],
  controllers: [CountryController],
  providers: [CountryService],
  exports: [CountryService],
})
export class CountryModule {}
