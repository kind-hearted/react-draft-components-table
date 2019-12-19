import React, { useEffect, useRef } from 'react';
import style from './FixedSide.module.css';
import setYScrollBar from '../utils/setYScrollBar.js';
import renderLeftRightFragments from '../utils/renderLeftRightFragments.js';
import computedPartOfTableWidth from '../utils/computedPartOfTableWidth.js';
import setLeftRightTrsHeight from '../utils/setLeftRightTrsHeight.js';
/**
  * 固定表头、表尾、表列
  */

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

const setMarginBottom = function (ref, xScrollBarHeight) {
  if (ref.current) {
    ref.current.style.marginBottom = -1 * xScrollBarHeight + 'px';
  }
};

const renderSideHeader = function (className, ref, cols, trs) {
  return (
    <div className={className}>
      <table className="table" style={{ width: '100%' }} ref={ref}>
        <colgroup className="colgroup">
          {cols}
        </colgroup>
        <thead className="thead">
          {trs}
        </thead>
      </table>
    </div>
  );
};

const renderSideFooter = function (className, ref, cols, trs) {
  return (
    <div className={className}>
      <table className="table" style={{ width: '100%' }} ref={ref}>
        <colgroup className="colgroup">
          {cols}
        </colgroup>
        <tfoot className="tfoot">
          {trs}
        </tfoot>
      </table>
    </div>
  );
};

export const Table = function Table(props) {
  const headerRightScrollBarRef = useRef();
  const footerRightScrollBarRef = useRef();
  const baseScrollContainerRef = useRef();

  const leftHeaderRef = useRef();
  const leftBodyRef = useRef();
  const leftFooterRef = useRef();

  const baseHeaderRef = useRef();
  const baseTableRef = useRef();
  const baseFooterRef = useRef();

  const rightHeaderRef = useRef();
  const rightBodyRef = useRef();
  const rightFooterRef = useRef();

  const scrollHeaderRef = useRef();
  const scrollBodyRef = useRef();
  const scrollFooterRef = useRef();
  const scrollBottomRef = useRef();

  const {
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
  } = renderLeftRightFragments(props, Colgroup, Thead, Tbody, Tfoot);
  // 计算设置固定表格的列宽、行高，需要直接操作DOM，避免尺寸变化的属性引起react的更新，影响性能
  let prevScrollBottomBarHeight = 0;
  const resize = function () {
    // 计算固定列宽，相加设置容器元素宽度
    const ths = baseHeaderRef.current.querySelector('thead tr').children;

    setFixedSideWidth(ths, leftIndexes, leftHeaderRef, leftBodyRef, leftFooterRef);
    setFixedSideWidth(ths, rightIndexes, rightHeaderRef, rightBodyRef, rightFooterRef);

    setLeftRightTrsHeight(baseHeaderRef, leftHeaderRef, rightHeaderRef, 'thead>tr');
    setLeftRightTrsHeight(baseTableRef, leftBodyRef, rightBodyRef, 'tbody>tr');
    setLeftRightTrsHeight(baseTableRef, leftFooterRef, rightFooterRef, 'tfoot>tr');

    const scrollBodyWidth = scrollBodyRef.current.offsetWidth;
    const scrollBodyBoxWidth = scrollBodyRef.current.parentElement.parentElement.offsetWidth;
    const yScrollBarWidth = scrollBodyBoxWidth - scrollBodyWidth;

    setPlaceholderYScrollBar(headerRightScrollBarRef, rightHeaderRef, yScrollBarWidth);
    setPlaceholderYScrollBar(footerRightScrollBarRef, rightFooterRef, yScrollBarWidth);
    // 设置头部的右侧滚动条
    if (baseThead && baseThead.props.fixed === "true") {
      setYScrollBar(yScrollBarWidth, baseHeaderRef, 'th');
      // 固定表格的宽度等于基础表格的宽度加上滚动条宽度
      baseHeaderRef.current.style.width = (baseTableRef.current.offsetWidth + yScrollBarWidth) + 'px';
    }
    // 设置尾部的右侧滚动条
    if (baseTfoot && baseTfoot.props.fixed === "true") {
      setYScrollBar(yScrollBarWidth, baseFooterRef, 'th');
      // 固定表格的宽度等于基础表格的宽度加上滚动条宽度
      baseFooterRef.current.style.width = (baseTableRef.current.offsetWidth + yScrollBarWidth) + 'px';
    }
    // 根据头部来判断是否需要横向滚动条，因为内容区可能没有内容
    const headerDiffWidth = baseTableRef.current.offsetWidth - baseTableRef.current.parentElement.offsetWidth;
    const xScrollBarHeight = scrollHeaderRef.current.offsetHeight - scrollHeaderRef.current.children[0].offsetHeight;
    let scrollBottomBarHeight = xScrollBarHeight;
    // 滚动区域高度与有无横向滚动条相关
    if (headerDiffWidth > 0) {
      // 设置底部单独滚动条子元素的宽度
      scrollBottomRef.current.children[0].style.width = baseTableRef.current.offsetWidth + 'px';
      scrollBottomRef.current.style.display = 'block';
      // 底部单独滚动条的高度在Chrome浏览器是18px，大于17px的滚动条高度
      if (scrollBottomRef.current.offsetHeight > scrollBottomBarHeight) {
        scrollBottomBarHeight = scrollBottomRef.current.offsetHeight;
      }

      if (prevScrollBottomBarHeight === 0) {
        baseScrollContainerRef.current.style.height = (baseScrollContainerRef.current.offsetHeight - scrollBottomBarHeight) + 'px';
      }

      prevScrollBottomBarHeight = scrollBottomBarHeight;
    } else {
      scrollBottomRef.current.style.display = 'none';

      if (prevScrollBottomBarHeight > 0) {
        baseScrollContainerRef.current.style.height = (baseScrollContainerRef.current.offsetHeight - prevScrollBottomBarHeight) + 'px';
      }

      prevScrollBottomBarHeight = 0;
    }
    // 设置横向滚动区域的margin bottom为负的滚动条高度，达到隐藏滚动条的目的
    setMarginBottom(scrollHeaderRef, xScrollBarHeight);
    setMarginBottom(scrollBodyRef, xScrollBarHeight);
    setMarginBottom(scrollFooterRef, xScrollBarHeight);
  };
  // 一次resize，浏览器可能由有滚动条变为无滚动条，表格变宽，延时再resize一次
  const twiceResize = function () {
    resize();
    setTimeout(function () {
      resize();
    }, 17);
  };

  let timer = -1;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      twiceResize();
    }, 30);
  });
  
  useEffect(twiceResize);

  let flag = false;
  const scrollX = function (event, ref1, ref2, ref3) {
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
    }

    flag = false;
  };

  const onScrollHeader = function (event) {
    scrollX(event, scrollBottomRef, scrollBodyRef, scrollFooterRef);
  };

  const onScrollBody = function (event) {
    scrollX(event, scrollHeaderRef, scrollBottomRef, scrollFooterRef);
  };

  const onScrollFooter = function (event) {
    scrollX(event, scrollHeaderRef, scrollBodyRef, scrollBottomRef);
  };

  const onScrollBottom = function (event) {
    scrollX(event, scrollHeaderRef, scrollBodyRef, scrollFooterRef);
  };
  // TODO：先实现固定表头+固定列，配置的固定表头、表尾后续再做
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
          <div style={{ overflow: 'auto' }} onScroll={onScroll} ref={scrollRef}>
            <table className="table" ref={tableRef} style={{ minWidth: '1200px' }}>
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
    <div className="table-box" style={{ position: 'relative' }}>
      {/* 表头必须固定，且一定存在表头 */}
      {
        baseThead && baseThead.props.fixed === 'true' && renderFixedHeaderOrFooter(
          leftSideHeader, 
          rightSideHeader, 
          baseThead,
          headerRightScrollBarRef, 
          scrollHeaderRef, 
          baseHeaderRef, 
          onScrollHeader,
        )
      }
      <div className={style['base-scroll-container']} style={{ height: '200px' }} ref={baseScrollContainerRef}>
        {/* base-scroll-outer的高需要设为base-scroll-container高度和滚动条高度之差 */}
        <div className={style['base-scroll-outer']} style={{ height: '100%' }}>
          {/* 左边固定第一列表体 */}
          <div className={style.left}>
            <table className="table" style={{ width: '100%' }} ref={leftBodyRef}>
              <colgroup className="colgroup">
                {leftCols}
              </colgroup>
              <tbody className="tbody">
                {leftTbodyTrs}
              </tbody>
              {
                baseTfoot && baseTfoot.props.fixed !== 'true' &&
                <tfoot className="tfoot">
                  {leftTfootTrs}
                </tfoot>
              }
            </table>
          </div>
          {/* 右边固定第一列表体 */}
          <div className={style.right}>
            <table className="table" style={{ width: '100%' }} ref={rightBodyRef}>
              <colgroup className="colgroup">
                {rightCols}
              </colgroup>
              <tbody className="tbody">
                {rightTbodyTrs}
              </tbody>
              {
                baseTfoot && baseTfoot.props.fixed !== 'true' &&
                <tfoot className="tfoot">
                  {rightTfootTrs}
                </tfoot>
              }
            </table>
          </div>
          {/* 包裹一个overflow: hidden的div, 隐藏滚动条 */}
          <div style={{ overflow: 'hidden' }}>
            {/* base-scroll-inner需要设置一个margin-bottom为负的滚动条高度，以便可以隐藏这个滚动条 */}
            <div className={style['base-scroll-inner']} ref={scrollBodyRef} onScroll={onScrollBody}>
              <table className="table" style={{ minWidth: '1200px' }} ref={baseTableRef}>
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
          onScrollFooter,
        )
      }
      {/* 一个固定在底部的单独滚动条，用来控制左右滚动。Mac上的浏览器可能没有滚动条高度，需要单独设置。 */}
      <div className={style['scroll-x']} onScroll={onScrollBottom} ref={scrollBottomRef}>
        {/* 计算: 计算宽度, 加上滚动条的宽度 */}
        <div className={style['scroll-x-inner']}></div>
      </div>
    </div>
  )
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
