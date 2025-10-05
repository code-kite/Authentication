import { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import UserInfo from '../types/auth/User';
import * as schema from './schema';


class UserAuthService  {

  async getUserInfo(db: ExpoSQLiteDatabase) {
    return await db.select().from(schema.users).all()
  }

  async createUser(user: UserInfo,db: ExpoSQLiteDatabase) {
    const newuser = {email: user.email, username: user.name, password: user.password}
    return await db.insert(schema.users).values(newuser)
  }
}

export default UserAuthService