import { type State } from '@/shared/types/Reducers/Standard/State';

export interface RegisterAccountState extends State {
    token: string | null;
}
