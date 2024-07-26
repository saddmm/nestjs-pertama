import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async register(userDto: CreateUserDto) {
    const user = await this.userService.findEmail(userDto.email);
    if (user) {
      throw new NotFoundException('email is available');
    }

      const hashPassword = await bcrypt.hash(userDto.password, 10);

      userDto.password = hashPassword
    return this.userService.create(userDto);
    }
    
  async login(email: string, password: string) {
        const user = await this.userService.findEmail(email)
        if (!user) {
            throw new NotFoundException('Email tidak ditemukan')
        }

        const compare = await bcrypt.compare(password, user.password)
        if (!compare) {
            throw new NotFoundException('password salah')
        }

        return user
  }

}
