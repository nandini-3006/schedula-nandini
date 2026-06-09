import {
  BadRequestException,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ILike } from 'typeorm';
import { UpdateDoctorDto } from './dto/update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Doctor } from './doctor.entity';
import { User } from '../auth/user.entity';

import { CreateDoctorDto } from './dto/create.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createProfile(
    userId: number,
    createDoctorDto: CreateDoctorDto,
  ) {
    const existingProfile = await this.doctorRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (existingProfile) {
      throw new ConflictException(
        'Doctor profile already exists',
      );
    }

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    
    if (!user) {
  throw new Error('User not found');
}

    const doctor = this.doctorRepository.create({
      ...createDoctorDto,
      user,
    });

    return this.doctorRepository.save(doctor);
  }
async getProfile(userId: number) {
  const doctor = await this.doctorRepository.findOne({
    where: {
      user: {
        id: userId,
      },
    },
   relations: {
  user: true,
},
  });

  if (!doctor) {
    throw new NotFoundException(
      'Doctor profile not found',
    );
  }

  return doctor;
}
async updateProfile(
  userId: number,
  updateDoctorDto: UpdateDoctorDto,
) {
  const doctor = await this.doctorRepository.findOne({
    where: {
      user: {
        id: userId,
      },
    },
  });

  if (!doctor) {
    throw new NotFoundException(
      'Doctor profile not found',
    );
  }

  Object.assign(
    doctor,
    updateDoctorDto,
  );

  return this.doctorRepository.save(
    doctor,
  );
}
async getDoctors(
  search?: string,
  specialization?: string,
  page = 1,
  limit = 10,
   availability?: string,
) {

  if (page < 1 || limit < 1) {
    throw new BadRequestException(
      'Page and limit must be positive',
    );
  }

  const query = this.doctorRepository
    .createQueryBuilder('doctor');

  if (search) {
    query.andWhere(
      'LOWER(doctor.fullName) LIKE LOWER(:search)',
      {
        search: `%${search}%`,
      },
    );
  }

  if (specialization) {
    query.andWhere(
      'LOWER(doctor.specialization) = LOWER(:specialization)',
      {
        specialization,
      },
    );
  }
if (availability === 'true') {
  query.andWhere(
    'doctor.availability IS NOT NULL',
  );
}
  query.select([
    'doctor.id',
    'doctor.fullName',
    'doctor.specialization',
    'doctor.experience',
    'doctor.consultationFee',
    'doctor.availability',
  ]);

  query.skip((page - 1) * limit);
  query.take(limit);

  const doctors = await query.getMany();

  if (doctors.length === 0) {
    throw new NotFoundException(
      'No doctors found',
    );
  }

  return doctors;
}

async getDoctorById(id: number) {

  const doctor =
    await this.doctorRepository.findOne({
      where: { id },
    });

  if (!doctor) {
    throw new NotFoundException(
      'Doctor not found',
    );
  }

  return doctor;
}
}