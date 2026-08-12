import { Body, Controller, Delete, Get, Headers, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { CurrentUser } from '../common/current-user.decorator';
import { AuthUser } from '../common/authz';

@ApiTags('services')
@ApiBearerAuth()
@Controller('services')
export class ServicesController {
  constructor(private readonly services: ServicesService) {}

  @Get()
  list(@CurrentUser() user: AuthUser | undefined) {
    return this.services.list(user);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const service = await this.services.getById(id);
    if (!service) throw new NotFoundException(`Service "${id}" not found`);
    return service;
  }

  @Post()
  create(@Body() dto: CreateServiceDto, @CurrentUser() user: AuthUser) {
    return this.services.create(dto, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateServiceDto, @CurrentUser() user: AuthUser) {
    return this.services.update(id, dto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser, @Headers('authorization') authorization?: string) {
    return this.services.remove(id, user, authorization);
  }
}
