export type SourceFn<T> = (...args: Array<void | undefined>) => T;

export interface HandlerOptions {
  memoize?: boolean;
  disable?: { [P in SwitchableKey]?: boolean };
}

export type ProxyHandlerKey = keyof ProxyHandler<any>;
export type SwitchableKey = Exclude<ProxyHandlerKey, 'apply' | 'construct'>;
