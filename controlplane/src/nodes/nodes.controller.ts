import { Body, Controller, Delete, ForbiddenException, Get, Headers, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NodesService } from './nodes.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { CurrentUser } from '../common/current-user.decorator';
import { AuthUser, isAdmin } from '../common/authz';

@ApiTags('nodes')
@ApiBearerAuth()
@Controller('nodes')
export class NodesController {
  constructor(private readonly nodes: NodesService) {}

  @Get('pending')
  async listPending(@CurrentUser() user: AuthUser | undefined) {
    if (!isAdmin(user)) throw new ForbiddenException('Admin only');
    return this.nodes.listPending();
  }

  @Get()
  list(@CurrentUser() user: AuthUser | undefined) {
    return this.nodes.list(user);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const node = await this.nodes.getById(id);
    if (!node) throw new NotFoundException(`Node "${id}" not found`);
    return node;
  }

  @Post()
  create(@Body() dto: CreateNodeDto, @CurrentUser() user: AuthUser) {
    return this.nodes.create(dto, user);
  }

  @Post(':id/approve')
  approve(@Param('id') id: string, @CurrentUser() user: AuthUser | undefined) {
    if (!isAdmin(user)) throw new ForbiddenException('Admin only');
    return this.nodes.approve(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser, @Headers('authorization') authorization?: string) {
    return this.nodes.remove(id, user, authorization);
  }
}
