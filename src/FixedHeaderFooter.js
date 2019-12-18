import React, { useEffect, useRef } from 'react';

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
const SCROLL_COL_CLASS = 'scroll-bar scroll-bar-' + Date.now();
const setScrollBar = function (elScroll, elTableReal, fixedTable, type) {
  // 计算滚动条的宽度
  const elScrollWidth = elScroll.current.offsetWidth;
  const elTableRealWidth = elTableReal.current.offsetWidth;
  const scrollBarWidth = elScrollWidth - elTableRealWidth;
  const colgroup = fixedTable.current.querySelector('colgroup');
  const cols = colgroup.querySelectorAll('col');
  const trs = fixedTable.current.querySelectorAll('tr');
  const firstTr = trs[0];
  const lastCell = firstTr.children[firstTr.children.length - 1];
  const lastCol = cols[cols.length - 1];

  if (scrollBarWidth === 0) {
    if (lastCol.className === SCROLL_COL_CLASS) {
      colgroup.removeChild(lastCol);
    }

    if (lastCell.className === SCROLL_COL_CLASS) {
      firstTr.removeChild(lastCell);
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

    if (lastCell.className !== SCROLL_COL_CLASS) {
      const cell = document.createElement(type);
      cell.className = SCROLL_COL_CLASS;
      cell.setAttribute('rowspan', trs.length);
      firstTr.appendChild(cell);
    }
  }
};

export const Table = function Table(props) {
  const elScroll = useRef();
  const elTableHeader = useRef();
  const elTableReal = useRef();
  const elTableFooter = useRef();
  
  let ElColgroup = null;
  let ElThead = null;
  let ElTbody = null;
  let ElTfoot = null;

  React.Children.forEach(props.children, function (child) {
    if (child.type === Colgroup) {
      ElColgroup = React.cloneElement(child, {
        className: [child.props.className, 'colgroup'].join(' ')
      });
    } else if (child.type === Thead) {
      ElThead = child;
    } else if (child.type === Tbody) {
      ElTbody = React.cloneElement(child, {
        className: [child.props.className, 'tbody'].join(' ')
      });
    } else if (child.type === Tfoot) {
      ElTfoot = React.cloneElement(child, {
        className: [child.props.className, 'tfoot'].join(' ')
      });
    }
  });
  // 直接操作DOM，避免使用状态，造成整个table组件的更新，性能差
  useEffect(function () {
    if (ElThead && ElThead.props.fixed === "true") {
      setScrollBar(elScroll, elTableReal, elTableHeader, 'th');
    }

    if (ElTfoot && ElTfoot.props.fixed === "true") {
      setScrollBar(elScroll, elTableReal, elTableFooter, 'td');
    }
  });

  const filterProps = {};

  for (let key in props) {
    if (key !== 'scrollHeight') {
      filterProps[key] = props[key];
    }
  }

  filterProps.className = [filterProps.className, 'table'].join(' ');

  return (
    <div>
      {
        ElThead && ElThead.props.fixed === "true" &&
        <div className="thead">
          <table {...filterProps} ref={elTableHeader} >
            {ElColgroup}
            {ElThead}
          </table>
        </div>
      }
      <div ref={elScroll} style={{height: props.scrollHeight, overflow: 'auto'}}>
        {
          // 不固定的表头，单独生成，因为在Edge浏览器中，会出现各列高度相差1px的情况，样式应该定义在.thead中
          ElThead && ElThead.props.fixed !== "true" &&
          <div className="thead">
            <table {...filterProps} ref={elTableHeader}>
              {ElColgroup}
              {ElThead && ElThead.props.fixed !== "true" && ElThead}
            </table>
          </div>
        }
        <table {...filterProps} ref={elTableReal}>
          {ElColgroup}
          {ElTbody}
          {ElTfoot && ElTfoot.props.fixed !== "true" && ElTfoot}
        </table>
      </div>
      {
        ElTfoot && ElTfoot.props.fixed === "true" &&
        <div>
          <table {...filterProps} ref={elTableFooter}>
            {ElColgroup}
            {ElTfoot}
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
 