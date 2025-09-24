import {
  AuthenticationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  RegistrationResponseJSON,
} from '@simplewebauthn/browser';

import type { ApiResponse, IUser } from '@web-sdk/shared';

import { EPasskeyEcosystem } from './auth.constants';

export enum EChallengeStep {
  PASSWORD = 'password',
  PASSKEY = 'passkey',
  OTP = 'otp',
  REGISTER_PASSWORD = 'register_password',
  REGISTER_PROFILE = 'register_profile',
  FINALIZED = 'finalized',
}

export interface IChallenge {
  challengeId: string;
  challengeStep: EChallengeStep;
  message: string;
}

export type IChallengeResponse = ApiResponse<IChallenge[]>;

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IIdentifier {
  accountType: 'doctor' | 'patient';
  identifierType: string;
  email?: string;
  phoneCountryCode?: string;
  phoneNumber?: string;
}
export interface IIdentifierBody {
  tenantDomain: string;
  identifier: IIdentifier;
  captcha: string;
  preferPassword?: boolean;
}

export interface IVerifyOTPBody {
  challengeId: string;
  otp: string;
}

export interface IExchangePasskeyBody {
  challengeId: string;
}

export interface ISignupProfileBody {
  fullname: string;
  email: string;
  challengeId: string;

  // optional
  hasConsentedToMarketingEmails?: boolean;
}

export interface IAuthSuccess {
  token: {
    accessToken: string;
    refreshToken: string;
    pubnubToken: string;
  };
  user: IUser;
  challengeStep: EChallengeStep;
}

export interface IVerifyPasswordBody {
  challengeId: string;
  password: string;
}

export interface IBeginPasskey {
  challengeId: string;
  publicKey: PublicKeyCredentialCreationOptionsJSON;
}

export interface IMagicToken {
  magicToken: string;
}

export interface IFinishResetPasswordBody {
  magicToken: string;
  password: string;
}
export interface IStartChangePhoneBody {
  magicToken: string;
  phoneCountryCode: string;
  phoneNumber: string;
}

export interface IFinishChangePhoneBody {
  challengeId: string;
  otp: string;
}

export interface IFinishPasskeyBody {
  challenge_id: string;
  credential: RegistrationResponseJSON;
}

export interface IFinishLoginPasskeyBody {
  challenge_id: string;
  credential: AuthenticationResponseJSON;
  domain?: string;
}

export interface IBeginDiscoverablePasskeyBody {
  domain: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isChallenge(obj: any): obj is IChallenge {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.challengeId === 'string' &&
    typeof obj.challengeStep === 'string'
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAuthSuccess(obj: any): obj is IAuthSuccess {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.token === 'object' &&
    typeof obj.user === 'object'
  );
}

export enum ESigninMethod {
  EMAIL = 'email',
  PHONE = 'phone',
}

export enum EOTPMethod {
  SMS = 'sms',
  EMAIL = 'email',
  CALL = 'call',
}

export interface IResendOTPBody {
  challengeId: string;
  method: EOTPMethod;
}
export interface IRevokeTokenBody {
  refreshToken: string;
  pubnubToken: string;
}

export interface IPasskey {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  ecosystem: EPasskeyEcosystem;
  userId: string;
  credentialId: string;
  signCount: number;
  device: Device;
}

export interface Device {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  userId: string;
  platform: string;
  ipAddress: string;
  userAgent: UserAgent;
}

export interface UserAgent {
  name: string;
  version: string;
  os: string;
  osVersion: string;
  device: string;
  string: string;
}

export interface UserCache {
  [key: string]: {
    // user id
    ignorePasskey?: boolean;
  };
}
export interface OTPBody {
  otp: string;
}
