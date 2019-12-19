const SCROLL_COL_CLASS = 'scroll-bar y-scroll-bar scroll-bar-' + Date.now();

function setTopBottomScrollBar(scrollBarWidth, tableRef, cellName) {
  const table = tableRef.current;
  const colgroup = table.querySelector('colgroup');
  const cols = colgroup.querySelectorAll('col');
  const trs = table.querySelectorAll('tr');
  const firstTr = trs[0];
  const lastCell = firstTr.children[firstTr.children.length - 1];
  const lastCol = cols[cols.length - 1];
  // 判断是否添加过滚动占位列
  if (lastCol.className === SCROLL_COL_CLASS) {
    // 滚动条宽度等于0时，删掉添加的占位列
    if (scrollBarWidth === 0) {
      if (lastCol.className === SCROLL_COL_CLASS) {
        colgroup.removeChild(lastCol);
      }
  
      if (lastCell.className === SCROLL_COL_CLASS) {
        firstTr.removeChild(lastCell);
      }
    }
  } else if (scrollBarWidth > 0) {
    // 滚动条宽度大于0时，动态添加滚动占位列，增加表格的宽度
    const col = document.createElement('col');
    col.className = SCROLL_COL_CLASS;
    col.setAttribute('width', String(scrollBarWidth));
    colgroup.appendChild(col);

    const cell = document.createElement(cellName);
    cell.className = SCROLL_COL_CLASS;
    cell.setAttribute('rowspan', trs.length);
    firstTr.appendChild(cell);
  }
}

export default setTopBottomScrollBar;