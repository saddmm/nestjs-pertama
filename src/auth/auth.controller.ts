import { Body, Controller, Post, Session, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { CurrentUser } from 'src/current-user/current-user.decorator';
import { User } from 'src/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto, @Session() session: any) {
      const user = await this.authService.register(body)
      session.userId = user.id
      return user
    }
    
    @Post('login')
    async login(@Body() body: {email: string, password: string}, @Session() session: any) {
        const user = await this.authService.login(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Get('session')
    getSession(@CurrentUser() user: User) {
        return user
    }

    @Post('logout')
    logout(@Session() session: any) {
        session.userId = null
        return "Berhasil Logout"
    }

}
