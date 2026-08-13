import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessRequestsService } from './access-requests.service';
import { CreateAccessRequestDto } from './dto/create-access-request.dto';
import { CurrentUser } from '../common/current-user.decorator';
import { AuthUser } from '../common/authz';

@ApiTags('access-requests')
@ApiBearerAuth()
@Controller('access-requests')
export class AccessRequestsController {
  constructor(private readonly accessRequests: AccessRequestsService) {}

  @Get('mine')
  mine(@CurrentUser() user: AuthUser) {
    return this.accessRequests.mine(user);
  }

  @Get('to-review')
  toReview(@CurrentUser() user: AuthUser) {
    return this.accessRequests.toReview(user);
  }

  @Post()
  create(@Body() dto: CreateAccessRequestDto, @CurrentUser() user: AuthUser) {
    return this.accessRequests.create(dto, user);
  }

  @Post(':id/approve')
  approve(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.accessRequests.approve(id, user);
  }

  @Post(':id/reject')
  reject(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.accessRequests.reject(id, user);
  }
}
