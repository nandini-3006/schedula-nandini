import { Role } from '../../common/role.enum';

export class SignupDto {
  email: string;
  password: string;
  role: Role;
}