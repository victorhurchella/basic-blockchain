export function validHash(hash: string, difficulty: number): boolean {
  return hash.startsWith('0'.repeat(difficulty));
}
