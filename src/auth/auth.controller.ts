import { Controller } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { Body, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
     constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto);
}

@Get('doctor/profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('DOCTOR')
doctorProfile() {
  return {
    message: 'Doctor Profile Accessed',
  };
}

@Get('patient/profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PATIENT')
patientProfile() {
  return {
    message: 'Patient Profile Accessed',
  };
}

}


