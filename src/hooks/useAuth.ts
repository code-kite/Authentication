import { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { useEffect, useState } from 'react';
import UserAuthService from '../database/db-services';
import { User } from '../database/schema';
import UserInfo from '../types/auth/User';

export const useAuth = (db: ExpoSQLiteDatabase) => {
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  const service = new UserAuthService()

  const fetchUser = async () => {
    setLoading(true);
    const data = await service.getUserInfo(db);
    setUser(data);
    setLoading(false);
  };
  

  useEffect(() => {
    fetchUser();
  }, []);

  const addUser = async (user: UserInfo) => {
    await service.createUser(user, db);
    fetchUser();
  };

  return { user, loading, addUser};
};
