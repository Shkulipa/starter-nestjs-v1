import { IsOptional } from 'class-validator';

export class UpdateCountryDto {
  @IsOptional()
  readonly country: string;
}
