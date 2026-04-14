import { useUserStore } from '../store/userStore';
import { useLocation } from 'wouter';

export const useAuth = () => {
  const { user, isLoggedIn, login, logout, updateUser } = useUserStore();
  const [, setLocation] = useLocation();

  const signIn = (email: string, firstName?: string, lastName?: string) => {
    login({
      id: 'u1',
      firstName: firstName || 'Alex',
      lastName: lastName || 'Chen',
      email,
      joinedAt: new Date().toISOString(),
    });
  };

  const signOut = () => {
    logout();
    setLocation('/');
  };

  const requireAuth = (redirectTo = '/auth/login') => {
    if (!isLoggedIn) {
      setLocation(redirectTo);
      return false;
    }
    return true;
  };

  return { user, isLoggedIn, signIn, signOut, requireAuth, updateUser };
};
