import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString, MinLength } from 'class-validator';

export class CreateAccessRequestDto {
  @ApiProperty({ enum: ['node', 'dataset', 'service'] })
  @IsIn(['node', 'dataset', 'service'])
  resourceType!: 'node' | 'dataset' | 'service';

  @ApiProperty()
  @IsString()
  @MinLength(1)
  resourceId!: string;
}
