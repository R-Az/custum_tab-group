import { StorageData, StorageType, Storage } from './Storage';

interface ConfigData extends StorageData {
  storageType: StorageType;
}

const config_key = 'custum_tabGroup_config';

export class ConfigStorage extends Storage<ConfigData> {
  static init = () => {
    return new ConfigStorage(config_key, 'sync');
  };

  initializeData = (): ConfigData => ({ isInitialized: true, storageType: 'sync' });
}
