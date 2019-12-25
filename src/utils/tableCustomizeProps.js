const tableCustomizeProps = [
  'scrollBarClassName',  // String 配置滚动条的样式
  'event', // Event 事件对象，父子间相互通信，避免组件刷新
  // fail：加载失败的状态，看自己的需求，不一定要设置
  'status', // loading fail no-data have-data
  'resize', // true false 触发表格的resize
  'Loading', // Component
  'NoData', // Component
  'Fail', // Component
];

export default tableCustomizeProps