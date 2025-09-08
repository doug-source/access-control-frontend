import type { ComponentPropsWithRef } from 'react';
import { Base } from './shared/Base';
import { BtnGroup } from './shared/Group';
import { PrimaryBtn } from './shared/PrimaryBtn';
import { SecondaryBtn } from './shared/SecondaryBtn';

export const Btn = (props: ComponentPropsWithRef<typeof Base>) => (
    <Base {...props} />
);

Btn.PrimaryBtn = PrimaryBtn;
Btn.SecondaryBtn = SecondaryBtn;
Btn.Group = BtnGroup;
