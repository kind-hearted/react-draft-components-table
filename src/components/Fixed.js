import React, { useEffect, useRef } from 'react';
import style from './Fixed.module.css';
import setYScrollBar from '../utils/setYScrollBar.js';
import renderSideFragments from '../utils/renderSideFragments.js';
import computedPartOfTableWidth from '../utils/computedPartOfTableWidth.js';
import setLeftRightTrsHeight from '../utils/setLeftRightTrsHeight.js';
import filterProps from '../utils/filterProps.js';
import tableCustomizeProps from '../utils/tableCustomizeProps.js';
import renderTableContainer from '../utils/renderTableContainer.js';
/**
  * 固定表头、表尾、表列
  */

export const TableContainer = function (props) {
  return renderTableContainer(props, Table, Loading, NoData, Fail);
}

const setFixedSideWidth = function (ths, indexes, headerRef, bodyRef, footerRef) {
  const width = computedPartOfTableWidth(ths, indexes);

  if (headerRef && headerRef.current) {
    headerRef.current.parentElement.style.width = width + 'px';
  }

  if (bodyRef && bodyRef.current) {
    bodyRef.current.parentElement.style.width = width + 'px';
  }

  if (footerRef && footerRef.current) {
    footerRef.current.parentElement.style.width = width + 'px';
  }
};

const setPlaceholderYScrollBar = function (scrollRef, rightRef, yScrollBarWidth) {
  if (scrollRef.current) {
    const style = scrollRef.current.style;

    style.width = yScrollBarWidth + 'px';

    if (yScrollBarWidth === 0) {
      style.display = 'none';
    } else {
      style.display = 'block';
    }

    rightRef.current.parentElement.style.right = yScrollBarWidth + 'px';
  }
};

const setMarginBottom = function (element, xScrollBarHeight) {
  if (element) {
    element.style.marginBottom = -1 * xScrollBarHeight + 'px';
  }
};

const setPaddingBottom = function (element, xScrollBarHeight) {
  if (element) {
    element.style.paddingBottom = xScrollBarHeight + 'px';
  }
};

export const Table = class Table extends React.Component {
  constructor(props) {
    super(props);

    this.headerRightScrollBarRef = React.createRef();
    this.footerRightScrollBarRef = React.createRef();
    this.baseScrollContainerRef = React.createRef();

    this.leftHeaderRef = React.createRef();
    this.leftBodyRef = React.createRef();
    this.leftFooterRef = React.createRef();

    this.baseHeaderRef = React.createRef();
    this.baseTableRef = React.createRef();
    this.baseFooterRef = React.createRef();

    this.rightHeaderRef = React.createRef();
    this.rightBodyRef = React.createRef();
    this.rightFooterRef = React.createRef();

    this.scrollHeaderRef = React.createRef();
    this.scrollBodyRef = React.createRef();
    this.scrollFooterRef = React.createRef();
    this.scrollBottomRef = React.createRef();

    this.leftIndexes = [];
    this.rightIndexes = [];

    this.baseColgroup = null;
    this.baseThead = null;
    this.baseTbody = null;
    this.baseTfoot = null;

    this._preventScroll = false;
    this.$onScroll = ({ top, left }) => {
      if (!this._preventScroll) {
        const baseScrollContainer = this.baseScrollContainerRef.current;
        baseScrollContainer.scrollLeft = left;
        baseScrollContainer.scrollTop = top;
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

    this.scrollBottomBarIsAbsoluted = false;
    this.yScrollBarWidth = 0;

    let flag = false;
    const scrollX = (event, ref1, ref2, ref3, scrollBottomRef) => {
      if (!flag) {
        const scrollLeft = event.target.scrollLeft;

        if (ref1.current) {
          ref1.current.scrollLeft = scrollLeft;
        }
        if (ref2.current) {
          ref2.current.scrollLeft = scrollLeft;
        }
        if (ref3.current) {
          ref3.current.scrollLeft = scrollLeft;
        }

        if (this.scrollBottomBarIsAbsoluted && scrollBottomRef && scrollBottomRef.current) {
          scrollBottomRef.current.style.display = 'block';
        }
      }

      flag = false;
    };

    this.onScrollHeader = (event) => {
      scrollX(event, this.scrollBottomRef, this.scrollBodyRef, this.scrollFooterRef, this.scrollBottomRef);
    };

    this.onScrollBody = (event) => {
      scrollX(event, this.scrollHeaderRef, this.scrollBottomRef, this.scrollFooterRef, this.scrollBottomRef);
    };

    this.onScrollFooter = (event) => {
      scrollX(event, this.scrollHeaderRef, this.scrollBodyRef, this.scrollBottomRef, this.scrollBottomRef);
    };

    this.onScrollBottom = (event) => {
      scrollX(event, this.scrollHeaderRef, this.scrollBodyRef, this.scrollFooterRef);
    };
  }

  setBaseScrollContainerHeight() {
    const baseScrollContainer = this.baseScrollContainerRef.current;
    const tableContainerHeight = baseScrollContainer.parentElement.parentElement.clientHeight;
    let headerHeight = 0;
    let footerHeight = 0;

    const baseThead = this.baseThead;
    if (baseThead && baseThead.props.fixed === "true") {
      headerHeight = this.baseHeaderRef.current.offsetHeight;
    }

    const baseTfoot = this.baseTfoot;
    if (baseTfoot && baseTfoot.props.fixed === "true") {
      footerHeight = this.baseFooterRef.current.offsetHeight;
    }

    baseScrollContainer.style.height = (tableContainerHeight - headerHeight - footerHeight) + 'px';
  }
  // 计算固定列宽，相加设置容器元素宽度
  setFixedSideWidth() {
    const ths = this.baseHeaderRef.current.querySelector('thead tr').children;

    setFixedSideWidth(ths, this.leftIndexes, this.leftHeaderRef, this.leftBodyRef, this.leftFooterRef);
    setFixedSideWidth(ths, this.rightIndexes, this.rightHeaderRef, this.rightBodyRef, this.rightFooterRef);
  }

  setLeftRightTrsHeight() {
    setLeftRightTrsHeight(this.baseHeaderRef, this.leftHeaderRef, this.rightHeaderRef, 'thead>tr');
    setLeftRightTrsHeight(this.baseTableRef, this.leftBodyRef, this.rightBodyRef, 'tbody>tr');
    setLeftRightTrsHeight(this.baseTableRef, this.leftFooterRef, this.rightFooterRef, 'tfoot>tr');
  }

  setYScrollBar() {
    const scrollBodyWidth = this.scrollBodyRef.current.offsetWidth;
    const scrollBodyBoxWidth = this.scrollBodyRef.current.parentElement.parentElement.offsetWidth;
    const yScrollBarWidth = this.yScrollBarWidth = scrollBodyBoxWidth - scrollBodyWidth;
    const baseTableWidth = this.baseTableRef.current.offsetWidth;

    setPlaceholderYScrollBar(this.headerRightScrollBarRef, this.rightHeaderRef, yScrollBarWidth);
    setPlaceholderYScrollBar(this.footerRightScrollBarRef, this.rightFooterRef, yScrollBarWidth);
    // 设置头部的右侧滚动条
    const baseThead = this.baseThead;
    if (baseThead && baseThead.props.fixed === "true") {
      setYScrollBar(yScrollBarWidth, this.baseHeaderRef, 'th');
      // 固定表格的宽度等于基础表格的宽度加上滚动条宽度
      this.baseHeaderRef.current.style.width = (baseTableWidth + yScrollBarWidth) + 'px';
    }
    // 设置尾部的右侧滚动条
    const baseTfoot = this.baseTfoot;
    if (baseTfoot && baseTfoot.props.fixed === "true") {
      setYScrollBar(yScrollBarWidth, this.baseFooterRef, 'th');
      // 固定表格的宽度等于基础表格的宽度加上滚动条宽度
      this.baseFooterRef.current.style.width = (baseTableWidth + yScrollBarWidth) + 'px';
    }
  }

  setXScrollBar() {
    // 根据头部来判断是否需要横向滚动条，因为内容区可能没有内容
    const baseScrollContainer = this.baseScrollContainerRef.current;
    const baseTable = this.baseTableRef.current;
    const scrollHeader = this.scrollHeaderRef.current;
    const scrollBottom = this.scrollBottomRef.current;
    const scrollBody = this.scrollBodyRef.current;
    const scrollFooter = this.scrollFooterRef.current;
    
    const baseTableWidth = baseTable.offsetWidth;
    const diffWidth = baseTableWidth - baseTable.parentElement.offsetWidth;

    const xScrollBarHeight = scrollHeader.offsetHeight - scrollHeader.children[0].offsetHeight;
    let scrollBottomBarHeight = xScrollBarHeight;
    // 滚动区域高度与有无横向滚动条相关
    if (diffWidth > 0) {
      // 设置底部单独滚动条子元素的宽度
      scrollBottom.children[0].style.width = baseTableWidth + this.yScrollBarWidth + 'px';
      scrollBottom.style.display = 'block';
      // 底部单独滚动条的高度在Chrome浏览器是18px，大于17px的滚动条高度
      if (scrollBottom.offsetHeight > scrollBottomBarHeight) {
        scrollBottomBarHeight = scrollBottom.offsetHeight;
      }
    } else {
      scrollBottom.style.display = 'none';
    }
    // 设置滚动表体最小高度等于滚动容器高度，避免高度小于滚动高度时，产生空白区域，该空白区域手势滚动无效
    scrollBody.style.minHeight = baseScrollContainer.offsetHeight + 'px';
    // 设置横向滚动区域的margin bottom为负的滚动条高度，达到隐藏滚动条的目的
    setMarginBottom(scrollHeader, xScrollBarHeight);
    setMarginBottom(scrollBody, xScrollBarHeight);
    setMarginBottom(scrollFooter, xScrollBarHeight);
    // mac电脑上的浏览器，滚动条设置为滑动显示时，滚动条不占宽度，特别处理
    if (diffWidth > 0 && xScrollBarHeight === 0) {
      setMarginBottom(scrollHeader, 15);
      setPaddingBottom(scrollHeader, 15);

      setMarginBottom(scrollBody, 15);
      setPaddingBottom(scrollBody, 15);

      setMarginBottom(scrollFooter, 15);
      setPaddingBottom(scrollFooter, 15);

      if (!this.scrollBottomBarIsAbsoluted) {
        this.scrollBottomBarIsAbsoluted = true;
        scrollBottom.className = scrollBottom.className + ' ' + style['scroll-x-absoluted'];
      }
    }
  }

  resize() {
    this.setBaseScrollContainerHeight();
    this.setFixedSideWidth();
    this.setLeftRightTrsHeight();
    // TODO：某个方向原本没有滚动条，设置另外一个方向的滚动条以后可能出现，这里可能有互斥的关系
    this.setYScrollBar();
    this.setXScrollBar();
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
    const props = this.props;
    const tableProps = filterProps(props, tableCustomizeProps);
    const {
      leftIndexes, rightIndexes,
      leftCols, leftTheadTrs, leftTbodyTrs, leftTfootTrs,
      rightCols, rightTheadTrs, rightTbodyTrs, rightTfootTrs,
      baseColgroup, baseThead, baseTbody, baseTfoot,
    } = renderSideFragments(props, Colgroup, Thead, Tbody, Tfoot);

    this.leftIndexes = leftIndexes;
    this.rightIndexes = rightIndexes;

    this.baseColgroup = baseColgroup;
    this.baseThead = baseThead;
    this.baseTbody = baseTbody;
    this.baseTfoot = baseTfoot;

    const headerRightScrollBarRef = this.headerRightScrollBarRef;
    const footerRightScrollBarRef = this.footerRightScrollBarRef;
    const baseScrollContainerRef = this.baseScrollContainerRef;

    const leftHeaderRef = this.leftHeaderRef;
    const leftBodyRef = this.leftBodyRef;
    const leftFooterRef = this.leftFooterRef;

    const baseHeaderRef = this.baseHeaderRef;
    const baseTableRef = this.baseTableRef;
    const baseFooterRef = this.baseFooterRef;

    const rightHeaderRef = this.rightHeaderRef;
    const rightBodyRef = this.rightBodyRef;
    const rightFooterRef = this.rightFooterRef;

    const scrollHeaderRef = this.scrollHeaderRef;
    const scrollBodyRef = this.scrollBodyRef;
    const scrollFooterRef = this.scrollFooterRef;
    const scrollBottomRef = this.scrollBottomRef;

    const renderSideHeader = function (className, ref, cols, trs) {
      if (trs === null) {
        return null;
      }
  
      return (
        <div className={className + ' ' + style['fixed-header-z-index']} style={{ width: '0px' }}>
          <table {...tableProps} style={{ width: '100%' }} ref={ref}>
            <colgroup {...baseColgroup.props}>
              {cols}
            </colgroup>
            <thead {...baseThead.props}>
              {trs}
            </thead>
          </table>
        </div>
      );
    };
    
    const renderSideFooter = function (className, ref, cols, trs) {
      if (trs === null) {
        return null;
      }
  
      return (
        <div className={className + ' ' + style['fixed-footer-z-index']} style={{ width: '0px' }}>
          <table {...tableProps} style={{ width: '100%' }} ref={ref}>
            <colgroup {...baseColgroup.props}>
              {cols}
            </colgroup>
            <tfoot {...baseTfoot.props}>
              {trs}
            </tfoot>
          </table>
        </div>
      );
    };
  
    const renderFixedHeaderOrFooter = function (left, right, body, rightScrollBarRef, scrollRef, tableRef, onScroll) {
      return (
        <div className={style['hide-scroll-bar-wraper']}>
          {/* 固定左侧 */}
          {left}
          {/* 固定右侧 */}
          {right}
          {/* 定位一个y scroll bar */}
          <div className={'y-scroll-bar ' + style['right-scroll-bar']} ref={rightScrollBarRef}></div>
          {/* 可滚动的base表头。加上可能出现的滚动条 */}
          {/* 包裹一个overflow: hidden的div, 隐藏滚动条 */}
          <div style={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto', overflowY: 'hidden' }} onScroll={onScroll} ref={scrollRef}>
              <table {...tableProps} ref={tableRef}>
                {baseColgroup}
                {body}
              </table>
            </div>
          </div>
        </div>
      );
    };
  
    const leftSideHeader = renderSideHeader(style.left, leftHeaderRef, leftCols, leftTheadTrs);
    const rightSideHeader = renderSideHeader(style.right, rightHeaderRef, rightCols, rightTheadTrs);
    const leftSideFooter = renderSideFooter(style.left, leftFooterRef, leftCols, leftTfootTrs);
    const rightSideFooter = renderSideFooter(style.right, rightFooterRef, rightCols, rightTfootTrs);
  
    if (!baseThead || baseThead.props.fixed !== 'true') {
      throw new Error('必须存在Thead，且Thead的props.fixed = "true"');
    }
  
    return (
      <React.Fragment>
        {/* 表头必须固定，且一定存在表头 */}
        {
          baseThead && baseThead.props.fixed === 'true' && renderFixedHeaderOrFooter(
            leftSideHeader, 
            rightSideHeader, 
            baseThead,
            headerRightScrollBarRef, 
            scrollHeaderRef, 
            baseHeaderRef, 
            this.onScrollHeader,
          )
        }
        <div className={style['base-scroll-container']} ref={baseScrollContainerRef}>
          {/* base-scroll-outer的高需要设为base-scroll-container高度和滚动条高度之差 */}
          <div className={[style['base-scroll-outer'], props.scrollBarClassName].join(' ')} style={{ height: '100%' }}>
            {/* 左边固定第一列表体 */}
            <div className={style.left}>
              <table  {...tableProps} style={{ width: '100%' }} ref={leftBodyRef}>
                <colgroup {...baseColgroup.props}>
                  {leftCols}
                </colgroup>
                <tbody {...baseTbody.props}>
                  {leftTbodyTrs}
                </tbody>
                {
                  baseTfoot && baseTfoot.props.fixed !== 'true' &&
                  <tfoot {...baseTfoot.props}>
                    {leftTfootTrs}
                  </tfoot>
                }
              </table>
            </div>
            {/* 右边固定第一列表体 */}
            <div className={style.right}>
              <table {...tableProps} style={{ width: '100%' }} ref={rightBodyRef}>
                <colgroup {...baseColgroup.props}>
                  {rightCols}
                </colgroup>
                <tbody {...baseTbody.props}>
                  {rightTbodyTrs}
                </tbody>
                {
                  baseTfoot && baseTfoot.props.fixed !== 'true' &&
                  <tfoot {...baseTfoot.props}>
                    {rightTfootTrs}
                  </tfoot>
                }
              </table>
            </div>
            {/* 包裹一个overflow: hidden的div, 隐藏滚动条 */}
            <div style={{ overflow: 'hidden' }}>
              {/* base-scroll-inner需要设置一个margin-bottom为负的滚动条高度，以便可以隐藏这个滚动条 */}
              <div className={[style['base-scroll-inner'], props.scrollBarClassName].join(' ')} ref={scrollBodyRef} onScroll={this.onScrollBody}>
                <table {...tableProps} ref={baseTableRef}>
                  {baseColgroup}
                  {baseTbody}
                  {/* 表尾不固定 */}
                  {baseTfoot && baseTfoot.props.fixed !== 'true' && baseTfoot}
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* 表尾固定 */}
        {
          baseTfoot && baseTfoot.props.fixed === 'true' && renderFixedHeaderOrFooter(
            leftSideFooter, 
            rightSideFooter, 
            baseTfoot,
            footerRightScrollBarRef, 
            scrollFooterRef, 
            baseFooterRef, 
            this.onScrollFooter,
          )
        }
        {/* 一个固定在底部的单独滚动条，用来控制左右滚动 */}
        <div className={[style['scroll-x'], props.scrollBarClassName].join(' ')} style={{ display: 'none' }} onScroll={this.onScrollBottom} onMouseLeave={() => {
          // Mac上的浏览器滚动条定位情况下，鼠标离开先隐藏再显示，避免一直显示滚动条
          if (this.scrollBottomBarIsAbsoluted) {
            scrollBottomRef.current.style.display = 'none';
  
            setTimeout(function () {
              scrollBottomRef.current.style.display = 'block';
            }, 17);
          }
        }} ref={scrollBottomRef}>
          {/* 计算: 计算宽度, 加上滚动条的宽度 */}
          <div className={style['scroll-x-inner']}></div>
        </div>
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
