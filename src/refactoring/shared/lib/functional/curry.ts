// TODO: any 타입 안 쓸 수 있는 방법 있는지 확인
/* eslint-disable @typescript-eslint/no-explicit-any */
type Tail<T extends unknown[]> = T extends [unknown, ...infer U] ? U : [];

type Length<T extends unknown[]> = T["length"];

type Drop<
  N extends number,
  T extends unknown[],
  I extends unknown[] = []
> = Length<I> extends N ? T : Drop<N, Tail<T>, [unknown, ...I]>;

export default Drop;

type CleanGaps<O extends any[]> = {
  [K in keyof O]: NonNullable<O[K]>;
};

type Cast<T1, T2> = T1 extends T2 ? T1 : T2;

type Gaps<L extends unknown[]> = Cast<
  CleanGaps<{ [K in keyof L]?: L[K] }>,
  unknown[]
>;

type Curry<F extends (...args: any[]) => any> = <
  T extends any[],
  G = Drop<Length<T>, Parameters<F>>
>(
  ...args: Cast<T, Gaps<Parameters<F>>>
) => G extends [any, ...any[]]
  ? Curry<(...args: G) => ReturnType<F>>
  : ReturnType<F>;

export const curry = <F extends (...args: any[]) => any>(fn: F): Curry<F> => {
  const arity = fn.length;

  const resolver = (...args: any[]) => {
    const memory = [...args];

    if (memory.length >= arity) {
      return fn(...memory);
    }

    return (...args2: any[]) => {
      const allArgs = [...memory, ...args2];
      return resolver(...allArgs);
    };
  };

  return resolver;
};
