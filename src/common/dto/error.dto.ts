import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty({
    type: String,
  })
  statusCode: string;

  @ApiProperty({
    type: [String],
  })
  message: string[];

  @ApiProperty({
    type: String,
  })
  error: string;
}
