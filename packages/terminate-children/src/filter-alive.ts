export function filterAlive(
  pids: number[],
  deps: { killProcess: (pid: number, signal: 0) => void }
): number[] {
  const arr: number[] = [];
  for (const pid of pids) {
    try {
      deps.killProcess(pid, 0);
      // if it doesn't error out, it's still alive
      arr.push(pid);
    } catch (_) {}
  }
  return arr;
}
