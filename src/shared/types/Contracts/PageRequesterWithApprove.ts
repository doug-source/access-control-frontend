import { type Approver } from '@/shared/types/Contracts/Approver';
import { type PageRequester } from '@/shared/types/Contracts/PageRequester';
import { type Resolve } from '@/shared/types/Utils';

export type PageRequesterWithApprove = Resolve<PageRequester & Approver>;
