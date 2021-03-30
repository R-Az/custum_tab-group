import { MainStorage } from './app/storage/MainStorage';

// 地獄のコールバック
// Promise化しても良いが、まぁこれくらいなら読める範疇なのでやらない
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

        chrome.tabGroups.update(targetGroupId, { collapsed: true }, () => {});
      }
    });
  });
});

chrome.tabs.onCreated.addListener(async (tab) => {
  const { url } = tab;
  const mainStorage = await MainStorage.init();
  const data = await mainStorage.load();

  for (const tabGroup of data.tabGroups) {
    for (const tabGroupData of tabGroup.tabGroupData) {
      for (const urlFilter of tabGroupData.urlFilter) {
        if (url?.startsWith(urlFilter)) {
          return;
        }
      }
    }
  }
});
