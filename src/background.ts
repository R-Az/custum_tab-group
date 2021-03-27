// 地獄のコールバック
// Promise化しても良いが、まぁこれくらいなら読める範疇なのでやらない

import { MainStorage } from './app/storage/MainStorage';

// 10階層超えたらさすがにかんがえる
chrome.tabs.onActivated.addListener((activeInfo) => {
  const tabId = activeInfo.tabId;
  const windowId = activeInfo.windowId;

  chrome.tabs.get(tabId, (tab) => {
    const currentGroupId = tab.groupId;

    chrome.tabGroups.query({ collapsed: false, windowId }, async (result) => {
      for (const tabGroup of result) {
        const targetGroupId = tabGroup.id;
        if (targetGroupId === currentGroupId) continue;
        const mainStorage = await MainStorage.init();
        const data = await mainStorage.load();
        console.log(data);

        chrome.tabGroups.update(targetGroupId, { collapsed: true }, () => {});
      }
    });
  });
});
