import { Outlet, useParams } from 'react-router';
import { LocalNavigate } from '../../atoms/LocalNavigate';

type CheckParamsProps = Record<string, RegExp>;

export const CheckParams = (props: CheckParamsProps) => {
    const params = useParams();
    if (
        Object.entries(props).some(([key, reg]) => !reg.test(params[key] ?? ''))
    ) {
        return <LocalNavigate to="/not-found" replace />;
    }
    return <Outlet />;
};
