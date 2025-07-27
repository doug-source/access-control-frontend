import { VerifyEmailTemplate } from '@/components/templates/VerifyEmailTemplate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { VerifyEmailRequesterProvider } from '@/shared/providers/VerifyEmailRequesterProvider';
import { useDeps } from './shared/useDeps';

/**
 * This view is used in two contexts:
 * -   When the user logs in on the application no validation from email
 * -   When the user validates from email's inbox (redirection)
 *
 * The application itself checks the user's email validation status after log in and
 * redirects it internally to '/email/verify/' route, showing this component's final rendering.
 *
 * When user is redirected by email's inbox to application from verification email,
 * it uses the '/email/verify/:id/:hash' route. These parameters' presence (id and hash)
 * triggers the validation request to server. In this case, the final rendering is only shown
 * if there are any errors after this validation (token invalid, for example).
 *
 * Otherwise, after successfully validation, this component's final rendering is not also
 * shown and the user is redirected to '/home' route.
 */
export const VerifyEmail = () => {
    const [state, dispatch] = useDeps();
    return (
        <VerifyEmailRequesterProvider>
            <DispatchProvider dispatch={dispatch}>
                <VerifyEmailTemplate state={state} />
            </DispatchProvider>
        </VerifyEmailRequesterProvider>
    );
};
