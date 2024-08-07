import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('Users') private userModel: Model<User>) { }
    
    findAll() {
        return this.userModel.find()
    }

    findEmail(email: string) {
        return this.userModel.findOne({email}).exec()
    }
    find(id: string) {
        return this.userModel.findById(id).exec()
    }

    async create(userDto: CreateUserDto) {
        const user = await this.userModel.create(userDto)
        return user.save()
    }

    async update(id: string, userDto: Partial<User>) {
        try {
            const update = await this.userModel.findByIdAndUpdate(id, userDto)
            return update.save()
        } catch {
            throw new NotFoundException('Id Tidak Ditemukan')
        }
    }
}
