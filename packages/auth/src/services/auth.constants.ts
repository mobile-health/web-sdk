/* eslint-disable @typescript-eslint/no-explicit-any */
export const authKeys = {
  all: ['auth'] as const,
  lists: () => [...authKeys.all, 'list'] as const,
  list: (params: any) => [...authKeys.lists(), params] as const,
};

export const passkeyKeys = {
  all: ['passkeys'] as const,
};

export enum EPasskeyEcosystem {
  APPLE = 'apple',
  ANDROID = 'android',
  WINDOWS = 'windows',
  LINUX = 'linux',
  UNKNOWN = 'unknown',
}
