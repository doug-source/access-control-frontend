import { ViewerAdapter } from '@/shared/adapters/ViewerAdapter';
import { httpClientInstance } from '@/shared/utils/globals/generic';

export const viewerInstance = new ViewerAdapter(httpClientInstance);
