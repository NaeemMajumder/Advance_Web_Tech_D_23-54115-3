import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  @Post('register')
  register(@Body() body: CreateUserDto) {
    return {
      message: 'User registered successfully',
      user: {
        fullName: body.fullName,
        email: body.email,
        age: body.age,
        accountType: body.accountType,
      },
    };
  }
}