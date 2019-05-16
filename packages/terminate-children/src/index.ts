import tree from 'ps-tree';
import alive from './alive';

export interface IOptions {
  signal?: string;
  interval?: number;
  filter?: (pid: number) => boolean;
  timeout?: number | null;
}

const defaults: Required<IOptions> = {
  signal: 'SIGTERM',
  filter: () => true,
  interval: 25,
  timeout: null
};

export default async function terminateChildren(
  pid: number,
  options?: IOptions
): Promise<number[]> {
  const opts = Object.assign({}, defaults, options);

  const children: number[] = await new Promise(
    (resolve: (value: readonly tree.PS[]) => void, reject) => {
      return tree(pid, (err, children) => {
        err ? reject(err) : resolve(children);
      });
    }
  ).then((children) => {
    return children
      .map((child) => parseInt(child.PID))
      .filter((pid) => opts.filter(pid));
  });

  for (let pid of children) {
    try {
      process.kill(pid, opts.signal);
    } catch (_) {}
  }

  let pending: number[] = alive(children);
  if (
    !pending.length ||
    (typeof opts.timeout === 'number' && opts.timeout <= 0)
  ) {
    return pending;
  }

  let start = Date.now();
  while (
    typeof opts.timeout !== 'number' ||
    Date.now() - start < opts.timeout
  ) {
    let next =
      typeof opts.timeout === 'number'
        ? Math.min(opts.interval, opts.timeout - (Date.now() - start))
        : opts.interval;
    await new Promise((resolve) => setTimeout(resolve, next));
    pending = alive(children);
    if (!pending.length) break;
  }

  return pending;
}
