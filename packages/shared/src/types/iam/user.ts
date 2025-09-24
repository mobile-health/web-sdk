export interface IPhone {
  phoneCountryCode?: string;
  phoneNumber?: string;
}

export interface IUser {
  accountType: string;
  createdAt: string;
  email: string;
  enable2fa: boolean;
  id: string;
  isActive: boolean;
  phone?: IPhone;
  props: {
    mustChangePassword: boolean;
    mustCreatePassword: boolean;
  };
  tenantId: string;
  updatedAt: string;
  internalId: number;
}
