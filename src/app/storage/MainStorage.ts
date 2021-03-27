import { StorageData, Storage } from './Storage';
import { ConfigStorage } from './ConfigStorage';

interface MainData extends StorageData {
  tabGroupData: TabGroupData[];
}

interface TabGroupData {
  URLs: string[];
}

const main_key = 'custum_tabGroup_main';

export class MainStorage extends Storage<MainData> {
  static init = async () => {
    console.log('main');
    const configs = ConfigStorage.init();
    console.log(JSON.stringify(configs));

    const config = await configs.load();
    return new MainStorage(main_key, config.storageType);
  };

  initializeData = (): MainData => ({ tabGroupData: [{ URLs: ['aaaa'] }], isInitialized: true });
}
