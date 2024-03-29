## PC端表格设计

PC端的表格，往往都会有以下一些功能，如何按需组合功能? 能否只提供功能，部分简单的页面代码，由用户自行绑定数据及事件?

规定某个接口组件

固定表头、表列目前的实现思路基本都是需要生成多余的局部表格，肯定是组件内部负责生成这些表格(如何安全的拷贝过去?)，生成后如何更新(原表格更新，导致需要更新这些表格)，如何保证更新的效率?

不管是如何固定表头、表列，用户写的方式应该跟普通的表格一致，只是添加某些自定义参数，根据这些参数，在内部实现。

劫持渲染?
打包构建?

### 常见功能：

*	可选固定表头
* 可选固定列
* 可选固定表头+固定两侧的列
*	可选批量选中
*	可选行高固定
*	可自定义单元格内容（text或html）
*	可定义各列的宽

### 高级功能：

*	可手动调整左右列宽
*	可手动筛选字段显示，分页表格往往需要将筛选的参数传给后台
*	可手动排序字段显示，分页表格往往需要将排序的参数传给后台
*	可手动编辑单元格
*	可手动拖拽改变列的顺序
*	可合并表头
*	可定义多行表头
* 可增加删除列
* 可实现expand展开收缩列详情

### 联动功能：

* 表格往往加上分页、搜索组件，需要提供控制滚动条的位置
