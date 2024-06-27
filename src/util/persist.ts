export const getLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
  }
};

export const setLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    const value = sessionStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
  }
};

export const setSessionStorage = <T>(key: string, value: T): void => {
  sessionStorage.setItem(key, JSON.stringify(value));
};
