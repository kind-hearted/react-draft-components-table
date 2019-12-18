## 表格实现过程中常见的问题，需要解决这些问题

### 其他知识
* Mac浏览器：使用鼠标系统就有默认滚动条，拔掉鼠标用触摸板就没有默认滚动条（有虚拟滚动条）

### 样式问题
[https://github.com/ant-design/ant-design/issues/13994]
问题：safari 表格同时设置x和y滚动会出现两条滚动条

[https://github.com/ant-design/ant-design/issues/20269]
问题：Table组件设置横纵滚动并且有右固定列时，右固定列与表格会有些许错位

[https://github.com/ant-design/ant-design/issues/14859]
问题：当滚动列的行高变化时，固定列的行高不会同步变化

[https://github.com/ant-design/ant-design/issues/18879]
问题：ant-design的固定表头实现方式：IE11、Edge浏览器头部出现滚动条

[https://github.com/ant-design/ant-design/issues/20269]
问题：Table组件设置横纵滚动并且有右固定列时，右固定列与表格会有些许错位，边框不对齐




### 性能问题
[https://github.com/ant-design/ant-design/issues/14554]
问题：Table组件，树形数据层级超过3层时，表格渲染特别卡

[https://github.com/ant-design/ant-design/issues/10431]
问题：table/select/checkbox 数据多 选中响应慢