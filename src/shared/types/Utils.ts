import { type XOR } from '@/shared/types/Xor';
import { type ActionDispatch } from 'react';

export type WithShow<T, S = false> = T &
    (S extends true
        ? {
              show: boolean;
          }
        : {
              show?: boolean;
          });

export type GenericOrField = XOR<
    { type: 'field'; field: string },
    { type: 'generic' }
>;

export type AD<T> = ActionDispatch<[action: T]>;

type list = unknown[];
export type Explosion<T extends list, W> = list extends T
    ? list
    : T extends [infer First, ...infer Remain]
    ? [W] extends [First]
        ? W
        : Explosion<Remain, W>
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any;

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type Resolve<T> = T extends Function ? T : { [K in keyof T]: T[K] };
