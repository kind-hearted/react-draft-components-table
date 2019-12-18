import React, { useState } from 'react';
import './App.css';
import {
  SideTabbar,
  SideTabbarItem,
  SideTabbarItemHeader,
  SideTabbarItemBody,
} from './SideTabbar.js';
import FixedHeaderFooterExample from './FixedHeaderFooterExample.js';
import FixedColumnExample from './FixedColumnExample.js';
import FixedAllSidesExample from './FixedAllSidesExample.js';

function App() {
  const [activedName, setActivedName] = useState('FixedAllSidesExample');

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
      <SideTabbarItem name="FixedColumnExample">
        <SideTabbarItemHeader>固定表列</SideTabbarItemHeader>
        <SideTabbarItemBody>
          <FixedColumnExample></FixedColumnExample>
        </SideTabbarItemBody>
      </SideTabbarItem>
      <SideTabbarItem name="FixedAllSidesExample">
        <SideTabbarItemHeader>固定表头+表列</SideTabbarItemHeader>
        <SideTabbarItemBody>
          <FixedAllSidesExample></FixedAllSidesExample>
        </SideTabbarItemBody>
      </SideTabbarItem>
    </SideTabbar>
  );
}

export default App;
