import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateServiceDto {
  @ApiPropertyOptional({ description: 'Client-supplied id; generated server-side if omitted' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({ description: '"platform" for a network-wide service, otherwise the owning node\'s id' })
  @IsString()
  @MinLength(1)
  nodeId!: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  name!: string;

  @ApiProperty({
    enum: [
      'tee-enclave',
      'mlops',
      'federated-query',
      'federated-learning',
      'no-code-editor',
      'jupyter-sandbox',
      'diagnostic-ai',
    ],
  })
  @IsIn(['tee-enclave', 'mlops', 'federated-query', 'federated-learning', 'no-code-editor', 'jupyter-sandbox', 'diagnostic-ai'])
  category!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  operatesOn!: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  openApiSpec?: string;

  @ApiPropertyOptional({
    enum: ['public', 'private'],
    description: 'Defaults to "public" when omitted (e.g. records created directly via this API).',
  })
  @IsOptional()
  @IsIn(['public', 'private'])
  visibility?: 'public' | 'private';
}
