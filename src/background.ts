type activeInfo = { tabId: number; windowId: number };
chrome.tabs.onActivated.addListener((activeInfo:activeInfo) => {
  const tabId = activeInfo.tabId;

  console.log(tabId);
  
});
