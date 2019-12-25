import React, { useEffect, useRef } from 'react';
import commonStyle from './common.module.css';
import style from './FixedSideColumn.module.css';
import renderSideFragments from '../utils/renderSideFragments.js';
import computedPartOfTableWidth from '../utils/computedPartOfTableWidth.js';
import setLeftRightTrsHeight from '../utils/setLeftRightTrsHeight.js';
import filterProps from '../utils/filterProps.js';
import tableCustomizeProps from '../utils/tableCustomizeProps.js';
import renderTableContainer from '../utils/renderTableContainer.js';
/**
  * 固定两侧表列（一列或连续的多列）
  * 1、固定一侧的列需要单独的列表, 每行的高度需要和实际的表相同
  * 2、当实际的表高度发生变化时, 需要重新设置固定列的表行高, 以对齐
  * 
  * 分析
  * 1、固定的列是一个新的表
  * 2、表头的宽度需要和实际的表相同
  * 3、每行的高度需要和实际的表相同
  * 4、当实际的表高度发生变化时, 需要重新设置固定表的行高、表头宽度, 以对齐
  * 5、固定的列原表格有边框, 如何分割边框?
  * 
  * 
  * 实现
  * 1、设置固定列所属新表格的宽(需要考虑合并表头的列)
  * 2、设置固定列所属新表格各行的高(需要考虑合并行的情况), 如果行高固定, 可以不计算行高设置
  */
/**
  * 设计思路
  * 1、尽量维持原生表格的使用方式, 仅以某个参数代表是否需要表头固定
  * 
  * 优化策略
  * 1、尽量不生成多余的元素
  * 2、减少计算行高的耗时
  */
// TODO：公开一个方式，可以让外部告知组件调用setLeftRightTrsHeight去更新固定列的行高
export const TableContainer = function (props) {
  return renderTableContainer(props, Table, Loading, NoData, Fail);
}

const noShadowClassName = ' ' + commonStyle['no-shadow'];
const addNoShadow = function (ref) {
  if (ref.current) {
    const element = ref.current.parentElement;
    let className = element.className;

    if (className.indexOf(noShadowClassName) === -1) {
      element.className = className + noShadowClassName;
    }
  }
};

const removeNoShadow = function (ref) {
  if (ref.current) {
    const element = ref.current.parentElement;
    let className = element.className;

    if (className.indexOf(noShadowClassName) > -1) {
      element.className = className.replace(noShadowClassName, '');
    }
  }
};

const PLACEHOLDER_TR_KEY = 'placeholder-tr-' + Date.now();

export const Table = function Table(props) {
  const status = props.status || 'have-data';
  const leftTableRef = useRef();
  const baseTableRef = useRef();
  const rightTableRef = useRef();
  const fullMaskRef = useRef();

  const {
    leftIndexes,
    rightIndexes,

    leftCols,
    leftTheadTrs,
    leftTbodyTrs,
    leftTfootTrs,

    rightCols,
    rightTheadTrs,
    rightTbodyTrs,
    rightTfootTrs,

    baseColgroup,
    baseThead,
    baseTbody,
    baseTfoot,
  } = renderSideFragments(props, Colgroup, Thead, Tbody, Tfoot);

  const setFixedTableSize = function () {
    // TODO：放在useEffect执行，频率会非常高，需要优化
    // 计算行高，设置各行高度, 表格内部可能会嵌套表格, 所以选择器需要唯一
    setLeftRightTrsHeight(baseTableRef, leftTableRef, rightTableRef, 'thead>tr');
    setLeftRightTrsHeight(baseTableRef, leftTableRef, rightTableRef, 'tbody>tr');
    setLeftRightTrsHeight(baseTableRef, leftTableRef, rightTableRef, 'tfoot>tr');
    // 计算固定列宽，相加设置容器元素宽度
    const ths = baseTableRef.current.querySelector('thead tr').children;
    const leftTableWidth = computedPartOfTableWidth(ths, leftIndexes);
    leftTableRef.current.parentElement.style.width = leftTableWidth + 'px';

    const rightTableWidth = computedPartOfTableWidth(ths, rightIndexes);
    rightTableRef.current.parentElement.style.width = rightTableWidth + 'px';
  };
  const setFullMaskPosition = function () {
    if (fullMaskRef.current) {
      const table = baseTableRef.current;
      let theadHeight = 0;

      if (baseThead) {
        theadHeight = table.querySelector('thead').offsetHeight;
      }

      const fullMaskStyle = fullMaskRef.current.style;
      fullMaskStyle.top = theadHeight + 'px';
    }
  };
  const fillPlaceholderTr = function () {
    if (fullMaskRef.current) {
      const table = baseTableRef.current;
      const scrollBarHeight = table.parentElement.offsetHeight - table.offsetHeight;
      const fullMaskEl = fullMaskRef.current;
      const tbody = baseTableRef.current.querySelector('tbody');
      const trs = tbody.children;
      const placeholderTr = trs[trs.length - 1];

      if (status === 'have-data') {
        fullMaskEl.style.display = 'none';
        placeholderTr.style.height = '0px';
      } else if (status !== 'have-data') {
        if (fullMaskEl.children && fullMaskEl.children[0]) {
          const contentHeight = fullMaskEl.children[0].offsetHeight;
          const tbodyHeight = tbody.offsetHeight;

          if (contentHeight > tbodyHeight) {
            placeholderTr.style.height = (contentHeight - tbodyHeight) + 'px';
          }

          fullMaskRef.current.style.bottom = scrollBarHeight + 'px';
        }
      }
    }
  };

  const resize = function () {
    setFullMaskPosition();
    fillPlaceholderTr();
    setFixedTableSize();
  };
  // 计算设置固定表格的列宽、行高，需要直接操作DOM
  useEffect(resize);

  const tableProps = filterProps(props, tableCustomizeProps);
  const renderSide = function (classNames, ref, cols, theadTrs, tbodyTrs, tfootTrs) {
    return (
      <div className={classNames.join(' ')}>
        <table {...tableProps} style={{ width: '100%' }} ref={ref}>
          <colgroup {...baseColgroup.props}>
            {cols}
          </colgroup>
          <thead {...baseThead.props}>
            {theadTrs}
          </thead>
          <tbody {...baseTbody.props}>
            {tbodyTrs}
          </tbody>
          {
            leftTfootTrs &&
            <tfoot {...baseTfoot.props}>
              {tfootTrs}
            </tfoot>
          }
        </table>
      </div>
    )
  };
  // 附加一个占位行，以便正常显示无数据、加载中
  const nBaseTbodyChildren = [];
  
  React.Children.forEach(baseTbody.props.children, function (child, index) {
    nBaseTbodyChildren.push(child);
  });

  if (nBaseTbodyChildren.length > 0) {
    const lastTr = nBaseTbodyChildren[nBaseTbodyChildren.length - 1];
  
    nBaseTbodyChildren[nBaseTbodyChildren.length - 1] = React.cloneElement(lastTr, {
      className: ['last-tr', lastTr.props.className].join(' ')
    });
  }
  
  nBaseTbodyChildren.push(
    <tr key={PLACEHOLDER_TR_KEY} className={style['placeholder-tr']}></tr>
  );
  
  const nBaseTbody = React.cloneElement(baseTbody, {}, nBaseTbodyChildren);

  return (
    <React.Fragment>
      {renderSide([style.left, commonStyle['left-shadow'], 'left-shadow', commonStyle['no-shadow']], leftTableRef, leftCols, leftTheadTrs, leftTbodyTrs, leftTfootTrs)}
      <div className={[commonStyle['overflow-x-auto'], props.scrollBarClassName].join(' ')} onScroll={(event) => {
        const target = event.target;
        const maxScrollLeft = target.scrollWidth - target.offsetWidth;
        const scrollLeft = target.scrollLeft;

        if (scrollLeft === 0) {
          addNoShadow(leftTableRef);
          removeNoShadow(rightTableRef);
        } else if (scrollLeft === maxScrollLeft) {
          removeNoShadow(leftTableRef);
          addNoShadow(rightTableRef);
        } else {
          removeNoShadow(leftTableRef);
          removeNoShadow(rightTableRef);
        }
      }}>
        <table ref={baseTableRef} {...tableProps}>
          {baseColgroup}
          {baseThead}
          {nBaseTbody}
          {baseTfoot}
        </table>
      </div>
      {renderSide([style.right, commonStyle['right-shadow'], 'right-shadow'], rightTableRef, rightCols, rightTheadTrs, rightTbodyTrs, rightTfootTrs)}
      {
        (props.Loading || props.NoData || props.Fail) && 
        <div className={commonStyle['full-mask']}  style={{ display: status !== 'have-data' ? 'block' : 'none' }} ref={fullMaskRef}>
          {status === 'loading' && props.Loading}
          {status === 'no-data' && props.NoData}
          {status === 'fail' && props.Fail}
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