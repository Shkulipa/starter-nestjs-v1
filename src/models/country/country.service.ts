import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEmpty, pick } from 'lodash';
import { Model, Types } from 'mongoose';
import { IParsedQuery } from 'src/common/interfaces/query.interfaces';
import { S3Service } from 'src/models/s3/s3.service';
import { CreateCountryDto } from './dto/createCountry.dto';
import { UpdateCountryDto } from './dto/updateCountry.dto';
import { Country, CountryDocument } from './entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<CountryDocument>,
    private readonly s3Service: S3Service,
  ) {}

  private readonly path = 'public/countries';
  private readonly logger = new Logger(CountryService.name);

  async getAll(query: IParsedQuery) {
    const { limit, page } = query;

    try {
      const countries = await this.countryModel
        .find()
        .skip(limit * page - limit)
        .limit(limit)
        .select(['-key']);

      const count = await this.countryModel.find().count();

      return { countries, count };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async findById(id: string) {
    try {
      const country = await this.countryModel.findById(new Types.ObjectId(id));
      if (!country)
        throw new HttpException("Country wasn't found", HttpStatus.NOT_FOUND);

      return country;
    } catch (err) {
      throw err;
    }
  }

  async create(file: Express.Multer.File, createCountryDto: CreateCountryDto) {
    try {
      // load file in s3
      const { urlFile, key } = await this.s3Service.create(file, this.path);

      const newCountryData = {
        country: createCountryDto.country,
        flag: urlFile,
        key,
      };
      const newCountry = await this.countryModel.create(newCountryData);

      const res = {
        _id: newCountry._id,
        ...newCountryData,
      };

      return res;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async update(
    file: Express.Multer.File,
    updateCountryDto: UpdateCountryDto,
    id: string,
  ) {
    try {
      const country = await this.findById(id);
      const newCountryData = {
        ...pick(country, ['country', 'flag', 'key']),
      };

      if (file) {
        await this.s3Service.delete(country.key);
        const fileData = await this.s3Service.create(file, this.path);
        const updatedObj = { flag: fileData.urlFile, key: fileData.key };
        Object.assign(newCountryData, updatedObj);
      }

      const isEmptyBody = isEmpty(updateCountryDto);
      if (!isEmptyBody) Object.assign(newCountryData, updateCountryDto);

      // https://mongoosejs.com/docs/tutorials/findoneandupdate.html
      const updatedCountry = await this.countryModel.findOneAndUpdate(
        { _id: country._id },
        {
          $set: newCountryData,
        },
        {
          new: true,
        },
      );

      return updatedCountry;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async delete(id: string) {
    try {
      const country = await this.countryModel.findById(new Types.ObjectId(id));

      if (!country)
        throw new HttpException("Country wasn't found", HttpStatus.BAD_REQUEST);

      await this.s3Service.delete(country.key);
      return await this.countryModel.findByIdAndRemove(new Types.ObjectId(id));
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
