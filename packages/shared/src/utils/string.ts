export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const camelToDashed = (camel: string) => {
  return camel.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
};

export const maskedEmail = (email?: string) => {
  if (!email) return '';
  const [localPart, domain] = email.split('@');
  if (!localPart || localPart.length <= 2) return email;

  const firstChar = localPart[0];
  const lastChar = localPart[localPart.length - 1];
  const maskedMiddle = '*'.repeat(localPart.length - 2);

  return `${firstChar}${maskedMiddle}${lastChar}@${domain}`;
};
