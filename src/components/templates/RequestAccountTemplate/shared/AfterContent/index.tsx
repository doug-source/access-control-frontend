import { CommonRow } from '@/components/atoms/CommonRow';
import { GoogleIcon } from '@/components/atoms/icons/GoogleIcon';
import { Divisor } from '@/components/molecules/Divisor';
import { SocialLoginLink } from '@/components/molecules/SocialLoginLink';
import { memo } from 'react';

interface AfterContentProps {
    providerLink: string;
}

export const AfterContent = memo(({ providerLink }: AfterContentProps) => (
    <>
        <Divisor>ou</Divisor>
        <CommonRow>
            <SocialLoginLink href={providerLink} type="secondary">
                <GoogleIcon />
                <div>Continue com Google</div>
            </SocialLoginLink>
        </CommonRow>
    </>
));
