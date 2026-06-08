import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
     constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

     async signup(signupDto: SignupDto) {
    const existingUser = await this.userRepository.findOne({
    where: { email: signupDto.email },
  });

  if (existingUser) {
    throw new UnauthorizedException('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(signupDto.password, 10);

  const user = this.userRepository.create({
    ...signupDto,
    password: hashedPassword,
  });

  await this.userRepository.save(user);

  return {
    message: 'User registered successfully',
    user,
  };
}
  async login(loginDto: LoginDto) {
  const user = await this.userRepository.findOne({
    where: {
      email: loginDto.email,
    },
  });

  if (!user) {
    throw new UnauthorizedException('User not found');
  }

  const isPasswordValid = await bcrypt.compare(
  loginDto.password,
  user.password,
);

if (!isPasswordValid) {
  throw new UnauthorizedException('Wrong password');
}

  const payload = {
     id: user.id,
    email: user.email,
    role: user.role,
  };

  return {
    access_token: this.jwtService.sign(payload),
  };
}
}
