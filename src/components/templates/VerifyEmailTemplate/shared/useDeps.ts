import { useAuth } from '@/shared/hooks/useAuth';
import { useParams } from 'react-router';
import { EmailRedirectParams } from './types';
import { useVerifyEmailSubmit } from './useVerifyEmailSubmit';
import { useVerifyEmailVerification } from './useVerifyEmailVerification';

export const useDeps = () => {
    const emailRedirect: EmailRedirectParams = useParams();
    const [verified] = useVerifyEmailVerification(emailRedirect);
    const handler = useVerifyEmailSubmit();
    const auth = useAuth();

    return { auth, handler, emailRedirect, verified };
};
