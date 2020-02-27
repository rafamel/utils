/* istanbul ignore file */

export type Disable = { [P in DisableKeys]?: boolean };
export type DisableKeys = Exclude<
  keyof ProxyHandler<any>,
  'apply' | 'construct'
>;

export class Handler<T extends object> implements Required<ProxyHandler<T>> {
  public static proxy<T extends object, U extends object = T>(
    source: () => T,
    memoize?: boolean,
    disable?: Disable
  ): U {
    return new Proxy({}, new this(source, memoize, disable)) as U;
  }
  private source: () => T;
  private disable: Disable;
  public constructor(source: () => T, memoize?: boolean, disable?: Disable) {
    this.disable = disable || {};
    this.source = memoize
      ? () => {
          const value = source();
          this.source = () => value;
          return value;
        }
      : source;
  }
  private get self(): T {
    return this.source();
  }
  public getPrototypeOf(_: T): object | null {
    return this.disable.getPrototypeOf
      ? null
      : Reflect.getPrototypeOf(this.self);
  }
  public setPrototypeOf(_: T, value: any): boolean {
    return this.disable.setPrototypeOf
      ? false
      : Reflect.setPrototypeOf(this.self, value);
  }
  public isExtensible(_: T): boolean {
    return this.disable.isExtensible ? false : Reflect.isExtensible(this.self);
  }
  public preventExtensions(_: T): boolean {
    return this.disable.preventExtensions
      ? false
      : Reflect.preventExtensions(this.self);
  }
  public getOwnPropertyDescriptor(
    _: T,
    key: PropertyKey
  ): PropertyDescriptor | undefined {
    return this.disable.getOwnPropertyDescriptor
      ? undefined
      : Reflect.getOwnPropertyDescriptor(this.self, key);
  }
  public has(_: T, key: PropertyKey): boolean {
    return this.disable.has ? false : Reflect.has(this.self, key);
  }
  public get(_: T, key: PropertyKey, receiver: any): any {
    return this.disable.get ? undefined : Reflect.get(this.self, key, receiver);
  }
  public set(_: T, key: PropertyKey, value: any, receiver: any): boolean {
    return this.disable.set
      ? false
      : Reflect.set(this.self, key, value, receiver);
  }
  public deleteProperty(_: T, key: PropertyKey): boolean {
    return this.disable.deleteProperty
      ? false
      : Reflect.deleteProperty(this.self, key);
  }
  public defineProperty(
    _: T,
    key: PropertyKey,
    attributes: PropertyDescriptor
  ): boolean {
    return this.disable.defineProperty
      ? false
      : Reflect.defineProperty(this.self, key, attributes);
  }
  public enumerate(_: T): PropertyKey[] {
    return this.disable.enumerate
      ? []
      : Array.from(Reflect.enumerate(this.self));
  }
  public ownKeys(_: T): PropertyKey[] {
    return this.disable.ownKeys ? [] : Reflect.ownKeys(this.self);
  }
  public apply(_: T, self: any, args?: any): any {
    return Reflect.apply(this.self as Function, self, args);
  }
  public construct(_: T, args: any, target?: any): object {
    return Reflect.construct(this.self as Function, args, target);
  }
}
