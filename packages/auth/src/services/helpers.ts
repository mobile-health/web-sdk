import { UAParser } from 'ua-parser-js';

import { EPasskeyEcosystem } from './auth.constants';
import { IPasskey } from './auth.types';

export function generateDeviceId() {
  return 'device_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
}

export function generateFingerprintSHA1() {
  return generateSHA1(generateDeviceId());
}

export async function getFingerprintFallback() {
  const fingerprint = getFingerprintStorage();

  if (!fingerprint) {
    const fingerprintNew = await generateFingerprintSHA1();
    saveFingerprintStorage(fingerprintNew);
    return fingerprintNew;
  }

  return fingerprint;
}

export function saveFingerprintStorage(fingerprint: string) {
  localStorage.setItem('fingerprint', fingerprint);
}

export function getFingerprintStorage() {
  return localStorage.getItem('fingerprint');
}

export async function generateSHA1(input: string) {
  // Convert string to ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  // Generate hash
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);

  // Convert to hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

export function parseEcosystem(): EPasskeyEcosystem {
  const userAgent = navigator.userAgent;

  // First check for Android-specific strings
  if (userAgent.includes('Dalvik') || userAgent.includes('okhttp')) {
    return EPasskeyEcosystem.ANDROID;
  }

  // Then check for Apple-specific strings
  if (userAgent.includes('Alamofire')) {
    return EPasskeyEcosystem.APPLE;
  }

  // If no specific strings found, fall back to general OS detection
  const parser = new UAParser(userAgent);
  const os = parser.getOS();

  switch (os.name?.toLowerCase()) {
    case 'macos':
    case 'ios':
      return EPasskeyEcosystem.APPLE;
    case 'android':
      return EPasskeyEcosystem.ANDROID;
    case 'windows':
      return EPasskeyEcosystem.WINDOWS;
    case 'linux':
      return EPasskeyEcosystem.LINUX;
    default:
      return EPasskeyEcosystem.UNKNOWN;
  }
}

export const hasPasskey = (passkeys: IPasskey[]) => {
  const currentEcosystem = parseEcosystem();
  return passkeys?.some((passkey) => passkey.ecosystem === currentEcosystem);
};

export function maskEmail(email: string): string {
  const [str, domain] = email.split('@');
  if (!str || str.length <= 1) return str ?? '***';
  return str[0] + '*'.repeat(str.length - 1) + '@' + domain;
}

export function maskPhoneNumber(phoneNumber: string): string {
  const digits = phoneNumber.replace(/\D/g, '');
  if (!digits) return '';
  const lastFourDigits = digits.slice(-4);
  const maskedPart = '*'.repeat(digits.length - 4);
  return maskedPart + lastFourDigits;
}
