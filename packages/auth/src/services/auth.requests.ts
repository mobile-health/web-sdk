import { AxiosInstance } from 'axios';

import type { ApiResponse } from '@web-sdk/shared';

import {
  IAuthSuccess,
  IBeginDiscoverablePasskeyBody,
  IBeginPasskey,
  IChallenge,
  IExchangePasskeyBody,
  IFinishChangePhoneBody,
  IFinishLoginPasskeyBody,
  IFinishPasskeyBody,
  IFinishResetPasswordBody,
  IIdentifierBody,
  IMagicToken,
  IPasskey,
  IResendOTPBody,
  IRevokeTokenBody,
  ISignupProfileBody,
  IStartChangePhoneBody,
  IVerifyOTPBody,
  IVerifyPasswordBody,
} from './auth.types';
import { getFingerprintStorage } from './helpers';

let authClient: AxiosInstance = undefined as unknown as AxiosInstance;

export const configureAuthAxiosInstance = (instance: AxiosInstance) => {
  authClient = instance;
};

export const getSignInIdentifierRequest = (body: IIdentifierBody, fingerprint: string) =>
  authClient.post<never, ApiResponse<IChallenge>>('/signin/identifier', body, {
    headers: {
      'x-fingerprint': fingerprint,
    },
  });

export const verifyOTPRequest = (body: IVerifyOTPBody, fingerprint: string) =>
  authClient.post<never, ApiResponse<IAuthSuccess | IChallenge>>('/signin/challenge/otp', body, {
    headers: {
      'x-fingerprint': fingerprint,
    },
  });

export const verifyPasswordRequest = (body: IVerifyPasswordBody, fingerprint: string) =>
  authClient.post<never, ApiResponse<IAuthSuccess | IChallenge>>('/signin/challenge/pwd', body, {
    headers: {
      'x-fingerprint': fingerprint,
    },
  });

export const signupProfile = (body: ISignupProfileBody, fingerprint: string) =>
  authClient.post<never, ApiResponse<IChallenge>>('/signup/challenge/profile', body, {
    headers: {
      'x-fingerprint': fingerprint,
    },
  });

export const getPasskeys = () =>
  authClient.get<never, ApiResponse<IPasskey[]>>('/passkeys', {
    headers: {
      'x-fingerprint': getFingerprintStorage(),
    },
  });

export const deletePasskey = (id: string) =>
  authClient.delete<never, ApiResponse<IPasskey[]>>('/passkeys/' + id, {
    headers: {
      'x-fingerprint': getFingerprintStorage(),
    },
  });

export const updatePasskey = (id: string, body: { name: string }) =>
  authClient.patch<never, ApiResponse<IPasskey[]>>('/passkeys/' + id, body, {
    headers: {
      'x-fingerprint': getFingerprintStorage(),
    },
  });

export const beginRegisterPasskey = (fingerprint: string) =>
  authClient.post<never, ApiResponse<IBeginPasskey>>('/passkeys/begin-register', undefined, {
    headers: {
      'x-fingerprint': fingerprint,
    },
  });

export const finishRegisterPasskey = (body: IFinishPasskeyBody, fingerprint: string) =>
  authClient.post<never, ApiResponse<never>>('/passkeys/finish-register', body, {
    transformRequest: [
      (data) => {
        return JSON.stringify(data);
      },
    ],
    headers: {
      'x-fingerprint': fingerprint,
    },
  });

export const beginLoginPasskey = (challengeId: string, fingerprint: string) =>
  authClient.post<never, ApiResponse<IBeginPasskey>>(
    '/signin/challenge/passkeys/begin',
    { challengeId },
    {
      headers: {
        'x-fingerprint': fingerprint,
      },
    },
  );

export const magicTokenChangePassword = ({ password }: { password: string }) =>
  authClient.post<never, ApiResponse<IMagicToken>>('/magic-tokens/change-password', { password });

export const magicTokenChangePhone = ({ password }: { password: string }) =>
  authClient.post<never, ApiResponse<IMagicToken>>('/magic-tokens/change-phone', { password });

export const changePassword = (body: { password: string; magicToken: string }) =>
  authClient.put<never, ApiResponse<string>>('/users/me/pwd', body);

export const getNewOtp = (body: IIdentifierBody, fingerprint: string) =>
  authClient.post<never, ApiResponse<IChallenge>>('/auth/reset-pwd/get-otp', body, {
    headers: {
      'x-fingerprint': fingerprint,
    },
  });

export const verifyOtp = (body: IVerifyOTPBody, fingerprint: string) =>
  authClient.post<never, ApiResponse<IMagicToken>>('/auth/reset-pwd/verify-otp', body, {
    headers: {
      'x-fingerprint': fingerprint,
    },
  });

export const finishResetPassword = (body: IFinishResetPasswordBody, fingerprint: string) =>
  authClient.post<never, ApiResponse<never>>('/auth/reset-pwd/finish', body, {
    headers: {
      'x-fingerprint': fingerprint,
    },
  });

export const startChangingPhone = (body: IStartChangePhoneBody, fingerprint: string) =>
  authClient.post<never, ApiResponse<never>>('/users/me/phone/begin', body, {
    headers: {
      'x-fingerprint': fingerprint,
    },
  });

export const finishChangePhone = (body: IFinishChangePhoneBody, fingerprint: string) =>
  authClient.post<never, ApiResponse<never>>('/users/me/phone/finish', body, {
    headers: {
      'x-fingerprint': fingerprint,
    },
  });

export const finishLoginPasskey = (body: IFinishLoginPasskeyBody, fingerprint: string) =>
  authClient.post<never, ApiResponse<IAuthSuccess>>('/signin/challenge/passkeys/finish', body, {
    transformRequest: [
      (data) => {
        return JSON.stringify(data);
      },
    ],
    headers: {
      'x-fingerprint': fingerprint,
    },
  });

export const registerPassword = (body: IVerifyPasswordBody, fingerprint: string) =>
  authClient.post<never, ApiResponse<IChallenge>>('signup/challenge/pwd', body, {
    headers: {
      'x-fingerprint': fingerprint,
    },
  });

export const exchangePasskey = (body: IExchangePasskeyBody, fingerprint: string) =>
  authClient.post<never, ApiResponse<IChallenge>>('signin/challenge/passkeys/exchange', body, {
    headers: {
      'x-fingerprint': fingerprint,
    },
  });

export const resendOTP = (body: IResendOTPBody, fingerprint: string) =>
  authClient.post<never, ApiResponse<IChallenge>>('auth/resend-otp', body, {
    headers: {
      'x-fingerprint': fingerprint,
    },
  });

export const revokeToken = (body: IRevokeTokenBody) =>
  authClient.post<never, unknown>('auth/revoke-token', body);

export const beginDiscoverablePasskey = (
  body: IBeginDiscoverablePasskeyBody,
  fingerprint: string,
) =>
  authClient.post<never, ApiResponse<IBeginPasskey>>('/signin/passkeys/begin-discoverable', body, {
    headers: {
      'x-fingerprint': fingerprint,
    },
  });

export const finishDiscoverablePasskey = (body: IFinishLoginPasskeyBody, fingerprint: string) =>
  authClient.post<never, ApiResponse<IAuthSuccess>>('/signin/passkeys/finish-discoverable', body, {
    transformRequest: [
      (data) => {
        return JSON.stringify(data);
      },
    ],
    headers: {
      'x-fingerprint': fingerprint,
    },
  });
