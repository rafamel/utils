import tree from 'ps-tree';
import alive from './alive';

export interface Options {
  signal?: NodeJS.Signals;
  interval?: number;
  timeout?: number | null;
  filter?: (pid: number) => boolean;
}

const defaults: Required<Options> = {
  signal: 'SIGTERM',
  interval: 25,
  timeout: null,
  filter: () => true
};

export default async function terminateChildren(
  pid: number,
  options?: Options
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

  for (const pid of children) {
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

  const start = Date.now();
  while (
    typeof opts.timeout !== 'number' ||
    Date.now() - start < opts.timeout
  ) {
    const next =
      typeof opts.timeout === 'number'
        ? Math.min(opts.interval, opts.timeout - (Date.now() - start))
        : opts.interval;
    await new Promise((resolve) => setTimeout(resolve, next));
    pending = alive(children);
    if (!pending.length) break;
  }

  return pending;
}
