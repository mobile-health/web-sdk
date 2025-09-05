export declare const API_ENDPOINTS: {
    readonly USERS: "/api/users";
    readonly AUTH: "/api/auth";
    readonly HEALTH: "/api/health";
};
export declare const HTTP_STATUS: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly INTERNAL_SERVER_ERROR: 500;
};
export declare const THEMES: {
    readonly LIGHT: "light";
    readonly DARK: "dark";
    readonly SYSTEM: "system";
};
export declare const PAGINATION_DEFAULTS: {
    readonly PAGE: 1;
    readonly LIMIT: 10;
    readonly MAX_LIMIT: 100;
};
export declare const VALIDATION_RULES: {
    readonly PASSWORD_MIN_LENGTH: 8;
    readonly EMAIL_REGEX: RegExp;
    readonly PHONE_REGEX: RegExp;
};
export declare const DATE_FORMATS: {
    readonly DATE_ONLY: "YYYY-MM-DD";
    readonly DATETIME: "YYYY-MM-DD HH:mm:ss";
    readonly TIME_ONLY: "HH:mm:ss";
    readonly DISPLAY_DATE: "DD/MM/YYYY";
    readonly DISPLAY_DATETIME: "DD/MM/YYYY HH:mm";
};
//# sourceMappingURL=constants.d.ts.map