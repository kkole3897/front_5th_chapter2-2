// TODO: 타입 제한 추가
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const curry = <F extends (...args: any[]) => any>(fn: F) => {
  const arity = fn.length;

  const resolver = (...args: unknown[]) => {
    const memory = [...args];

    if (memory.length >= arity) {
      return fn(...memory);
    }

    return (...args2: unknown[]) => {
      const allArgs = [...memory, ...args2];

      return resolver(...allArgs);
    };
  };

  return resolver;
};
