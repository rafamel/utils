export default function alive(children: number[]): number[] {
  let arr: number[] = [];
  for (let pid of children) {
    try {
      process.kill(pid, 0);
      // if it doesn't error out, it's still alive
      arr.push(pid);
    } catch (_) {}
  }
  return arr;
}
