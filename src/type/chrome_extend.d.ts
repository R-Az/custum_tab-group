/* eslint-disable no-unused-vars */
declare namespace chrome.tabGroups {
  export interface TabGroup {
    collapsed: boolean;
    color: Color;
    id: number;
    title?: string;
    windowId: number;
  }

  export interface QueryInfo {
    collapsed?: boolean;
    color?: Color;
    title?: string;
    windowId?: number;
  }

  export type Color = 'grey' | 'blue' | 'red' | 'yellow' | 'green' | 'pink' | 'purple' | 'cyan';

  export function query(queryInfo: QueryInfo, callback: (result: TabGroup[]) => void): void;

  export interface UpdateProperties {
    collapsed?: boolean;
    color?: Color;
    title?: string;
  }

  export function update(
    groupId: number,
    updateProperties: UpdateProperties,
    callback: (group: TabGroup) => void
  ): void;
}

// eslint-disable-next-line no-redeclare
declare namespace chrome.tabs {
  export interface Tab {
    // バージョンの都合でgroupIdがまだ@type/chromeに定義されていないため、ここで定義してマージする。
    groupId: number;
  }
}
