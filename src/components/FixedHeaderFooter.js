import React from 'react';
import commonStyle from './common.module.css';
import filterProps from '../utils/filterProps.js';
import setYScrollBar from '../utils/setYScrollBar.js';
import tableCustomizeProps from '../utils/tableCustomizeProps.js';
import renderTableContainer from '../utils/renderTableContainer.js';
/**
  * 固定表头、表尾
  * 1、固定表头首先需要两个列表
  * 2、能正常处理滚动条的占宽
  * 3、保证表头可以对齐表行（如何方便给表头赋值宽度?）
  * 4、表头如何渲染完全取决于用户, 内部相同于复制了一个表头占位显示, 用户无需关心这个表头是如何复制的
  */

 /**
  * 设计思路
  * 1、尽量维持原生表格的使用方式, 仅以某个参数代表是否需要表头固定
  * 
  * 优化策略
  * 1、尽量不生成多余的元素
  * 2、表头的更新应该和表体的更新分开, 避免更新表头时导致整个表格更新, 性能下降
  * 3、
  */
export const TableContainer = function (props) {
  return renderTableContainer(props, Table, Loading, NoData, Fail);
}

export const Table = class Table extends React.Component {
  constructor(props) {
    super(props);
    this.scrollAreaRef = React.createRef();
    this.headerTableRef = React.createRef();
    this.baseTableRef = React.createRef();
    this.footerTableRef = React.createRef();

    this.BaseColgroup = null;
    this.BaseThead = null;
    this.BaseTbody = null;
    this.BaseTfoot = null;

    this.onScroll = (event) => {
      if (this.props.event) {
        // 内部触发的滚动，增加标识阻止再去修改滚动条的位置
        this._preventScroll = true;
        this.props.event.$emit('scroll', {
          left: 0,
          top: event.target.scrollTop
        });
      }
    };

    this._preventScroll = false;
    this.$onScroll = ({ top }) => {
      if (!this._preventScroll) {
        this.scrollAreaRef.current.scrollTop = top;
      }
      this._preventScroll = false;
    };

    this._preventResize = false;
    this.$onResize = () => {
      if (!this._preventResize) {
        this.resize();
      }
      this._preventResize = false;
    };
  }

  setHeaderFooterYScrollBar() {
    const scrollWidth = this.scrollAreaRef.current.offsetWidth;
    const baseTableWidth = this.baseTableRef.current.offsetWidth;
    const scrollBarWidth = scrollWidth - baseTableWidth;

    const BaseThead = this.BaseThead;
    if (BaseThead && BaseThead.props.fixed === "true") {
      setYScrollBar(scrollBarWidth, this.headerTableRef, 'th');
    }

    const BaseTfoot = this.BaseTfoot;
    if (BaseTfoot && BaseTfoot.props.fixed === "true") {
      setYScrollBar(scrollBarWidth, this.footerTableRef, 'td');
    }
  }

  setScrollAreaHeight() {
    const tableContainerHeight = this.scrollAreaRef.current.parentElement.parentElement.clientHeight;
    let headerHeight = 0;
    let footerHeight = 0;

    const BaseThead = this.BaseThead;
    if (BaseThead && BaseThead.props.fixed === "true") {
      headerHeight = this.headerTableRef.current.offsetHeight;
    }

    const BaseTfoot = this.BaseTfoot;
    if (BaseTfoot && BaseTfoot.props.fixed === "true") {
      footerHeight = this.footerTableRef.current.offsetHeight;
    }

    this.scrollAreaRef.current.style.height = (tableContainerHeight - headerHeight - footerHeight) + 'px';
  }
  // 直接操作DOM，避免使用状态，造成整个table组件的更新，性能差
  resize() {
    this.setScrollAreaHeight();
    this.setHeaderFooterYScrollBar();
  }

  componentDidMount() {
    this.resize();

    if (this.props.event) {
      this.props.event.$on('scroll', this.$onScroll);
      this.props.event.$on('resize', this.$onResize);
    }
  }

  componentDidUpdate() {
    this.resize();
  }

  componentWillUnmount() {
    if (this.props.event) {
      this.props.event.$off('scroll', this.$onScroll);
      this.props.event.$off('resize', this.$onResize);
    }
  }

  render() {
    const scrollAreaRef = this.scrollAreaRef;
    const headerTableRef = this.headerTableRef;
    const baseTableRef = this.baseTableRef;
    const footerTableRef = this.footerTableRef;

    let BaseColgroup = null;
    let BaseThead = null;
    let BaseTbody = null;
    let BaseTfoot = null;

    const props = this.props;

    React.Children.forEach(props.children, function (child) {
      if (child.type === Colgroup) {
        BaseColgroup = child;
      } else if (child.type === Thead) {
        BaseThead = child;
      } else if (child.type === Tbody) {
        BaseTbody = child;
      } else if (child.type === Tfoot) {
        BaseTfoot = child;
      }
    });

    this.BaseColgroup = BaseColgroup;
    this.BaseThead = BaseThead;
    this.BaseTbody = BaseTbody;
    this.BaseTfoot = BaseTfoot;

    const tableProps = filterProps(props, tableCustomizeProps);
    const status = props.status || 'have-data';

    return (
      <React.Fragment>
        {
          BaseThead && BaseThead.props.fixed === "true" &&
          <div className="header">
            <table {...tableProps} ref={headerTableRef} >
              {BaseColgroup}
              {BaseThead}
            </table>
          </div>
        }
        <div style={{ position: 'relative' }}>
          <div ref={scrollAreaRef} onScroll={this.onScroll} className={[commonStyle['overflow-y-auto'], props.scrollBarClassName].join(' ')} style={{ height: '0px' }}>
            <table {...tableProps} ref={baseTableRef}>
              {BaseColgroup}
              {BaseThead && BaseThead.props.fixed !== "true" && BaseThead}
              {BaseTbody}
              {BaseTfoot && BaseTfoot.props.fixed !== "true" && BaseTfoot}
            </table>
          </div>
          {/* 组件外传入Loading、NoData、Fail其中一个时，才显示full-mask */}
          {
            (props.Loading || props.NoData || props.Fail) && 
            <div className={commonStyle['full-mask']} style={{ display: status !== 'have-data' ? 'block' : 'none' }}>
              {status === 'loading' && props.Loading}
              {status === 'no-data' && props.NoData}
              {status === 'fail' && props.Fail}
            </div>
          }
        </div>
        {
          BaseTfoot && BaseTfoot.props.fixed === "true" &&
          <div className="footer">
            <table {...tableProps} ref={footerTableRef}>
              {BaseColgroup}
              {BaseTfoot}
            </table>
          </div>
        }
      </React.Fragment>
    )
  }
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

export const Tr = function Tr(props) {
  return <tr {...props}>{props.children}</tr>
}

export const Th = function Th(props) {
  return <th {...props}>{props.children}</th>
}

export const Td = function Td(props) {
  return <td {...props}>{props.children}</td>
}

export const Loading = function Loading(props) {
  return <div {...props}>{props.children}</div>
}

export const NoData = function NoData(props) {
  return <div {...props}>{props.children}</div>
}

export const Fail = function Fail(props) {
  return <div {...props}>{props.children}</div>
}