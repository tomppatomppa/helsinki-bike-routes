export function arraysEqual(arr1: any[], arr2: any[]): boolean {
  if (arr1.length !== arr2.length) {
    return false
  }
  return JSON.stringify(arr1) === JSON.stringify(arr2)
}
