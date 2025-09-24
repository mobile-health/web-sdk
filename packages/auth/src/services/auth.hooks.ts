import { useCallback, useEffect, useState } from 'react';
import { platformAuthenticatorIsAvailable, startRegistration } from '@simplewebauthn/browser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { passkeyKeys } from './auth.constants';
import {
  beginDiscoverablePasskey,
  beginLoginPasskey,
  beginRegisterPasskey,
  changePassword,
  deletePasskey,
  exchangePasskey,
  finishChangePhone,
  finishDiscoverablePasskey,
  finishLoginPasskey,
  finishRegisterPasskey,
  finishResetPassword,
  getNewOtp,
  getPasskeys,
  getSignInIdentifierRequest,
  magicTokenChangePassword,
  magicTokenChangePhone,
  registerPassword,
  resendOTP,
  revokeToken,
  signupProfile,
  startChangingPhone,
  updatePasskey,
  verifyOtp,
  verifyOTPRequest,
  verifyPasswordRequest,
} from './auth.requests';
import {
  IBeginDiscoverablePasskeyBody,
  IExchangePasskeyBody,
  IFinishChangePhoneBody,
  IFinishLoginPasskeyBody,
  IFinishPasskeyBody,
  IFinishResetPasswordBody,
  IIdentifierBody,
  IResendOTPBody,
  IRevokeTokenBody,
  ISignupProfileBody,
  IStartChangePhoneBody,
  IVerifyOTPBody,
  IVerifyPasswordBody,
} from './auth.types';
import { getFingerprintStorage } from './helpers';

export const useSignInIdentifier = () =>
  useMutation({
    mutationFn: ({ body, fingerprint }: { body: IIdentifierBody; fingerprint: string }) =>
      getSignInIdentifierRequest(body, fingerprint),
  });

export const useVerifyOTP = () =>
  useMutation({
    mutationFn: ({ body, fingerprint }: { body: IVerifyOTPBody; fingerprint: string }) =>
      verifyOTPRequest(body, fingerprint),
  });

export const useVerifyPassword = () =>
  useMutation({
    mutationFn: ({ body, fingerprint }: { body: IVerifyPasswordBody; fingerprint: string }) =>
      verifyPasswordRequest(body, fingerprint),
  });

export const useRegisterPassword = () =>
  useMutation({
    mutationFn: ({ body, fingerprint }: { body: IVerifyPasswordBody; fingerprint: string }) =>
      registerPassword(body, fingerprint),
  });

export const useSignupProfile = () =>
  useMutation({
    mutationFn: ({ body, fingerprint }: { body: ISignupProfileBody; fingerprint: string }) =>
      signupProfile(body, fingerprint),
  });

export const useBeginRegisterPasskey = () =>
  useMutation({
    mutationFn: ({ fingerprint }: { fingerprint: string }) => beginRegisterPasskey(fingerprint),
  });

export const useFinishRegisterPasskey = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ body, fingerprint }: { body: IFinishPasskeyBody; fingerprint: string }) =>
      finishRegisterPasskey(body, fingerprint),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: passkeyKeys.all });
      onSuccess();
    },
  });
};

export const useBeginLoginPasskey = () =>
  useMutation({
    mutationFn: ({ challengeId, fingerprint }: { challengeId: string; fingerprint: string }) =>
      beginLoginPasskey(challengeId, fingerprint),
  });

export const useFinishLoginPasskey = () =>
  useMutation({
    mutationFn: ({ body, fingerprint }: { body: IFinishLoginPasskeyBody; fingerprint: string }) =>
      finishLoginPasskey(body, fingerprint),
  });

export const useExchangePasskey = () =>
  useMutation({
    mutationFn: ({ body, fingerprint }: { body: IExchangePasskeyBody; fingerprint: string }) =>
      exchangePasskey(body, fingerprint),
  });

export const useDeletePasskey = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePasskey(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: passkeyKeys.all });
      onSuccess();
    },
  });
};

export const useUpdatePasskey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: { name: string } }) => updatePasskey(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: passkeyKeys.all });
    },
  });
};

export const useMagicTokenChangePassword = () =>
  useMutation({
    mutationFn: ({ password }: { password: string }) => magicTokenChangePassword({ password }),
  });

export const useStartChangePhone = () =>
  useMutation({
    mutationFn: ({ body, fingerprint }: { body: IStartChangePhoneBody; fingerprint: string }) =>
      startChangingPhone(body, fingerprint),
  });

export const useMagicTokenChangePhone = () =>
  useMutation({
    mutationFn: ({ password }: { password: string }) => magicTokenChangePhone({ password }),
  });

export const useChangePassword = () =>
  useMutation({
    mutationFn: ({ password, magicToken }: { password: string; magicToken: string }) =>
      changePassword({ password, magicToken }),
  });

export const useGetNewOtp = () =>
  useMutation({
    mutationFn: ({ body, fingerprint }: { body: IIdentifierBody; fingerprint: string }) =>
      getNewOtp(body, fingerprint),
  });

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: ({ body, fingerprint }: { body: IVerifyOTPBody; fingerprint: string }) =>
      verifyOtp(body, fingerprint),
  });

export const useFinishResetPassword = () =>
  useMutation({
    mutationFn: ({ body, fingerprint }: { body: IFinishResetPasswordBody; fingerprint: string }) =>
      finishResetPassword(body, fingerprint),
  });

export const useFinishChangePhone = () =>
  useMutation({
    mutationFn: ({ body, fingerprint }: { body: IFinishChangePhoneBody; fingerprint: string }) =>
      finishChangePhone(body, fingerprint),
  });

export const useResendOTP = () =>
  useMutation({
    mutationFn: ({ body, fingerprint }: { body: IResendOTPBody; fingerprint: string }) =>
      resendOTP(body, fingerprint),
  });

export const useRevokeToken = () =>
  useMutation({
    mutationFn: (body: IRevokeTokenBody) => revokeToken(body),
  });

export const useGetPasskeys = (enabled = true) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: passkeyKeys.all,
    queryFn: () => getPasskeys(),
    enabled,
  });

  const passkeys = data?.data || [];
  const isPasskeyConfigured = isLoading || passkeys?.length > 0;

  return { isLoading, refetch, isPasskeyConfigured, passkeys };
};

export const useBeginDiscoverablePasskey = () =>
  useMutation({
    mutationFn: ({
      body,
      fingerprint,
    }: {
      body: IBeginDiscoverablePasskeyBody;
      fingerprint: string;
    }) => beginDiscoverablePasskey(body, fingerprint),
  });

export const useFinishDiscoverablePasskey = () =>
  useMutation({
    mutationFn: ({ body, fingerprint }: { body: IFinishLoginPasskeyBody; fingerprint: string }) =>
      finishDiscoverablePasskey(body, fingerprint),
  });

export const useAddPasskey = (onSuccess: () => void, onError: (errorMessage: string) => void) => {
  const { mutateAsync: beginRegisterPasskey } = useBeginRegisterPasskey();
  const { mutateAsync: finishRegisterPasskey } = useFinishRegisterPasskey(onSuccess);

  const handleAddPasskey = useCallback(async () => {
    const fingerprint = getFingerprintStorage();
    if (!fingerprint) return;
    const data = await beginRegisterPasskey({ fingerprint });
    const { challengeId, publicKey } = data.data;
    try {
      const credential = await startRegistration({
        optionsJSON: publicKey,
      });
      await finishRegisterPasskey({
        body: {
          challenge_id: challengeId,
          credential,
        },
        fingerprint,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('error: ', error);
      if (error.code === 'ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED') {
        onError?.(
          "A passkey already exists in your device's password manager. Please use the existing passkey or remove it before creating a new one.",
        );
      } else {
        onError?.('Failed to add passkey');
      }
    }
  }, [beginRegisterPasskey, finishRegisterPasskey, onError]);

  return { handleAddPasskey };
};

export const useIsPasskeySupported = () => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const checkSupport = async () => {
      const isAvailable = await platformAuthenticatorIsAvailable();
      setIsSupported(isAvailable);
    };
    checkSupport();
  }, []);

  return isSupported;
};
