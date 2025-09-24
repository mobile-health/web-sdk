// Array utilities
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const unique = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

export const groupBy = <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

// Object utilities
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const omit = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
};

export const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const mergeTwoArray = (des: any[], source: any[], key = 'key') => {
  const result = des.map((item) => {
    const itemSource = source.find((i) => i[key] === item[key]);
    return itemSource ?? item;
  });
  return result;
};

export function uniqueOptionsById<T extends { id?: string | number }>(options: T[]): T[] {
  return options.filter((v: T, i: number, a: T[]) => a.findIndex((v2) => v2.id === v.id) === i);
}

export function uniqueOptionsByCode<T extends { code?: string | number }>(options: T[]): T[] {
  return options.filter((v: T, i: number, a: T[]) => a.findIndex((v2) => v2.code === v.code) === i);
}

export const mergeObjectFalsy = (A: any, B: any) => {
  const res: any = {};
  Object.keys({ ...A, ...B }).forEach((key) => {
    res[key] = B[key] || A[key];
  });
  return res;
};

export function isHaveCommonItem<T>(arr1: T[] = [], arr2: T[] = []): boolean {
  return arr1.some((item) => arr2.includes(item));
}
