import React, { useEffect, useRef } from 'react';
import style from './FixedAllSides.module.css';

/**
  * 固定表头、表尾、表列
  */

const SCROLL_COL_CLASS = 'scroll-bar scroll-bar-' + Date.now();
const setScrollBar = function (scrollBarWidth, fixedTable, type) {
  const colgroup = fixedTable.current.querySelector('colgroup');
  const cols = colgroup.querySelectorAll('col');
  const trs = fixedTable.current.querySelectorAll('tr');
  const firstTr = trs[0];
  const lastCell = firstTr.children[firstTr.children.length - 1];
  const lastCol = cols[cols.length - 1];
  // 判断是否添加过占位列，表格的宽度需要加或减滚动条宽度
  if (lastCol.className === SCROLL_COL_CLASS) {
    // 滚动条宽度为0时，删掉添加的占位列
    if (scrollBarWidth === 0) {
      if (lastCol.className === SCROLL_COL_CLASS) {
        colgroup.removeChild(lastCol);
      }
  
      if (lastCell.className === SCROLL_COL_CLASS) {
        firstTr.removeChild(lastCell);
      }
    }
  } else if (scrollBarWidth > 0) {
    // 没有滚动占位列并存在滚动条宽度时，动态添加，增加表格的宽度
    const col = document.createElement('col');
    col.className = SCROLL_COL_CLASS;
    col.setAttribute('width', String(scrollBarWidth));
    colgroup.appendChild(col);

    const cell = document.createElement(type);
    cell.className = SCROLL_COL_CLASS;
    cell.setAttribute('rowspan', trs.length);
    firstTr.appendChild(cell);
  }
};
/**
 * 渲染两侧固定表的Thead、Tbody或Tfoot的trs
 * @param {Array} leftFixedIndexes 左侧固定的索引数组
 * @param {Array} rightFixedIndexes 右侧固定的索引数组
 * @param {Number} columns 列数
 * @param {Object} part Thead Tbody Tfoot
 */
const renderFixedPartTrs = function (leftFixedIndexes, rightFixedIndexes, columns, part) {
  const Left = [];
  const Right = [];
  let children = part.props.children;

  if (!Array.isArray(children)) {
    children = [children];
  }
  // 循环行、列生成一个二维数组, 被合并的行、列以null占位
  const rows = children.length;
  let row = 0;
  const trs = [];

  while (row < rows) {
    trs[row] || (trs[row] = []);
    // column index之间不一定是相等的, 需要两个变量区分
    let column = 0;
    let index = 0;
    const tr = children[row];

    while (column < columns) {
      // null占位的空格跳过
      if (trs[row][column] === null) {
        column++;
        continue;
      }
      // 每一行的th数量小于或等于columns
      let cells = tr.props.children;

      if (!Array.isArray(cells)) {
        cells = [cells];
      }

      const cell = cells[index];

      if (trs[row][column] !== null && cell) {
        index++;
        trs[row][column] = cell;

        const colSpan = Number(cell.props.colSpan || 1);
        const rowSpan = Number(cell.props.rowSpan || 1);
        let startColumn = 1;
        
        while(startColumn <= colSpan) {
          let startRow = 1;

          while(startRow <= rowSpan) {
            // 其中一个不为1, 说明有合并的情况发生
            if (startColumn !== 1 || startRow !== 1) {
              const currentRow = row + startRow - 1;
              const currentColumn = column + startColumn - 1;

              trs[currentRow] || (trs[currentRow] = []);
              trs[currentRow][currentColumn] = null;
            }
            
            startRow++;
          }

          startColumn++;
        }
      }

      column++;
    }

    row++;
  }
  // 填充固定表的表头
  // 遍历行
  trs.forEach(function (cells, i) {
    // 处理合并行、合并列的情况
    const lefts = [];

    leftFixedIndexes.forEach(function (index) {
      lefts.push(cells[index]);
    });

    Left.push(<tr key={i}>{lefts}</tr>);

    const rights = [];

    rightFixedIndexes.forEach(function (index) {
      rights.push(cells[index]);
    });

    Right.push(<tr key={i}>{rights}</tr>);
  });

  return { Left, Right };
};
/**
 * 计算固定表格的宽度
 * @param {*} ths 使用thead的第一行的ths即可
 * @param {*} indexes 固定的列索引
 */
const computedFixedTableWidth = function (ths, indexes) {
  const startIndex = indexes[0];
  const endIndex = indexes[indexes.length - 1];

  let width = 0;
  let column = 0;
  let idx = 0;
  
  while (idx < ths.length) {
    const th = ths[idx];
    // 合并列的情况
    const colspan = Number(th.getAttribute('colspan') || 1);
    
    if (column >=  startIndex && column <= endIndex) {
      width += th.offsetWidth;
    }

    column += colspan;
    idx++;
  }

  return width;
};

const setFixedTableRowHeight = function (baseTable, leftTable, rightTable, selector) {
  const baseRows = baseTable.current.querySelectorAll(selector);
  const leftRows = leftTable.current.querySelectorAll(selector);
  const rightRows = rightTable.current.querySelectorAll(selector);

  for (let i = 0, ilen = baseRows.length; i < ilen; i++) {
    const height = baseRows[i].getBoundingClientRect().height;

    if (leftRows[i]) {
      leftRows[i].style.height = height + 'px';
    }

    if (rightRows[i]) {
      rightRows[i].style.height = height + 'px';
    }
  }
};

export const Table = function Table(props) {
  const leftHeader = useRef();
  const baseHeader = useRef();
  const rightHeader = useRef();
  const headerRightScrollBar = useRef();
  const baseScrollOuter = useRef();

  const leftTable = useRef();
  const baseTable = useRef();
  const rightTable = useRef();

  const scrollHeader = useRef();
  const scrollBody = useRef();
  const scrollBottom = useRef();

  let columns = 0;

  const LeftCols = [];
  let LeftTheadTrs = null;
  let LeftTbody = null;
  let LeftTfoot = null;
  const leftFixedIndexes = [];

  const RightCols = [];
  let RightTheadTrs = null;
  let RightTbody = null;
  let RightTfoot = null;
  const rightFixedIndexes = [];

  let BaseColgroup = null;
  let BaseThead = null;
  let BaseTbody = null;
  let BaseTfoot = null;
  // 先遍历出fixed, 并算出总的列数
  React.Children.forEach(props.children, function (child) {
    if (child.type === Colgroup) {
      BaseColgroup = React.cloneElement(child, {
        className: [child.props.className, 'colgroup'].join(' ')
      });
      // 遍历Col, 找出固定的列的索引, 因为有break的操作, 所以没有用React.Children.forEach
      let children = child.props.children;

      if (!Array.isArray(children)) {
        children = [children];
      }
      // 生成一个和列数长度一致的数组, 存在<col span="2" />合并的情况, 被合并的用null填充
      const colgroup = [];
      const ilen = children.length;
      // 计算总列数
      for (let i = 0; i < ilen; i++) {
        const child = children[i];
        const span = Number(child.props.span || 1);
        let start = 1;

        while (start <= span) {
          if (start !== 1) {
            colgroup[columns + start - 1] = null;
          }

          start++;
        }

        colgroup[columns] = child;

        columns += span;
      }
      // 填充固定列的表的colgroup
      // 左侧开始遍历
      for (let i = 0; i < columns; i++) {
        const child = colgroup[i];

        if (child && child.props.fixed === 'true') {
          LeftCols.push(React.cloneElement(child, {
            key: child.props.key || i
          }));
          const span = Number(child.props.span || 1);
          let start = 0;

          while (start < span) {
            leftFixedIndexes.push(i + start);
            start++;
          }
        } else if (child === null) {
          continue;
        } else {
          break;
        }
      }
      // 右侧开始遍历
      for (let i = columns - 1; i > -1; i--) {
        const child = colgroup[i];

        if (child && child.props.fixed === 'true') {
          RightCols.push(React.cloneElement(child, {
            key: child.props.key || i
          }));
          const span = Number(child.props.span || 1);
          let start = 0;

          while (start < span) {
            rightFixedIndexes.splice(0, 0, i - start);
            start++;
          }
        } else if (child === null) {
          continue;
        } else {
          break;
        }
      }
    }
  });
  // 分别填充表头、表体、表尾
  React.Children.forEach(props.children, function (child) {
    if (child.type === Thead) {
      BaseThead = React.cloneElement(child, {
        className: [child.props.className, 'thead'].join(' ')
      });
      const partTrs = renderFixedPartTrs(leftFixedIndexes, rightFixedIndexes, columns, child);
      LeftTheadTrs = partTrs.Left;
      RightTheadTrs = partTrs.Right;
    } else if (child.type === Tbody) {
      BaseTbody = React.cloneElement(child, {
        className: [child.props.className, 'tbody'].join(' ')
      });
      const partTrs = renderFixedPartTrs(leftFixedIndexes, rightFixedIndexes, columns, child);
      LeftTbody = partTrs.Left;
      RightTbody = partTrs.Right;
    } else if (child.type === Tfoot) {
      BaseTfoot = React.cloneElement(child, {
        className: [child.props.className, 'tfoot'].join(' ')
      });
      const partTrs = renderFixedPartTrs(leftFixedIndexes, rightFixedIndexes, columns, child);
      LeftTfoot = partTrs.Left;
      RightTfoot = partTrs.Right;
    }
  });

  // 计算设置固定表格的列宽、行高，需要直接操作DOM，避免尺寸变化的属性引起react的更新，影响性能
  useEffect((function setFixedTableSize() {
    // 计算固定列宽，相加设置容器元素宽度
    const ths = baseHeader.current.querySelector('thead tr').children;
    const leftFixedWidth = computedFixedTableWidth(ths, leftFixedIndexes);
    leftHeader.current.parentElement.style.width = leftFixedWidth + 'px';
    leftTable.current.parentElement.style.width = leftFixedWidth + 'px';

    const rightFixedWidth = computedFixedTableWidth(ths, rightFixedIndexes);
    rightHeader.current.parentElement.style.width = rightFixedWidth + 'px';
    rightTable.current.parentElement.style.width = rightFixedWidth + 'px';

    setFixedTableRowHeight(baseHeader, leftHeader, rightHeader, 'thead>tr');
    setFixedTableRowHeight(baseTable, leftTable, rightTable, 'tbody>tr');

    const scrollBodyWidth = scrollBody.current.offsetWidth;
    const scrollBodyBoxWidth = scrollBody.current.parentElement.parentElement.offsetWidth;
    const scrollBarWidth = scrollBodyBoxWidth - scrollBodyWidth;
    const headerRightScrollBarStyle = headerRightScrollBar.current.style;

    headerRightScrollBarStyle.width = scrollBarWidth + 'px';

    if (scrollBarWidth === 0) {
      headerRightScrollBarStyle.display = 'none';
    } else {
      headerRightScrollBarStyle.display = 'block';
    }

    rightHeader.current.parentElement.style.right = scrollBarWidth + 'px';
    
    // 设置头部的右侧滚动条
    if (BaseThead && BaseThead.props.fixed === "true") {
      setScrollBar(scrollBarWidth, baseHeader, 'th');
      // 固定表格的宽度等于基础表格的宽度加上滚动条宽度
      baseHeader.current.style.width = (baseTable.current.offsetWidth + scrollBarWidth) + 'px';
    }
    // 根据头部来判断是否需要横向滚动条，因为内容区可能没有内容
    const headerDiffWidth = baseTable.current.offsetWidth - baseTable.current.parentElement.offsetWidth;

    if (headerDiffWidth > 0) {
      // 设置底部单独滚动条子元素的宽度
      scrollBottom.current.children[0].style.width = baseTable.current.offsetWidth + 'px';
      scrollBottom.current.style.display = 'block';
      baseScrollOuter.current.style.height = (baseScrollOuter.current.parentElement.offsetHeight - scrollBarWidth) + 'px';
    } else {
      scrollBottom.current.style.display = 'none';
      baseScrollOuter.current.style.height = '100%';
    }
    // 设置横向滚动区域的margin bottom为负的滚动条高度，达到隐藏滚动条的目的
    // 注: 不使用scrollBarWidth，因为scroll body可能不出现滚动条
    const scrollXBarHeight = scrollHeader.current.offsetHeight - scrollHeader.current.children[0].offsetHeight;
    scrollHeader.current.style.marginBottom = -1 * scrollXBarHeight + 'px';
    scrollBody.current.style.marginBottom = -1 * scrollXBarHeight + 'px';

    if (BaseTfoot && BaseTfoot.props.fixed === "true") {
      // setScrollBar(scrollBarWidth, baseHeader, 'td');
    }
  }));

  let flag = false;

  const onScrollHeader = function (event) {
    if (!flag) {
      const scrollLeft = event.target.scrollLeft;
      scrollBottom.current.scrollLeft = scrollLeft;
      scrollBody.current.scrollLeft = scrollLeft;
    }

    flag = false;
  };

  const onScrollBody = function (event) {
    if (!flag) {
      const scrollLeft = event.target.scrollLeft;
      scrollHeader.current.scrollLeft = scrollLeft;
      scrollBottom.current.scrollLeft = scrollLeft;
    }

    flag = false;
  };

  const onScrollBottom = function (event) {
    if (!flag) {
      const scrollLeft = event.target.scrollLeft;
      scrollHeader.current.scrollLeft = scrollLeft;
      scrollBody.current.scrollLeft = scrollLeft;
    }

    flag = false;
  };

  // TODO：先实现固定表头+固定列，配置的固定表头、表尾后续再做
  return (
    <div className="table-box" style={{ position: 'relative' }}>
      {/* 固定表头部分 */}
      <div className={style['hide-scroll-bar-wraper']}>
        {/* 左边固定第一列表头 */}
        <div className={style.left}>
          <table className="table" style={{ width: '100%' }} ref={leftHeader}>
            <colgroup className="colgroup">
              {LeftCols}
            </colgroup>
            <thead className="thead">
              {LeftTheadTrs}
            </thead>
          </table>
        </div>
        {/* 右边固定第一列表头。加上可能出现的右侧滚动条 */}
        <div className={style.right}>
          <table className="table" style={{ width: '100%' }} ref={rightHeader}>
            <colgroup className="colgroup">
              {RightCols}
            </colgroup>
            <thead className="thead">
              {RightTheadTrs}
            </thead>
          </table>
        </div>
        {/* 定位一个scroll bar */}
        <div className={style['right-scroll-bar']} ref={headerRightScrollBar}></div>
        {/* 可滚动的base表头。加上可能出现的滚动条 */}
        {/* 包裹一个overflow: hidden的div, 隐藏滚动条 */}
        <div style={{ overflow: 'hidden' }}>
          <div style={{ overflow: 'auto' }} onScroll={onScrollHeader} ref={scrollHeader}>
            <table className="table" ref={baseHeader} style={{ minWidth: '1200px' }}>
              {BaseColgroup}
              {BaseThead}
            </table>
          </div>
        </div>
      </div>
      <div className={style['base-scroll-container']} style={{ height: '200px' }}>
        {/* base-scroll-outer的高需要设为base-scroll-container高度和滚动条高度之差 */}
        <div className={style['base-scroll-outer']} ref={baseScrollOuter} style={{ height: '100%' }}>
          {/* 左边固定第一列表体 */}
          <div className={style.left}>
            <table className="table" style={{ width: '100%' }} ref={leftTable}>
              <colgroup className="colgroup">
                {LeftCols}
              </colgroup>
              <tbody className="tbody">
                {LeftTbody}
              </tbody>
              <tfoot className="tfoot">
                {LeftTfoot}
              </tfoot>
            </table>
          </div>
          {/* 右边固定第一列表体。加上可能出现的滚动条 */}
          <div className={style.right}>
            <table className="table" style={{ width: '100%' }} ref={rightTable}>
              <colgroup className="colgroup">
                {RightCols}
              </colgroup>
              <tbody className="tbody">
                {RightTbody}
              </tbody>
              <tfoot className="tfoot">
                {RightTfoot}
              </tfoot>
            </table>
          </div>
          {/* 包裹一个overflow: hidden的div, 隐藏滚动条 */}
          <div style={{ overflow: 'hidden' }}>
            {/* base-scroll-inner需要设置一个margin-bottom为负的滚动条高度，以便可以隐藏这个滚动条 */}
            <div className={style['base-scroll-inner']} ref={scrollBody} onScroll={onScrollBody}>
              <table className="table" style={{ minWidth: '1200px' }} ref={baseTable}>
                {BaseColgroup}
                {BaseTbody}
                {BaseTfoot}
              </table>
            </div>
          </div>
        </div>
        {/* 一个固定在底部的单独滚动条，用来控制左右滚动。Mac上的浏览器可能没有滚动条高度，需要单独设置。 */}
        <div className={style['scroll-x']} onScroll={onScrollBottom} ref={scrollBottom}>
          {/* 计算: 计算宽度, 加上滚动条的宽度 */}
          <div className={style['scroll-x-inner']}></div>
        </div>
      </div>
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
