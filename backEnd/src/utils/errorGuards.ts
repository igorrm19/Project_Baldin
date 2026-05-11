export function isErrorWithName(e: unknown, name: string): e is { name: string } {
  return typeof e === 'object' && e !== null && 'name' in e && (e as { name?: unknown }).name === name;
}

export function isMongoDupError(e: unknown): e is { code: number } {
  return typeof e === 'object' && e !== null && 'code' in e && (e as { code?: unknown }).code === 11000;
}
