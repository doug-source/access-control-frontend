import { ComponentPropsWithRef } from 'react';
import { ApprovalDialog } from './shared/Approval';
import { AttachDialog } from './shared/Attach';
import { Base as BaseDialog } from './shared/Base';
import { DetachDialog } from './shared/Detach';
import { RemotionDialog } from './shared/Remotion';
import { RestorationDialog } from './shared/Restoration';
import { SelectDialog } from './shared/Select';

export const Dialog = (props: ComponentPropsWithRef<typeof BaseDialog>) => (
    <BaseDialog {...props} />
);

Dialog.Remotion = RemotionDialog;
Dialog.Attach = AttachDialog;
Dialog.Detach = DetachDialog;
Dialog.Restoration = RestorationDialog;
Dialog.Approval = ApprovalDialog;
Dialog.Select = SelectDialog;
