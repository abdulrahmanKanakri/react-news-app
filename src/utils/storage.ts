import { LOCAL_STORAGE_PREFIX } from "@/config";

class Storage {
  private readonly tokenKey: string;

  constructor(storagePrefix: string) {
    this.tokenKey = storagePrefix + "TOKEN";
  }

  setItem(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key) as string);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  setToken(token: string) {
    this.setItem(this.tokenKey, token);
  }

  getToken() {
    return this.getItem(this.tokenKey);
  }

  clearToken() {
    return this.removeItem(this.tokenKey);
  }
}

const storage = new Storage(LOCAL_STORAGE_PREFIX);

export default storage;
