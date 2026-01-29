export function shuffleArray(array: number[]): number[ number[] ] {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  const rtnArr = [ arr.slice(0,3) , arr.slice(3, 6) , arr.slice(6, 9)]
  return rtnArr;
}