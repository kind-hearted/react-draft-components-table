import React, { useEffect, useRef } from 'react';
import commonStyle from './common.module.css';
import filterProps from '../utils/filterProps.js';
import setYScrollBar from '../utils/setYScrollBar.js';
import tableCustomizeProps from '../utils/tableCustomizeProps.js';
import renderTableContainer from '../utils/renderTableContainer.js';
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
export const TableContainer = function (props) {
  return renderTableContainer(props, Table, Loading, NoData, Fail);
}

export const Table = function Table(props) {
  const scrollAreaRef = useRef();
  const headerTableRef = useRef();
  const baseTableRef = useRef();
  const footerTableRef = useRef();
  
  let BaseColgroup = null;
  let BaseThead = null;
  let BaseTbody = null;
  let BaseTfoot = null;

  React.Children.forEach(props.children, function (child) {
    if (child.type === Colgroup) {
      BaseColgroup = child;
    } else if (child.type === Thead) {
      BaseThead = child;
    } else if (child.type === Tbody) {
      BaseTbody = child;
    } else if (child.type === Tfoot) {
      BaseTfoot = child;
    }
  });
  const setHeaderFooterYScrollBar = function () {
    const scrollWidth = scrollAreaRef.current.offsetWidth;
    const baseTableWidth = baseTableRef.current.offsetWidth;
    const scrollBarWidth = scrollWidth - baseTableWidth;

    if (BaseThead && BaseThead.props.fixed === "true") {
      setYScrollBar(scrollBarWidth, headerTableRef, 'th');
    }

    if (BaseTfoot && BaseTfoot.props.fixed === "true") {
      setYScrollBar(scrollBarWidth, footerTableRef, 'td');
    }
  };
  const setScrollAreaHeight = function () {
    const tableContainerHeight = scrollAreaRef.current.parentElement.parentElement.clientHeight;
    let headerHeight = 0;
    let footerHeight = 0;

    if (BaseThead && BaseThead.props.fixed === "true") {
      headerHeight = headerTableRef.current.offsetHeight;
    }

    if (BaseTfoot && BaseTfoot.props.fixed === "true") {
      footerHeight = footerTableRef.current.offsetHeight;
    }

    scrollAreaRef.current.style.height = (tableContainerHeight - headerHeight - footerHeight) + 'px';
  };
  // 直接操作DOM，避免使用状态，造成整个table组件的更新，性能差
  const resize = function () {
    setScrollAreaHeight();
    setHeaderFooterYScrollBar();
  };
  useEffect(resize);

  const tableProps = filterProps(props, tableCustomizeProps);
  const status = props.status || 'have-data';

  return (
    <React.Fragment>
      {
        BaseThead && BaseThead.props.fixed === "true" &&
        <div className="thead">
          <table {...tableProps} ref={headerTableRef} >
            {BaseColgroup}
            {BaseThead}
          </table>
        </div>
      }
      <div style={{ position: 'relative' }}>
        <div ref={scrollAreaRef} className={[commonStyle['overflow-y-auto'], props.scrollBarClassName].join(' ')} style={{ height: '0px' }}>
          <table {...tableProps} ref={baseTableRef}>
            {BaseColgroup}
            {BaseThead && BaseThead.props.fixed !== "true" && BaseThead}
            {BaseTbody}
            {BaseTfoot && BaseTfoot.props.fixed !== "true" && BaseTfoot}
          </table>
        </div>
        {/* 组件外传入Loading、NoData、Fail其中一个时，才显示full-mask */}
        {
          (props.Loading || props.NoData || props.Fail) && 
          <div className={commonStyle['full-mask']} style={{ display: status !== 'have-data' ? 'block' : 'none' }}>
            {status === 'loading' && props.Loading}
            {status === 'no-data' && props.NoData}
            {status === 'fail' && props.Fail}
          </div>
        }
      </div>
      {
        BaseTfoot && BaseTfoot.props.fixed === "true" &&
        <div className="footer">
          <table {...tableProps} ref={footerTableRef}>
            {BaseColgroup}
            {BaseTfoot}
          </table>
        </div>
      }
    </React.Fragment>
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

export const Tr = function Tr(props) {
  return <tr {...props}>{props.children}</tr>
}

export const Th = function Th(props) {
  return <th {...props}>{props.children}</th>
}

export const Td = function Td(props) {
  return <td {...props}>{props.children}</td>
}

export const Loading = function Loading(props) {
  return <div {...props}>{props.children}</div>
}

export const NoData = function NoData(props) {
  return <div {...props}>{props.children}</div>
}

export const Fail = function Fail(props) {
  return <div {...props}>{props.children}</div>
}