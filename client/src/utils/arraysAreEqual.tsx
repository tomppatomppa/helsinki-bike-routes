export function arraysEqual(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) {
    return false
  }
  return JSON.stringify(arr1) === JSON.stringify(arr2)
}
