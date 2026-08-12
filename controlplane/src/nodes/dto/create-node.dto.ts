import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateNodeDto {
  @ApiPropertyOptional({ description: 'Client-supplied id; generated server-side if omitted' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  name!: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  institution!: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  location!: string;

  @ApiProperty({ enum: ['greenfield', 'brownfield'] })
  @IsIn(['greenfield', 'brownfield'])
  archetype!: 'greenfield' | 'brownfield';

  @ApiPropertyOptional({ enum: ['online', 'degraded', 'offline'] })
  @IsOptional()
  @IsIn(['online', 'degraded', 'offline'])
  status?: 'online' | 'degraded' | 'offline';

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsString()
  onboardedVia!: string;
}
