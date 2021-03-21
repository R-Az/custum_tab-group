chrome.tabs.onActivated.addListener((activeInfo) => {
  const tabId = activeInfo.tabId;
  const windowId = activeInfo.windowId;

  chrome.tabs.get(tabId, (tab) => {
    const currentGroupId = tab.groupId;

    chrome.tabGroups.query({ collapsed: false, windowId }, (result) => {
      for (const tabGroup of result) {
        const targetGroupId = tabGroup.id;
        if (targetGroupId === currentGroupId) continue;

        chrome.tabGroups.update(targetGroupId, { collapsed: true }, () => {});
      }
    });
  });
});
