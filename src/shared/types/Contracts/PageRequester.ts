import type { PaginationRequester } from '@/shared/types/Contracts/PaginationRequester';
import type { RemotionRequester } from '@/shared/types/Contracts/RemotionRequester';
import type { Resolve } from '@/shared/types/Utils';

export type PageRequester = Resolve<PaginationRequester & RemotionRequester>;
