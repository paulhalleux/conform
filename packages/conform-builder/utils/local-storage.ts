/**
 * Local storage wrapper for next js compatibility
 */
export class LocalStorage {
  private static getStorage(): Storage | null {
    if (typeof window === "undefined") return null;
    return window.localStorage ?? null;
  }

  public static getItem(key: string): string | null {
    const storage = this.getStorage();
    if (!storage) return null;
    return storage.getItem(key);
  }

  public static setItem(key: string, value: string): void {
    const storage = this.getStorage();
    if (storage) storage.setItem(key, value);
  }

  public static removeItem(key: string): void {
    const storage = this.getStorage();
    if (storage) storage.removeItem(key);
  }

  public static clear(): void {
    const storage = this.getStorage();
    if (storage) storage.clear();
  }
}
