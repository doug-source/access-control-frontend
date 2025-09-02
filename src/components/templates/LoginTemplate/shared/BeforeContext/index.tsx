import { CommonRow } from '@/components/atoms/CommonRow';
import { GoogleIcon } from '@/components/atoms/icons/GoogleIcon';
import { SocialLoginLink } from '@/components/molecules/SocialLoginLink';
import { type ComponentPropsWithRef, memo } from 'react';

interface BeforeContentProps extends ComponentPropsWithRef<'div'> {
    providerLink: string;
}

export const BeforeContent = memo(
    ({ providerLink, ...remain }: BeforeContentProps) => (
        <CommonRow {...remain}>
            <SocialLoginLink href={providerLink} type="primary">
                <GoogleIcon />
            </SocialLoginLink>
        </CommonRow>
    )
);
