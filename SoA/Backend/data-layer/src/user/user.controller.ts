import { Controller, Get, HttpException, Param } from "@nestjs/common";
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll().catch(err => {
      throw new HttpException({
        message: err.message,

      }, err.statusCode)
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id).catch(err => {
      throw new HttpException({
        message: err.message,

      }, err.statusCode)
    });
  }
}
