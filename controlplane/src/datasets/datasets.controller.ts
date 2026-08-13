import { Body, Controller, Delete, Get, Headers, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DatasetsService } from './datasets.service';
import { CreateDatasetDto } from './dto/create-dataset.dto';
import { UpdateDatasetDto } from './dto/update-dataset.dto';
import { CurrentUser } from '../common/current-user.decorator';
import { AuthUser } from '../common/authz';

@ApiTags('datasets')
@ApiBearerAuth()
@Controller('datasets')
export class DatasetsController {
  constructor(private readonly datasets: DatasetsService) {}

  @Get()
  list(@CurrentUser() user: AuthUser | undefined) {
    return this.datasets.list(user);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const dataset = await this.datasets.getById(id);
    if (!dataset) throw new NotFoundException(`Dataset "${id}" not found`);
    return dataset;
  }

  @Post()
  create(@Body() dto: CreateDatasetDto, @CurrentUser() user: AuthUser) {
    return this.datasets.create(dto, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDatasetDto, @CurrentUser() user: AuthUser) {
    return this.datasets.update(id, dto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser, @Headers('authorization') authorization?: string) {
    return this.datasets.remove(id, user, authorization);
  }
}
