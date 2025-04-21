/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: 타입 제한 추가
export const pipe =
  <F extends (args: any) => any>(...fns: F[]) =>
  (initial: any) =>
    fns.reduce((acc, fn) => fn(acc), initial);
