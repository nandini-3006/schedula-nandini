import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';

import { PatientService } from './patient.service';

import { CreatePatientDto } from './dto/create.dto';
import { UpdatePatientDto } from './dto/update.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
  ) {}

  @Post('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  createProfile(
    @Request() req,
    @Body() createPatientDto: CreatePatientDto,
  ) {
    return this.patientService.createProfile(
      req.user.id,
      createPatientDto,
    );
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  getProfile(@Request() req) {
    return this.patientService.getProfile(
      req.user.id,
    );
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  updateProfile(
    @Request() req,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientService.updateProfile(
      req.user.id,
      updatePatientDto,
    );
  }
}