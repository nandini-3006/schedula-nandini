import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '../auth/user.entity';
import { OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  fullName: string;

  @Column()
  specialization: string;

  @Column()
  experience: number;

  @Column()
  qualification: string;

  @Column()
  consultationFee: number;

  @Column()
  availability: string;

  @Column({ nullable: true })
  profileDetails: string;
}