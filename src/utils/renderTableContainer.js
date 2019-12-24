import React from 'react';
import commonStyle from '../components/common.module.css';
import addClassName from './addClassName.js';
import filterProps from './filterProps.js';
import tableCustomizeProps from '../utils/tableCustomizeProps.js';

function renderTableContainer(props, Table, Loading, NoData, Fail) {
  let table = null;
  let loading = null;
  let noData = null;
  let fail = null;
  
  React.Children.forEach(props.children, function (child, index) {
    if (child.type === Table) {
      table = child;
    } else if (child.type === Loading) {
      loading = child;
    } else if (child.type === NoData) {
      noData = child;
    } else if (child.type === Fail) {
      fail = child;
    } 
  });

  table = React.cloneElement(table, { 
    scrollBarClassName: props.scrollBarClassName,
    status: props.status,
    Loading: loading,
    NoData: noData,
    Fail: fail
  });

  let tableContainerProps = addClassName(props, 'table-container ' + commonStyle['table-container']);
  tableContainerProps = filterProps(tableContainerProps, tableCustomizeProps);

  return (
    <div {...tableContainerProps}>
      {table}
    </div>
  )
}

export default renderTableContainer;
