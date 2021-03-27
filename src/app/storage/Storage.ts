export type StorageType = 'local' | 'sync';

export interface StorageInterFace<T> {
  readonly key: string;
  initializeData(): T;
}

export interface StorageData {
  isInitialized: boolean;
}

export abstract class Storage<T extends StorageData> implements StorageInterFace<T> {
  private storage: chrome.storage.LocalStorageArea | chrome.storage.SyncStorageArea;
  readonly key: string;
  protected constructor(key: string, saveType?: StorageType) {
    this.key = key;
    this.storage = saveType === 'sync' ? chrome.storage.sync : chrome.storage.local;
    console.log('constractor');
  }

  save = async (data: T) => {
    const saveObject = {
      [this.key]: data,
    };
    return await new Promise((resolve, reject) => {
      this.storage.set(saveObject, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        }
      });
    });
  };

  load = async (): Promise<T> => {
    return await new Promise((resolve, reject) => {
      this.storage.get(this.key, async (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        }
        const data = result[this.key] as T;
        if (!data?.isInitialized) {
          await this.save(this.initializeData());
          // ちょっとここ気持ち悪いがstorageの性質上、
          // 初回起動で永遠にバグってしまう可能性あるので、こんな実装になっている。
          // DBと違って、データを一回も保存していないとundifinedが帰ってくるためである。
          return await this.load();
        }
        resolve(result[this.key] as T);
      });
    });
  };

  abstract initializeData(): T;
}
