/**
 * 计算表格部分表格的宽度
 * @param {*} ths 使用thead的第一行的ths即可
 * @param {*} indexes 部分表格连续的列索引
 */
function computedPartOfTableWidth(ths, indexes) {
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
}

export default computedPartOfTableWidth;
