import { Navigate, Outlet, useParams } from 'react-router';

type CheckParamsProps = Record<string, RegExp>;

export const CheckParams = (props: CheckParamsProps) => {
    const params = useParams();
    if (
        Object.entries(props).some(([key, reg]) => !reg.test(params[key] ?? ''))
    ) {
        return <Navigate to="/not-found" replace />;
    }
    return <Outlet />;
};
