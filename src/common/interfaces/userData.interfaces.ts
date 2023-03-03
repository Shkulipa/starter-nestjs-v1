import { UserDocument } from 'src/models/user/entities/user.entity';

export type IUserData = Pick<
  UserDocument,
  '_id' | 'username' | 'email' | 'roles'
>;
