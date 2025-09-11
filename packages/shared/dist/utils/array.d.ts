export declare const chunk: <T>(array: T[], size: number) => T[][];
export declare const unique: <T>(array: T[]) => T[];
export declare const groupBy: <T, K extends keyof T>(array: T[], key: K) => Record<string, T[]>;
export declare const deepClone: <T>(obj: T) => T;
export declare const omit: <T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]) => Omit<T, K>;
export declare const pick: <T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]) => Pick<T, K>;
export declare const mergeTwoArray: (des: any[], source: any[], key?: string) => any[];
export declare function uniqueOptionsById<T extends {
    id?: string | number;
}>(options: T[]): T[];
export declare function uniqueOptionsByCode<T extends {
    code?: string | number;
}>(options: T[]): T[];
export declare const mergeObjectFalsy: (A: any, B: any) => any;
export declare function isHaveCommonItem<T>(arr1?: T[], arr2?: T[]): boolean;
//# sourceMappingURL=array.d.ts.map