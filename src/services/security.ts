import { jwtDecode } from 'jwt-decode';

export function validateToken(token: string): boolean {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp ? decoded.exp > currentTime : false;
  } catch {
    return false;
  }
}

export function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, '');
}

export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}

export function validateFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize;
}