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

export async function terminateChildrenImplementation(
  pid: number,
  options: Options,
  deps: {
    killProcess: (pid: number, signal: NodeJS.Signals) => void;
    getChildrenPids: (pid: number) => Promise<number[]>;
    filterAlivePids: (pids: number[]) => number[];
  }
): Promise<number[]> {
  const opts = Object.assign({}, defaults, options);
  const filter = opts.filter.bind(opts);
  const children = await deps
    .getChildrenPids(pid)
    .then((children) => children.filter((pid) => filter(pid)));

  for (const pid of children) {
    try {
      deps.killProcess(pid, opts.signal);
    } catch (_) {}
  }

  let pending: number[] = deps.filterAlivePids(children);
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
    pending = deps.filterAlivePids(children);
    if (!pending.length) break;
  }

  return pending;
}
