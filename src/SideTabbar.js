import React from 'react';
import style from './SideTabbar.module.css';
/** 受控组件
 * 
 * @param {Object} props 
 *  {String} props.activedName 当前激活的选项卡
 *  {Function} props.onChange 点击选项卡头部时, 触发变更
 */
export const SideTabbar = function (props) {
  const headers = [];
  const bodys = [];
  const children = props.children;
  const onChange = props.onChange;
  const activedName = props.activedName;

  for (let i = 0, ilen = children.length; i < ilen; i++) {
    const child = children[i];
    const {
      name,
    } = child.props;
    const descendants = child.props.children;

    for (let i = 0, ilen = descendants.length; i < ilen; i++) {
      const child = descendants[i];
      const type = child.type;
      const isActived = name === activedName;
      // 使用React.cloneElement克隆元素, 并且添加额外的属性
      if (type === SideTabbarItemHeader) {
        const onClick = child.props.onClick;
        const cloned = React.cloneElement(child, {
          key: name,
          _isActived: isActived,
          onClick: (function (name) {
            return function () {
              if (typeof onClick === 'function') {
                onClick(name);
              }
    
              if (activedName !== name) {
                onChange(name);
              }
            }
          }(name))
        });
        
        headers.push(cloned);
      } else if (type === SideTabbarItemBody) {
        const cloned = React.cloneElement(child, {
          key: name,
          _isActived: isActived
        });
        bodys.push(cloned);
      }
    }
  }

  return (
    <div className={style.tabbar}>
      <div className={style.headers}>
        {/* 此处渲染tabbar item header */}
        {headers}
      </div>
      <div className={style.bodys}>
        {/* 此处渲染tabbar item body */}
        {bodys}
      </div>
    </div>
  );
};
/** 仅作为一个包裹，将header和body对应起来
 *  
 */ 
export const SideTabbarItem = function (props) {
  return null;
};

export const SideTabbarItemHeader = function (props) {
  return (
    <div className={`${style.header} ${props._isActived ? style.actived : ''}`} onClick={props.onClick}>{props.children}</div>
  );
};

export const SideTabbarItemBody = function (props) {
  return (
    <div style={{ display: props._isActived ? 'block' : 'none' }}>{props.children}</div>
  );
};

/**
 <SideTabbar activedName="hello" onChange="">
  <SideTabbarItem name="hello">
    <SideTabbarItemHeader>
    </SideTabbarItemHeader>
    <SideTabbarItemBody>
    </SideTabbarItemBody>
  </SideTabbarItem>
  <SideTabbarItem name="world">
    <SideTabbarItemHeader>
    </SideTabbarItemHeader>
    <SideTabbarItemBody>
    </SideTabbarItemBody>
  </SideTabbarItem>
 </SideTabbar>
 */
