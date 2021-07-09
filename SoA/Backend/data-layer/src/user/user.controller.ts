import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    try {
      return this.userService.findAll();
    } catch (e) {
      if (!e.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.message, e.status);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(+id);
    } catch (e) {
      if (!e.status){
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(e.message, e.status);
    }
  }
}
