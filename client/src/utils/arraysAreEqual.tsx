export function arraysEqual(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }
  
  const trimmedArr1 = arr1.map(str => str.trim());
  const trimmedArr2 = arr2.map(str => str.trim());


  return JSON.stringify(trimmedArr1) === JSON.stringify(trimmedArr2);
}