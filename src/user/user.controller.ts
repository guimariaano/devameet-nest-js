import {Controller, Get, Request, BadRequestException, Body, Put, HttpCode, HttpStatus} from '@nestjs/common';
import { UserMessagesHelper } from './helpers/message.helper';
import { UserService } from './user.service';

@Controller('user')
export class UserController{
    constructor(private readonly userSerice:UserService){}

    @Get()
    async getUser(@Request() req){
        const {userId} = req?.user;
        const user = await this.userSerice.getUserById(userId);

        if(!user){
            throw new BadRequestException(UserMessagesHelper.GET_USER_NOT_FOUND);
        }

        return {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            id: user._id
        }
    }

}