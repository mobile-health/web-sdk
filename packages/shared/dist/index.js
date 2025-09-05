const i = (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase(), u = (t, r) => {
  const n = [];
  for (let e = 0; e < t.length; e += r)
    n.push(t.slice(e, e + r));
  return n;
}, E = (t) => [...new Set(t)], T = (t, r) => t.reduce(
  (n, e) => {
    const s = String(e[r]);
    return n[s] || (n[s] = []), n[s].push(e), n;
  },
  {}
), a = (t) => JSON.parse(JSON.stringify(t)), S = (t, r) => {
  const n = { ...t };
  return r.forEach((e) => {
    delete n[e];
  }), n;
}, A = (t, r) => {
  const n = {};
  return r.forEach((e) => {
    e in t && (n[e] = t[e]);
  }), n;
}, D = (t, r, n = "key") => t.map((s) => r.find((c) => c[n] === s[n]) ?? s);
function I(t) {
  return t.filter(
    (r, n, e) => e.findIndex((s) => s.id === r.id) === n
  );
}
function O(t) {
  return t.filter(
    (r, n, e) => e.findIndex((s) => s.code === r.code) === n
  );
}
const Y = (t, r) => {
  const n = {};
  return Object.keys({ ...t, ...r }).forEach((e) => {
    n[e] = r[e] || t[e];
  }), n;
};
function d(t = [], r = []) {
  return t.some((n) => r.includes(n));
}
const l = (t) => {
  const r = new URLSearchParams();
  return Object.entries(t).forEach(([n, e]) => {
    e != null && r.append(n, String(e));
  }), r.toString();
}, m = (t) => {
  const r = new URLSearchParams(t), n = {};
  return r.forEach((e, s) => {
    n[s] = e;
  }), n;
}, M = {
  USERS: "/api/users",
  AUTH: "/api/auth",
  HEALTH: "/api/health"
}, R = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}, f = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system"
}, h = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100
}, p = {
  PASSWORD_MIN_LENGTH: 8,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s-()]+$/
}, N = {
  DATE_ONLY: "YYYY-MM-DD",
  DATETIME: "YYYY-MM-DD HH:mm:ss",
  TIME_ONLY: "HH:mm:ss",
  DISPLAY_DATE: "DD/MM/YYYY",
  DISPLAY_DATETIME: "DD/MM/YYYY HH:mm"
};
export {
  M as API_ENDPOINTS,
  N as DATE_FORMATS,
  R as HTTP_STATUS,
  h as PAGINATION_DEFAULTS,
  f as THEMES,
  p as VALIDATION_RULES,
  l as buildQueryString,
  i as capitalize,
  u as chunk,
  a as deepClone,
  T as groupBy,
  d as isHaveCommonItem,
  Y as mergeObjectFalsy,
  D as mergeTwoArray,
  S as omit,
  m as parseQueryString,
  A as pick,
  E as unique,
  O as uniqueOptionsByCode,
  I as uniqueOptionsById
};
//# sourceMappingURL=index.js.map
