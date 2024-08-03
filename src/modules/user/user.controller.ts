import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from './decorator/user.decorator';
import { PaginationDto } from '../../libs/pagination/pagination';
import { FollowerRequestDto, UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@CurrentUser() user: any) {
    return this.userService.getMe(user.id);
  }

  @Get('followers')
  getFollowers(@CurrentUser() user: any, @Query() data: PaginationDto) {
    return this.userService.getFollowers(user.id, data);
  }

  @Post('update')
  updateUser(@CurrentUser() user: any, @Body() data: UpdateUserDto) {
    return this.userService.updateUser(user.id, data);
  }

  @Delete('delete')
  deleteUser(@CurrentUser() user: any) {
    return this.userService.deleteUser(user.id);
  }

  @Post('follow-request')
  followerRequest(@CurrentUser() user: any, @Body() data: FollowerRequestDto) {
    return this.userService.followerRequest(data, user.id);
  }

  @Put('accept-follow-request/:id')
  acceptFollowerRequest(@CurrentUser() user: any, @Param('id') id: string) {
    return this.userService.acceptFollowerRequest(id, user.id);
  }

  @Put('unfollow/:id')
  unfollowUser(@CurrentUser() user: any, @Param('id') id: string) {
    return this.userService.unfollowUser(id);
  }

  @Get('search')
  searchUser(@Query() data: PaginationDto) {
    return this.userService.searchUser(data);
  }

  @Get('get-user-by-id/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get('get-user-posts/:id')
  getUserPosts(@Param('id') id: string, @Query() data: PaginationDto) {
    return this.userService.getUserPosts(id, data);
  }
}
