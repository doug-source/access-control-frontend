import { type Ability } from '@/shared/types/Models/Ability';
import { type State } from '../States';

export interface AbilityState extends State {
    ability: Ability | null;
}
