import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsIn, IsInt, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';

class SampleFileDto {
  @ApiProperty() @IsString() key!: string;
  @ApiProperty() @IsString() filename!: string;
  @ApiProperty() @IsInt() size!: number;
  @ApiProperty() @IsString() contentType!: string;
}

export class CreateDatasetDto {
  @ApiPropertyOptional({ description: 'Client-supplied id; generated server-side if omitted' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  nodeId!: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  title!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty({ enum: ['clinical', 'genomics', 'imaging', 'public-health'] })
  @IsIn(['clinical', 'genomics', 'imaging', 'public-health'])
  track!: 'clinical' | 'genomics' | 'imaging' | 'public-health';

  @ApiProperty()
  @IsInt()
  recordCount!: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  standards!: string[];

  @ApiProperty({ enum: ['open', 'registered', 'dac-approval'] })
  @IsIn(['open', 'registered', 'dac-approval'])
  access!: 'open' | 'registered' | 'dac-approval';

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  tags!: string[];

  @ApiProperty()
  @IsString()
  updatedAt!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => SampleFileDto)
  sampleFile?: SampleFileDto;

  @ApiPropertyOptional({
    enum: ['public', 'private'],
    description: 'Defaults to "public" when omitted (e.g. records created directly via this API).',
  })
  @IsOptional()
  @IsIn(['public', 'private'])
  visibility?: 'public' | 'private';
}
