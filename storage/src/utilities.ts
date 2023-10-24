import { v4, v5 } from 'uuid';

export function getFileExtension(name: string): string {
  if (typeof name !== 'string') {
    throw new Error('A "name" param is not a string');
  }
  if (name.length === 0) {
    throw new Error('Empty "name" param');
  }
  const dot = name.lastIndexOf('.');
  if (dot === -1) {
    throw new Error('Extension not found');
  }
  const extension = name.substring(dot, name.length);
  return extension.toLowerCase();
}

export function generateFileName(ext: string): string {
  if (typeof ext !== 'string' || ext.length === 0) {
    throw new Error('Invalid "ext" argument');
  }
  const name = v5(`${+new Date()}`, v4());
  return `${name}.${ext.replace(/\./g, '')}`;
}

export function mbToBytes(mb: number): number {
  return mb * Math.pow(1024, 2);
}
