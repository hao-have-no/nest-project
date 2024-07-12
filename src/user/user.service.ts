import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './user.dto';
import { User, UserDocument } from './user.scheme';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userTest: Model<UserDocument>) {}

  // 创建用户
  async create(CreateUserDto: CreateUserDto): Promise<Object> {
    const userList = await this.userTest.find().exec();
    if(userList.some(item=>item.name == CreateUserDto.name)){
        return '用户已经存在'
    }
    CreateUserDto.role = 'user';
    if(!CreateUserDto.password)CreateUserDto.password = '8888@dd'
    const createUser = new this.userTest(CreateUserDto);
    const temp = await createUser.save();
    return '创建成功';
  }

  // 查询所有
  async findAll(): Promise<User[]> {
    // 这里是异步的
    let temp = await this.userTest.find().exec();
    temp = temp.filter(item=>item.role != 'admin');
    return temp;
  }

  // 查询指定用户
  async findOne(username: string): Promise<User> {
    const temp = await this.userTest.findOne({'name':username}).exec();
    console.log('==>',temp)
    if(temp.role == 'admin'){
      throw new UnauthorizedException('你查询的用户信息为涉密账户');
    }
    return temp;
  }

  // 更新指定用户
  async update(id: string, CreateUserDto: CreateUserDto): Promise<Object> {
    try{
      const temp = await this.userTest.findByIdAndUpdate(id, CreateUserDto, {new: true}).exec();
      return '更新成功';
    }
    catch{
      throw new UnauthorizedException('更新报错')
    }
   
  }

  // 删除指定用户
  async delete(id: string): Promise<Object> {
    try{
      const temp = await this.userTest.findByIdAndDelete(id).exec();
      return '删除成功';
    }
    catch{
      throw new UnauthorizedException('删除报错')
    }
  }
}
