import { type Ability } from '@/shared/types/Models/Ability';
import { type State } from '@/shared/types/Reducers/Standard/State';

export interface AbilityState extends State {
    ability: Ability | null;
}
