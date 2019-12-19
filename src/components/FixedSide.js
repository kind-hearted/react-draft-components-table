import React, { useEffect, useRef } from 'react';
import style from './FixedSide.module.css';
import setYScrollBar from '../utils/setYScrollBar.js';
import renderLeftRightFragments from '../utils/renderLeftRightFragments.js';
import computedPartOfTableWidth from '../utils/computedPartOfTableWidth.js';
import setLeftRightTrsHeight from '../utils/setLeftRightTrsHeight.js';
/**
  * 固定表头、表尾、表列
  */

export const Table = function Table(props) {
  const headerRightScrollBarRef = useRef();
  const baseScrollOuterRef = useRef();

  const leftHeaderRef = useRef();
  const leftTableRef = useRef();
  const leftFooterRef = useRef();

  const baseHeaderRef = useRef();
  const baseTableRef = useRef();
  const baseFooterRef = useRef();

  const rightHeaderRef = useRef();
  const rightTableRef = useRef();
  const rightFooterRef = useRef();

  const scrollHeaderRef = useRef();
  const scrollBodyRef = useRef();
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
  const resize = function () {
    // 计算固定列宽，相加设置容器元素宽度
    const ths = baseHeaderRef.current.querySelector('thead tr').children;
    const leftFixedWidth = computedPartOfTableWidth(ths, leftIndexes);
    leftHeaderRef.current.parentElement.style.width = leftFixedWidth + 'px';
    leftTableRef.current.parentElement.style.width = leftFixedWidth + 'px';

    const rightFixedWidth = computedPartOfTableWidth(ths, rightIndexes);
    rightHeaderRef.current.parentElement.style.width = rightFixedWidth + 'px';
    rightTableRef.current.parentElement.style.width = rightFixedWidth + 'px';

    setLeftRightTrsHeight(baseHeaderRef, leftHeaderRef, rightHeaderRef, 'thead>tr');
    setLeftRightTrsHeight(baseTableRef, leftTableRef, rightTableRef, 'tbody>tr');
    // setLeftRightTrsHeight(baseTableRef, leftFooterRef, rightFooterRef, 'tfoot>tr');

    const scrollBodyWidth = scrollBodyRef.current.offsetWidth;
    const scrollBodyBoxWidth = scrollBodyRef.current.parentElement.parentElement.offsetWidth;
    const scrollBarWidth = scrollBodyBoxWidth - scrollBodyWidth;
    const headerRightScrollBarStyle = headerRightScrollBarRef.current.style;

    headerRightScrollBarStyle.width = scrollBarWidth + 'px';

    if (scrollBarWidth === 0) {
      headerRightScrollBarStyle.display = 'none';
    } else {
      headerRightScrollBarStyle.display = 'block';
    }

    rightHeaderRef.current.parentElement.style.right = scrollBarWidth + 'px';
    // 设置头部的右侧滚动条
    if (baseThead && baseThead.props.fixed === "true") {
      setYScrollBar(scrollBarWidth, baseHeaderRef, 'th');
      // 固定表格的宽度等于基础表格的宽度加上滚动条宽度
      baseHeaderRef.current.style.width = (baseTableRef.current.offsetWidth + scrollBarWidth) + 'px';
    }
    // 设置尾部的右侧滚动条
    if (baseTfoot && baseTfoot.props.fixed === "true") {
      setYScrollBar(scrollBarWidth, baseFooterRef, 'th');
      // 固定表格的宽度等于基础表格的宽度加上滚动条宽度
      baseFooterRef.current.style.width = (baseTableRef.current.offsetWidth + scrollBarWidth) + 'px';
    }
    // 根据头部来判断是否需要横向滚动条，因为内容区可能没有内容
    const headerDiffWidth = baseTableRef.current.offsetWidth - baseTableRef.current.parentElement.offsetWidth;

    if (headerDiffWidth > 0) {
      // 设置底部单独滚动条子元素的宽度
      scrollBottomRef.current.children[0].style.width = baseTableRef.current.offsetWidth + 'px';
      scrollBottomRef.current.style.display = 'block';
      baseScrollOuterRef.current.style.height = (baseScrollOuterRef.current.parentElement.offsetHeight - scrollBarWidth) + 'px';
    } else {
      scrollBottomRef.current.style.display = 'none';
      baseScrollOuterRef.current.style.height = '100%';
    }
    // 设置横向滚动区域的margin bottom为负的滚动条高度，达到隐藏滚动条的目的
    // 注: 不使用scrollBarWidth，因为scroll body可能不出现滚动条
    const scrollXBarHeight = scrollHeaderRef.current.offsetHeight - scrollHeaderRef.current.children[0].offsetHeight;
    scrollHeaderRef.current.style.marginBottom = -1 * scrollXBarHeight + 'px';
    scrollBodyRef.current.style.marginBottom = -1 * scrollXBarHeight + 'px';

    if (baseTfoot && baseTfoot.props.fixed === "true") {
      // setYScrollBar(scrollBarWidth, baseHeaderRef, 'td');
    }
  };
  
  useEffect(resize);

  let flag = false;

  const onScrollHeader = function (event) {
    if (!flag) {
      const scrollLeft = event.target.scrollLeft;
      scrollBottomRef.current.scrollLeft = scrollLeft;
      scrollBodyRef.current.scrollLeft = scrollLeft;
    }

    flag = false;
  };

  const onScrollBody = function (event) {
    if (!flag) {
      const scrollLeft = event.target.scrollLeft;
      scrollHeaderRef.current.scrollLeft = scrollLeft;
      scrollBottomRef.current.scrollLeft = scrollLeft;
    }

    flag = false;
  };

  const onScrollBottom = function (event) {
    if (!flag) {
      const scrollLeft = event.target.scrollLeft;
      scrollHeaderRef.current.scrollLeft = scrollLeft;
      scrollBodyRef.current.scrollLeft = scrollLeft;
    }

    flag = false;
  };
  // TODO：先实现固定表头+固定列，配置的固定表头、表尾后续再做
  return (
    <div className="table-box" style={{ position: 'relative' }}>
      {/* 固定表头部分 */}
      <div className={style['hide-scroll-bar-wraper']}>
        {/* 左边固定第一列表头 */}
        <div className={style.left}>
          <table className="table" style={{ width: '100%' }} ref={leftHeaderRef}>
            <colgroup className="colgroup">
              {leftCols}
            </colgroup>
            <thead className="thead">
              {leftTheadTrs}
            </thead>
          </table>
        </div>
        {/* 右边固定第一列表头。加上可能出现的右侧滚动条 */}
        <div className={style.right}>
          <table className="table" style={{ width: '100%' }} ref={rightHeaderRef}>
            <colgroup className="colgroup">
              {rightCols}
            </colgroup>
            <thead className="thead">
              {rightTheadTrs}
            </thead>
          </table>
        </div>
        {/* 定位一个scroll bar */}
        <div className={'y-scroll-bar ' + style['right-scroll-bar']} ref={headerRightScrollBarRef}></div>
        {/* 可滚动的base表头。加上可能出现的滚动条 */}
        {/* 包裹一个overflow: hidden的div, 隐藏滚动条 */}
        <div style={{ overflow: 'hidden' }}>
          <div style={{ overflow: 'auto' }} onScroll={onScrollHeader} ref={scrollHeaderRef}>
            <table className="table" ref={baseHeaderRef} style={{ minWidth: '1200px' }}>
              {baseColgroup}
              {baseThead}
            </table>
          </div>
        </div>
      </div>
      <div className={style['base-scroll-container']} style={{ height: '200px' }}>
        {/* base-scroll-outer的高需要设为base-scroll-container高度和滚动条高度之差 */}
        <div className={style['base-scroll-outer']} ref={baseScrollOuterRef} style={{ height: '100%' }}>
          {/* 左边固定第一列表体 */}
          <div className={style.left}>
            <table className="table" style={{ width: '100%' }} ref={leftTableRef}>
              <colgroup className="colgroup">
                {leftCols}
              </colgroup>
              <tbody className="tbody">
                {leftTbodyTrs}
              </tbody>
              <tfoot className="tfoot">
                {leftTfootTrs}
              </tfoot>
            </table>
          </div>
          {/* 右边固定第一列表体。加上可能出现的滚动条 */}
          <div className={style.right}>
            <table className="table" style={{ width: '100%' }} ref={rightTableRef}>
              <colgroup className="colgroup">
                {rightCols}
              </colgroup>
              <tbody className="tbody">
                {rightTbodyTrs}
              </tbody>
              <tfoot className="tfoot">
                {rightTfootTrs}
              </tfoot>
            </table>
          </div>
          {/* 包裹一个overflow: hidden的div, 隐藏滚动条 */}
          <div style={{ overflow: 'hidden' }}>
            {/* base-scroll-inner需要设置一个margin-bottom为负的滚动条高度，以便可以隐藏这个滚动条 */}
            <div className={style['base-scroll-inner']} ref={scrollBodyRef} onScroll={onScrollBody}>
              <table className="table" style={{ minWidth: '1200px' }} ref={baseTableRef}>
                {baseColgroup}
                {baseTbody}
                {baseTfoot}
              </table>
            </div>
          </div>
        </div>
        {/* 一个固定在底部的单独滚动条，用来控制左右滚动。Mac上的浏览器可能没有滚动条高度，需要单独设置。 */}
        <div className={style['scroll-x']} onScroll={onScrollBottom} ref={scrollBottomRef}>
          {/* 计算: 计算宽度, 加上滚动条的宽度 */}
          <div className={style['scroll-x-inner']}></div>
        </div>
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
