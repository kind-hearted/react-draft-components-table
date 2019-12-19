import React, { useState } from 'react';
import './App.css';
import {
  SideTabbar,
  SideTabbarItem,
  SideTabbarItemHeader,
  SideTabbarItemBody,
} from './SideTabbar.js';
import FixedTopBottomExample from './FixedTopBottomExample.js';
import FixedLeftRightExample from './FixedLeftRightExample.js';
import FixedSideExample from './FixedSideExample.js';

function App() {
  const [activedName, setActivedName] = useState('FixedLeftRightExample');

  return (
    <SideTabbar key="name" activedName={activedName} onChange={(name) => {
      setActivedName(name);
    }}>
      <SideTabbarItem name="FixedTopBottomExample">
        <SideTabbarItemHeader>固定表头、表尾</SideTabbarItemHeader>
        <SideTabbarItemBody>
          <FixedTopBottomExample></FixedTopBottomExample>
        </SideTabbarItemBody>
      </SideTabbarItem>
      <SideTabbarItem name="FixedLeftRightExample">
        <SideTabbarItemHeader>固定表列</SideTabbarItemHeader>
        <SideTabbarItemBody>
          <FixedLeftRightExample></FixedLeftRightExample>
        </SideTabbarItemBody>
      </SideTabbarItem>
      <SideTabbarItem name="FixedSideExample">
        <SideTabbarItemHeader>固定表头+表列</SideTabbarItemHeader>
        <SideTabbarItemBody>
          <FixedSideExample></FixedSideExample>
        </SideTabbarItemBody>
      </SideTabbarItem>
    </SideTabbar>
  );
}

export default App;
