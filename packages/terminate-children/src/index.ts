import pidtree from 'pidtree';

import { filterAlive } from './filter-alive';
import { Options, terminateChildrenImplementation } from './terminate-children';

async function terminateChildren(
  pid: number,
  options?: Options
): Promise<number[]> {
  const killProcess = process.kill.bind(process);
  return terminateChildrenImplementation(pid, options || {}, {
    killProcess,
    getChildrenPids: pidtree,
    filterAlivePids: (pids: number[]) => {
      return filterAlive(pids, { killProcess });
    }
  });
}

export default terminateChildren;
export type { Options };
