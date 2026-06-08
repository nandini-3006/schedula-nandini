import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Patient } from './patient.entity';
import { User } from '../auth/user.entity';

import { CreatePatientDto } from './dto/create.dto';
import { UpdatePatientDto } from './dto/update.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createProfile(
    userId: number,
    createPatientDto: CreatePatientDto,
  ) {
    const existingProfile =
      await this.patientRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
      });

    if (existingProfile) {
      throw new ConflictException(
        'Patient profile already exists',
      );
    }

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    const patient =
      this.patientRepository.create({
        ...createPatientDto,
        user,
      });

    return this.patientRepository.save(
      patient,
    );
  }

  async getProfile(userId: number) {
    const patient =
      await this.patientRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
        relations: {
          user: true,
        },
      });

    if (!patient) {
      throw new NotFoundException(
        'Patient profile not found',
      );
    }

    return patient;
  }

  async updateProfile(
    userId: number,
    updatePatientDto: UpdatePatientDto,
  ) {
    const patient =
      await this.patientRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
      });

    if (!patient) {
      throw new NotFoundException(
        'Patient profile not found',
      );
    }

    Object.assign(
      patient,
      updatePatientDto,
    );

    return this.patientRepository.save(
      patient,
    );
  }
}