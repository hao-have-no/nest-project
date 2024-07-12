import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService:JwtService
    ) {}

    // 校验用户
    async validateUser(username: string, pass: string): Promise<any> {
      console.log('username',username);
        const user = await this.userService.findOne(username);
        if (user && user.password === pass) {
          return user;
        }
        return null;
    }


   // 用户登录 获取token
    async login(user: any) {
      const isTrue = await this.validateUser(user.username, user.password);
      if(isTrue){
        const payload = { username: user.username  };
        const token = this.jwtService.sign(payload);
        return {
          access_token: 'Bearer  ' + token,
        };
      }else {
        return '账号或密码错误！';
      }
   }

   
    /**
   * 从令牌中获取数据声明
   *
   * @param token 令牌
   * @return 数据声明
   */
    parseToken(token: string) {
      try {
        if (!token) return null;
        console.log(token)
        const payload = this.jwtService.verify(token);
        console.log(payload)
        return payload;
      } catch (error) {
        console.log(error)
        return null;
      }
    }
}
