import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { UpdateDoctorDto } from './dto/update.dto';
import { Get } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create.dto';
import { Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('doctor')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
  ) {}

  @Post('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  createProfile(
    @Request() req,
    @Body() createDoctorDto: CreateDoctorDto,
  ) {
    console.log(req.user);
    return this.doctorService.createProfile(
      req.user.id,
      createDoctorDto,
    );
  }
  @Get('profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('DOCTOR')
getProfile(@Request() req) {
  return this.doctorService.getProfile(
    req.user.id,
  );
}
@Patch('profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('DOCTOR')
updateProfile(
  @Request() req,
  @Body() updateDoctorDto: UpdateDoctorDto,
) {
  return this.doctorService.updateProfile(
    req.user.id,
    updateDoctorDto,
  );
}
@Get()
getDoctors(@Query('search') search?: string,
@Query('specialization') specialization?: string,
   @Query('page') page?: string,
  @Query('limit') limit?: string,
) {
  return this.doctorService.getDoctors(search,
    specialization,
     page ? Number(page) : 1,
    limit ? Number(limit) : 10,
  );
}
@Get(':id')
getDoctorById(
  @Param('id') id: number,
) {
  return this.doctorService.getDoctorById(
    Number(id),
  );
}
}