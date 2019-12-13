import React, { useEffect, useRef } from 'react';

/**
 * 固定表头
 * 1、固定表头首先需要两个列表, 
 * 2、能正常处理滚动条的占宽, 
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
const SCROLL_COL_CLASS = 'scroll-' + Date.now();

export const Table = function Table(props) {
  const elScroll = useRef();
  const elTableHeader = useRef();
  const elTableReal = useRef();
  
  let ElColgroup = null;
  let ElThead = null;
  let ElTbody = null;

  props.children.forEach(function (child) {
    if (child.type === Colgroup) {
      ElColgroup = child;
    } else if (child.type === Thead) {
      ElThead = child;
    } else if (child.type === Tbody) {
      ElTbody = child;
    }
  });
  // 直接操作DOM，避免使用状态，造成整个table组件的更新，性能差
  useEffect(() => {
    // 计算滚动条的宽度
    const elScrollWidth = elScroll.current.offsetWidth;
    const elTableRealWidth = elTableReal.current.offsetWidth;
    const scrollBarWidth = elScrollWidth - elTableRealWidth;
    const colgroup = elTableHeader.current.querySelector('colgroup');
    const cols = colgroup.querySelectorAll('col');
    const trs = elTableHeader.current.querySelectorAll('tr');
    const firstTr = trs[0];
    const lastTh = firstTr.children[firstTr.children.length - 1];
    const lastCol = cols[cols.length - 1];

    if (scrollBarWidth === 0) {
      if (lastCol.className === SCROLL_COL_CLASS) {
        colgroup.removeChild(lastCol);
      }

      if (lastTh.className === SCROLL_COL_CLASS) {
        firstTr.removeChild(lastTh);
      }
    } else {
      if (lastCol.className === SCROLL_COL_CLASS) {
        lastCol.setAttribute('width', String(scrollBarWidth));
      } else {
        const col = document.createElement('col');
        col.className = SCROLL_COL_CLASS;
        col.setAttribute('width', String(scrollBarWidth));
        colgroup.appendChild(col);
      }

      if (lastTh.className !== SCROLL_COL_CLASS) {
        const th = document.createElement('th');
        th.className = SCROLL_COL_CLASS;
        th.setAttribute('rowspan', trs.length);
        firstTr.appendChild(th);
      }
    }
  });

  return (
    <div>
      <div>
        <table ref={elTableHeader}>
          {ElColgroup}
          {ElThead}
        </table>
      </div>
      <div ref={elScroll} style={{height: '500px', overflow: 'auto'}}>
        <table ref={elTableReal}>
          {ElColgroup}
          {/* {ElThead} */}
          {ElTbody}
        </table>
      </div>
    </div>
  )
}

export const Colgroup = function Colgroup(props) {
  return <colgroup>{props.children}</colgroup>
}

export const Col = function Col(props) {
  return <col {...props}>{props.children}</col>
}

export const Thead = function Thead(props) {
  return <thead>{props.children}</thead>
}

export const Tbody = function Tbody(props) {
  return <tbody>{props.children}</tbody>
}

 