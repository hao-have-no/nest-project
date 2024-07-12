import { Body, Controller, forwardRef, Get, Inject, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { JwtGuardService } from 'src/guard/jwt-guard.service';
import { AuthService } from 'src/auth/auth.service';


@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private authService: AuthService,
    ) {}

    @UseGuards(JwtGuardService)
    @Post('register')
    async register(@Body() body: CreateUserDto){
        return this.userService.create(body)
    }

    @Post('login')
    async login(@Body() body: CreateUserDto){
        console.log('body',body)
        return this.authService.login(body)
        // return '';
    }


    @UseGuards(JwtGuardService)
    @Post('createUser')
    async createUser(@Body() body: CreateUserDto){
        console.log(body)
        // return 'createUser'
        return this.userService.create(body)
    }

    @UseGuards(JwtGuardService)
    @Get('findAll')
    async findAll(){
        return this.userService.findAll();
    }

    @UseGuards(JwtGuardService)
    @Get('findOne')
    async findOne(@Query('username') username: string){
        console.log('findOne',username)
        return this.userService.findOne(username)
    }

    @UseGuards(JwtGuardService)
    @Post('updateUser')
    async updateUser(@Query('id') id: string,@Body() body: CreateUserDto){
        return this.userService.update(id,body)
    }

    @UseGuards(JwtGuardService)
    @Get('deleteUser')
    async deleteUser(@Query('id') id: string){
        return this.userService.delete(id)
    }
}