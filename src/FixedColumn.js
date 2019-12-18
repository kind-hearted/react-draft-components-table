import React, { useEffect, useRef } from 'react';
import style from './FixedColumn.module.css';
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

const addClassName = function (props, className) {
  const result = {};

  for (let key in props) {
    result[key] = props[key];
  }

  result.className = [result.className, className].join(' ');

  return result;
};

export const Table = function Table(props) {
  const leftTable = useRef();
  const baseTable = useRef();
  const rightTable = useRef();

  const LeftCols = [];
  let LeftThead = null;
  let LeftTbody = null;
  let LeftTfoot = null;
  const leftFixedIndexes = [];

  const RightCols = [];
  let RightThead = null;
  let RightTbody = null;
  let RightTfoot = null;
  const rightFixedIndexes = [];

  let columns = 0;
  let ElColgroup = null;
  let ElThead = null;
  let ElTbody = null;
  let ElTfoot = null;
  // 先遍历出fixed, 并算出总的列数
  React.Children.forEach(props.children, function (child) {
    if (child.type === Colgroup) {
      ElColgroup = React.cloneElement(child, {
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
      ElThead = React.cloneElement(child, {
        className: [child.props.className, 'thead'].join(' ')
      });
      const partTrs = renderFixedPartTrs(leftFixedIndexes, rightFixedIndexes, columns, child);
      LeftThead = partTrs.Left;
      RightThead = partTrs.Right;
    } else if (child.type === Tbody) {
      ElTbody = React.cloneElement(child, {
        className: [child.props.className, 'tbody'].join(' ')
      });
      const partTrs = renderFixedPartTrs(leftFixedIndexes, rightFixedIndexes, columns, child);
      LeftTbody = partTrs.Left;
      RightTbody = partTrs.Right;
    } else if (child.type === Tfoot) {
      ElTfoot = React.cloneElement(child, {
        className: [child.props.className, 'tfoot'].join(' ')
      });
      const partTrs = renderFixedPartTrs(leftFixedIndexes, rightFixedIndexes, columns, child);
      LeftTfoot = partTrs.Left;
      RightTfoot = partTrs.Right;
    }
  });
  // 计算设置固定表格的列宽、行高，需要直接操作DOM
  useEffect((function setFixedTableSize() {
    // 计算固定列宽，相加设置容器元素宽度
    const ths = baseTable.current.querySelector('thead tr').children;
    const leftTableWidth = computedFixedTableWidth(ths, leftFixedIndexes);
    leftTable.current.parentElement.style.width = leftTableWidth + 'px';

    const rightTableWidth = computedFixedTableWidth(ths, rightFixedIndexes);
    rightTable.current.parentElement.style.width = rightTableWidth + 'px';
    // 计算行高，设置各行高度, 表格内部可能会嵌套表格, 所以选择器需要唯一
    setFixedTableRowHeight(baseTable, leftTable, rightTable, 'thead>tr');
    setFixedTableRowHeight(baseTable, leftTable, rightTable, 'tbody>tr');
    setFixedTableRowHeight(baseTable, leftTable, rightTable, 'tfoot>tr');
  }));
  // TODO：table、colgroup、thead、tbody、tfoot要拷贝一些props
  const tableProps = addClassName(props, 'table');

  return (
    <div className={'table-box ' + style.table}>
      <div className={style.left}>
        <table {...tableProps} style={{ width: '100%' }} ref={leftTable}>
          <colgroup {...ElColgroup.props}>
            {LeftCols}
          </colgroup>
          <thead {...ElThead.props}>
            {LeftThead}
          </thead>
          <tbody {...ElTbody.props}>
            {LeftTbody}
          </tbody>
          {
            LeftTfoot &&
            <tfoot {...ElTfoot.props}>
              {LeftTfoot}
            </tfoot>
          }
        </table>
      </div>
      <div className={style.right}>
        <table {...tableProps} style={{ width: '100%' }} ref={rightTable}>
          <colgroup {...ElColgroup.props}>
            {RightCols}
          </colgroup>
          <thead {...ElThead.props}>
            {RightThead}
          </thead>
          <tbody {...ElTbody.props}>
            {RightTbody}
          </tbody>
          {
            RightTfoot &&
            <tfoot {...ElTfoot.props}>
              {RightTfoot}
            </tfoot>
          }
        </table>
      </div>
      <div style={{ overflow: 'auto', width: '100%' }}>
        <table ref={baseTable} {...tableProps}>
          {ElColgroup}
          {ElThead}
          {ElTbody}
          {ElTfoot}
        </table>
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
