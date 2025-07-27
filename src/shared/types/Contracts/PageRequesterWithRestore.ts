import { type RestorationRequest } from '@//shared/types/Contracts/RestorationRequest';
import { type PageRequester } from '@/shared/types/Contracts/PageRequester';
import { type Resolve } from '@/shared/types/Utils';

export type PageRequesterWithRestore = Resolve<
    PageRequester & RestorationRequest
>;
