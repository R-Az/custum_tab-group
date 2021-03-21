chrome.tabs.onActivated.addListener((activeInfo: chrome.tabs.TabActiveInfo) => {
  const tabId = activeInfo.tabId;
  console.log(tabId);
});
