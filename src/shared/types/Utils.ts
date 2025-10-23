import type { XOR } from '@/shared/types/Xor';

export type PropsWithShow<T, S = false> = T &
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

export type UnionToIntersection<U> =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (U extends any ? (x: U) => void : never) extends (x: infer I) => void
        ? I
        : never;

/**
 * Source: https://matthias-falk.medium.com/tuple-union-conversions-in-typescript-77fef29cd6e6
 */
type Impossible = never;
type InvalidTypeParameter = null;

type UnionToUnionOfZeroAryFunctionTypes<FiniteUnion> =
    FiniteUnion extends unknown ? () => FiniteUnion : Impossible;

type UnionOfZeroAryFunctionsToIntersection<UnionOfZeroAryFunctions> = (
    UnionOfZeroAryFunctions extends unknown
        ? (k: UnionOfZeroAryFunctions) => void
        : Impossible
) extends (k: infer FunctionsIntersection) => void
    ? FunctionsIntersection
    : Impossible;

type GetSomeFiniteUnionComponentByDirtyTrick<FiniteUnion> =
    UnionOfZeroAryFunctionsToIntersection<
        UnionToUnionOfZeroAryFunctionTypes<FiniteUnion>
    > extends () => infer R
        ? R
        : InvalidTypeParameter;

export type TuplifyUnion<U> =
    GetSomeFiniteUnionComponentByDirtyTrick<U> extends infer Element
        ? [U] extends [never]
            ? []
            : TuplifyUnion<Exclude<U, Element>> extends infer RestTuple
            ? RestTuple extends unknown[]
                ? [...RestTuple, Element]
                : Impossible
            : Impossible
        : Impossible;
