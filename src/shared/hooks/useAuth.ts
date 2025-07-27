import { AuthContext } from '@/shared/contexts/AuthContext';
import { useContext } from 'react';

export const useAuth = () => useContext(AuthContext);
