import React, { useState } from 'react';
import './App.css';
import FixedHeaderExample from './FixedHeaderExample.js';
import {
  SideTabbar,
  SideTabbarItem,
  SideTabbarItemHeader,
  SideTabbarItemBody,
} from './SideTabbar.js';

function App() {
  const [activedName, setActivedName] = useState('FixedColumnExample');

  return (
    <SideTabbar key="name" activedName={activedName} onChange={(name) => {
      setActivedName(name);
    }}>
      <SideTabbarItem name="FixedHeaderExample">
        <SideTabbarItemHeader>固定表头</SideTabbarItemHeader>
        <SideTabbarItemBody>
          <FixedHeaderExample></FixedHeaderExample>
        </SideTabbarItemBody>
      </SideTabbarItem>
      <SideTabbarItem name="FixedColumnExample">
        <SideTabbarItemHeader>固定表列</SideTabbarItemHeader>
        <SideTabbarItemBody>固定表列内容</SideTabbarItemBody>
      </SideTabbarItem>
    </SideTabbar>
  );
}

export default App;
