import React from 'react';

function renderTableFragments(props, Colgroup, Thead, Tbody, Tfoot) {
  const leftCols = [];
  let leftTheadTrs = null;
  let leftTbodyTrs = null;
  let leftTfootTrs = null;
  const leftIndexes = [];

  const rightCols = [];
  let rightTheadTrs = null;
  let rightTbodyTrs = null;
  let rightTfootTrs = null;
  const rightIndexes = [];

  let columns = 0;
  let baseColgroup = null;
  let baseThead = null;
  let baseTbody = null;
  let baseTfoot = null;
  // 先遍历出fixed, 并算出总的列数
  React.Children.forEach(props.children, function (child) {
    if (child.type === Colgroup) {
      baseColgroup = child;
      // 遍历cols, 找出固定的列的索引, 因为有break的操作, 所以没有用React.Children.forEach
      let cols = baseColgroup.props.children;

      if (!Array.isArray(cols)) {
        cols = [cols];
      }
      // 生成一个完整的cols, <col span="2" />合并的情况, 被合并的col用null填充
      const completedCols = [];
      const ilen = cols.length;
      // 计算总列数
      for (let i = 0; i < ilen; i++) {
        const col = cols[i];
        const span = Number(col.props.span || 1);
        let start = 1;

        while (start <= span) {
          if (start !== 1) {
            completedCols[columns + start - 1] = null;
          }

          start++;
        }

        completedCols[columns] = col;

        columns += span;
      }
      // 获取两侧的cols
      // 左侧开始遍历
      for (let i = 0; i < columns; i++) {
        const col = completedCols[i];

        if (col && col.props.fixed === 'true') {
          leftCols.push(React.cloneElement(col, {
            key: col.props.key || i
          }));
          const span = Number(col.props.span || 1);
          let start = 0;

          while (start < span) {
            leftIndexes.push(i + start);
            start++;
          }
        } else if (col === null) {
          continue;
        } else {
          break;
        }
      }
      // 右侧开始遍历
      for (let i = columns - 1; i > -1; i--) {
        const col = completedCols[i];

        if (col && col.props.fixed === 'true') {
          rightCols.push(React.cloneElement(col, {
            key: col.props.key || i
          }));
          const span = Number(col.props.span || 1);
          let start = 0;

          while (start < span) {
            rightIndexes.splice(0, 0, i - start);
            start++;
          }
        } else if (col === null) {
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
      baseThead = child;
      const result = renderLeftRightTrs(leftIndexes, rightIndexes, columns, child);
      leftTheadTrs = result.leftTrs;
      rightTheadTrs = result.rightTrs;
    } else if (child.type === Tbody) {
      baseTbody = child;
      const result = renderLeftRightTrs(leftIndexes, rightIndexes, columns, child);
      leftTbodyTrs = result.leftTrs;
      rightTbodyTrs = result.rightTrs;
    } else if (child.type === Tfoot) {
      baseTfoot = child;
      const result = renderLeftRightTrs(leftIndexes, rightIndexes, columns, child);
      leftTfootTrs = result.leftTrs;
      rightTfootTrs = result.rightTrs;
    }
  });

  return {
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
  };
}

/**
 * 渲染两侧固定表的Thead、Tbody或Tfoot的trs
 * @param {Array} leftIndexes 左侧固定的索引数组
 * @param {Array} rightIndexes 右侧固定的索引数组
 * @param {Number} columns 表格总的列数
 * @param {Object} part Thead Tbody Tfoot
 */
function renderLeftRightTrs(leftIndexes, rightIndexes, columns, part) {
  const leftTrs = [];
  const rightTrs = [];
  let children = part.props.children;

  if (children === undefined || children === null) {
    return { leftTrs: children, rightTrs: children }
  }

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

  if (trs.length !== children.length) {
    throw new Error('rowSpan相加的行数和实际渲染行数不一致，请检查。');
  }
  // 填充固定表的表头
  // 遍历行
  trs.forEach(function (cells, i) {
    const child = children[i];
    const lefts = [];

    leftIndexes.forEach(function (index) {
      lefts.push(cells[index]);
    });

    leftTrs.push(React.cloneElement(child, {
      key: child.key || i,
      children: lefts
    }));

    const rights = [];

    rightIndexes.forEach(function (index) {
      rights.push(cells[index]);
    });

    rightTrs.push(React.cloneElement(child, {
      key: child.key || i,
      children: rights
    }));
  });

  return { leftTrs, rightTrs };
}

export default renderTableFragments;