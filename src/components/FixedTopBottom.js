import React, { useEffect, useRef } from 'react';
import setYScrollBar from '../utils/setYScrollBar.js';

/**
  * 固定表头、表尾
  * 1、固定表头首先需要两个列表
  * 2、能正常处理滚动条的占宽
  * 3、保证表头可以对齐表行（如何方便给表头赋值宽度?）
  * 4、表头如何渲染完全取决于用户, 内部相同于复制了一个表头占位显示, 用户无需关心这个表头是如何复制的
  */

 /**
  * 设计思路
  * 1、尽量维持原生表格的使用方式, 仅以某个参数代表是否需要表头固定
  * 
  * 优化策略
  * 1、尽量不生成多余的元素
  * 2、表头的更新应该和表体的更新分开, 避免更新表头时导致整个表格更新, 性能下降
  * 3、
  */

export const Table = function Table(props) {
  const scrollRef = useRef();
  const headerTableRef = useRef();
  const baseTableRef = useRef();
  const footerTableFooter = useRef();
  
  let BaseColgroup = null;
  let BaseThead = null;
  let BaseTbody = null;
  let BaseTfoot = null;

  React.Children.forEach(props.children, function (child) {
    if (child.type === Colgroup) {
      BaseColgroup = React.cloneElement(child, {
        className: [child.props.className, 'colgroup'].join(' ')
      });
    } else if (child.type === Thead) {
      BaseThead = child;
    } else if (child.type === Tbody) {
      BaseTbody = React.cloneElement(child, {
        className: [child.props.className, 'tbody'].join(' ')
      });
    } else if (child.type === Tfoot) {
      BaseTfoot = React.cloneElement(child, {
        className: [child.props.className, 'tfoot'].join(' ')
      });
    }
  });
  const setTopBottomScrollYBar = function () {
    const scrollWidth = scrollRef.current.offsetWidth;
    const baseTableWidth = baseTableRef.current.offsetWidth;
    const scrollBarWidth = scrollWidth - baseTableWidth;

    if (BaseThead && BaseThead.props.fixed === "true") {
      setYScrollBar(scrollBarWidth, headerTableRef, 'th');
    }

    if (BaseTfoot && BaseTfoot.props.fixed === "true") {
      setYScrollBar(scrollBarWidth, footerTableFooter, 'td');
    }
  };
  // 直接操作DOM，避免使用状态，造成整个table组件的更新，性能差
  useEffect(setTopBottomScrollYBar);

  const filterProps = {};

  for (let key in props) {
    if (key !== 'scrollHeight') {
      filterProps[key] = props[key];
    }
  }

  filterProps.className = [filterProps.className, 'table'].join(' ');

  return (
    <div className="table-box">
      {
        BaseThead && BaseThead.props.fixed === "true" &&
        <div className="thead">
          <table {...filterProps} ref={headerTableRef} >
            {BaseColgroup}
            {BaseThead}
          </table>
        </div>
      }
      <div ref={scrollRef} style={{height: props.scrollHeight, overflow: 'auto'}}>
        {
          // 不固定的表头，单独生成，因为在Edge浏览器中，会出现各列高度相差1px的情况，样式应该定义在.thead中
          BaseThead && BaseThead.props.fixed !== "true" &&
          <div className="thead">
            <table {...filterProps} ref={headerTableRef}>
              {BaseColgroup}
              {BaseThead && BaseThead.props.fixed !== "true" && BaseThead}
            </table>
          </div>
        }
        <table {...filterProps} ref={baseTableRef}>
          {BaseColgroup}
          {BaseTbody}
          {BaseTfoot && BaseTfoot.props.fixed !== "true" && BaseTfoot}
        </table>
      </div>
      {
        BaseTfoot && BaseTfoot.props.fixed === "true" &&
        <div>
          <table {...filterProps} ref={footerTableFooter}>
            {BaseColgroup}
            {BaseTfoot}
          </table>
        </div>
      }
    </div>
  )
}

export const Colgroup = function Colgroup(props) {
  return <colgroup {...props}>{props.children}</colgroup>
}

export const Col = function Col(props) {
  return <col {...props}>{props.children}</col>
}

export const Thead = function Thead(props) {
  return <thead {...props}>{props.children}</thead>
}

export const Tbody = function Tbody(props) {
  return <tbody {...props}>{props.children}</tbody>
}

export const Tfoot = function Tbody(props) {
  return <tfoot {...props}>{props.children}</tfoot>
}
 