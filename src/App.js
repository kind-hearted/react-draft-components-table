import React, { useState } from 'react';
import './App.css';
import {
  SideTabbar,
  SideTabbarItem,
  SideTabbarItemHeader,
  SideTabbarItemBody,
} from './SideTabbar.js';
import FixedHeaderFooterExample from './FixedHeaderFooterExample.js';
import FixedSideColumnExample from './FixedSideColumnExample.js';
import FixedExample from './FixedExample.js';

function App() {
  const [activedName, setActivedName] = useState('FixedHeaderFooterExample');

  return (
    <SideTabbar key="name" activedName={activedName} onChange={(name) => {
      setActivedName(name);
    }}>
      <SideTabbarItem name="FixedHeaderFooterExample">
        <SideTabbarItemHeader>固定表头、表尾</SideTabbarItemHeader>
        <SideTabbarItemBody>
          <FixedHeaderFooterExample></FixedHeaderFooterExample>
        </SideTabbarItemBody>
      </SideTabbarItem>
      {/* <SideTabbarItem name="FixedSideColumnExample">
        <SideTabbarItemHeader>固定两侧表列</SideTabbarItemHeader>
        <SideTabbarItemBody>
          <FixedSideColumnExample></FixedSideColumnExample>
        </SideTabbarItemBody>
      </SideTabbarItem> */}
      {/* <SideTabbarItem name="FixedExample">
        <SideTabbarItemHeader>固定表头、表尾+表列</SideTabbarItemHeader>
        <SideTabbarItemBody>
          <FixedExample></FixedExample>
        </SideTabbarItemBody>
      </SideTabbarItem> */}
    </SideTabbar>
  );
}

export default App;
