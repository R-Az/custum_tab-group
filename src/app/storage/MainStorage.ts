import { StorageData, Storage } from './Storage';
import { ConfigStorage } from './ConfigStorage';

interface MainData extends StorageData {
  tabGroups: TabGroups[];
  urlFilters: string[];
}
interface TabGroupData extends Omit<chrome.tabGroups.TabGroup, 'collapsed' | 'windowId' | 'id'> {
  urlFilter: string[];
}

interface TabGroups {
  name: string;
  isAutoUpdate: boolean;
  tabGroupData: TabGroupData[];
}

const main_key = 'custum_tabGroup_main';

export class MainStorage extends Storage<MainData> {
  static init = async () => {
    const config = await ConfigStorage.init().load();
    return new MainStorage(main_key, config.storageType);
  };

  initializeData = (): MainData => ({ urlFilters: [], tabGroups: [], isInitialized: true });
}
