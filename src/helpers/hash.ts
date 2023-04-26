import { BinaryLike, createHash } from 'crypto';

export function hash(data: BinaryLike): string {
  return createHash('sha256').update(data).digest('hex');
}
