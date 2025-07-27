import { type Paths } from '@/shared/types/Urls/Paths';
import { Navigate } from 'react-router';

type Remain = Omit<Parameters<typeof Navigate>[number], 'to'>;

interface LocalNavigateProps extends Remain {
    to: Paths['navigation']['concrete'];
}

export const LocalNavigate = ({ to, ...remain }: LocalNavigateProps) => {
    return <Navigate to={to} {...remain} />;
};
