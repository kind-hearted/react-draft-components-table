// TableContainer作为容器，定义样式，主要定义宽高，边框等，是必要的包裹
// 原生table所有的元素都会被包装一下，根据需要，额外的添加了一些自定义属性及事件等
// 这样设计目的是，让使用更接近原生table，降低学习成本，更容易自定义样式及插入自定义组件，提高可扩展性
<TableContainer className="xxx" style={{}} status="loading no-data have-data">
  {/* Table组件，定义表格组件自身的样式，minWidth等等 */}
  <Table className="xxx" style={{}}>
    {/* Colgroup是必须的，用来定义列宽，告知列数 */}
    <Colgroup>
      {/* fixed是否固定该列 */}
      <Col fixed="true"></Col>
      <Col></Col>
      <Col></Col>
    </Colgroup>
    {/* Thead是必须的，fixed="true"时，TableContainer必须有固定的高度 */}
    <Thead fixed="true">
      {/* 包装行的事件，向一些hover，click选中需要更新整个组件的情况，可以考虑性能优化 */}
      <Tr>
        <Th></Th>
        <Th></Th>
        <Th></Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td></Td>
        <Td></Td>
        <Td></Td>
      </Tr>
    </Tbody>
    <Tfoot fixed="true">
      <Tr>
        <Td></Td>
        <Td></Td>
        <Td></Td>
      </Tr>
    </Tfoot>
  </Table>
  {/* 声明Loading、NoData时显示的组件 */}
  <Loading></Loading>
  <NoData></NoData>
</TableContainer>