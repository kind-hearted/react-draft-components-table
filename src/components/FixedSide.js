import React, { useEffect, useRef } from 'react';
import style from './FixedSide.module.css';
import setYScrollBar from '../utils/setYScrollBar.js';
import renderLeftRightFragments from '../utils/renderLeftRightFragments.js';
import computedPartOfTableWidth from '../utils/computedPartOfTableWidth.js';
import setLeftRightTrsHeight from '../utils/setLeftRightTrsHeight.js';
import addClassName from '../utils/addClassName.js';
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

const setPaddingBottom = function (ref, xScrollBarHeight) {
  if (ref.current) {
    ref.current.style.paddingBottom = xScrollBarHeight + 'px';
  }
};

export const Table = function Table(props) {
  const scrollHeight = props.scrollHeight;
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

  const tableProps = {};

  for (let key in props) {
    if (key !== 'scrollHeight') {
      tableProps[key] = props[key];
    }
  }

  tableProps.className = [tableProps.className, 'table'].join(' ');

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
  let scrollBottomBarIsAbsoluted = false;
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
        // 把高度设回没有滚动条之前的值
        if (scrollHeight) {
          baseScrollContainerRef.current.style.height = scrollHeight;
        } else {
          baseScrollContainerRef.current.style.removeProperty('style');
        }
        
        baseScrollContainerRef.current.style.height = (baseScrollContainerRef.current.offsetHeight - scrollBottomBarHeight) + 'px';
      }

      prevScrollBottomBarHeight = scrollBottomBarHeight;
    } else {
      scrollBottomRef.current.style.display = 'none';
      // 把高度设回没有滚动条之前的值
      if (prevScrollBottomBarHeight > 0) {
        if (scrollHeight) {
          baseScrollContainerRef.current.style.height = scrollHeight;
        } else {
          baseScrollContainerRef.current.style.removeProperty('style');
        }
      }

      prevScrollBottomBarHeight = 0;
    }
    // 设置滚动表体最小高度等于滚动容器高度，避免高度小于滚动高度时，产生空白区域，该空白区域手势滚动无效
    scrollBodyRef.current.style.minHeight = baseScrollContainerRef.current.offsetHeight + 'px';
    // 设置横向滚动区域的margin bottom为负的滚动条高度，达到隐藏滚动条的目的
    setMarginBottom(scrollHeaderRef, xScrollBarHeight);
    setMarginBottom(scrollBodyRef, xScrollBarHeight);
    setMarginBottom(scrollFooterRef, xScrollBarHeight);
    // mac电脑上的浏览器，滚动条设置为滑动显示时，滚动条不占宽度，特别处理
    if (headerDiffWidth > 0 && xScrollBarHeight === 0) {
      setMarginBottom(scrollHeaderRef, 15);
      setMarginBottom(scrollBodyRef, 15);
      setMarginBottom(scrollFooterRef, 15);
      setPaddingBottom(scrollHeaderRef, 15);
      setPaddingBottom(scrollBodyRef, 15);
      setPaddingBottom(scrollFooterRef, 15);

      if (!scrollBottomBarIsAbsoluted) {
        scrollBottomBarIsAbsoluted = true;
        scrollBottomRef.current.className = scrollBottomRef.current.className + ' ' + style['scroll-x-absoluted'];
      }
    }
  };

  let timer = -1;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      resize();
    }, 30);
  });
  
  useEffect(resize);

  let flag = false;
  const scrollX = function (event, ref1, ref2, ref3, scrollBottomRef) {
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

      if (scrollBottomBarIsAbsoluted && scrollBottomRef && scrollBottomRef.current) {
        scrollBottomRef.current.style.display = 'block';
      }
    }

    flag = false;
  };

  const onScrollHeader = function (event) {
    scrollX(event, scrollBottomRef, scrollBodyRef, scrollFooterRef, scrollBottomRef);
  };

  const onScrollBody = function (event) {
    scrollX(event, scrollHeaderRef, scrollBottomRef, scrollFooterRef, scrollBottomRef);
  };

  const onScrollFooter = function (event) {
    scrollX(event, scrollHeaderRef, scrollBodyRef, scrollBottomRef, scrollBottomRef);
  };

  const onScrollBottom = function (event) {
    scrollX(event, scrollHeaderRef, scrollBodyRef, scrollFooterRef);
  };

  const renderSideHeader = function (className, ref, cols, trs) {
    if (trs === null) {
      return null;
    }

    return (
      <div className={className}>
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
      <div className={className}>
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
          <div style={{ overflow: 'auto' }} onScroll={onScroll} ref={scrollRef}>
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

  const baseScrollContainerStyle = {};

  if (scrollHeight) {
    baseScrollContainerStyle.height = scrollHeight;
  }

  let center = null;

  React.Children.forEach(props.children, function (child) {
    if (child.type === Center) {
      center = child;
    }
  });

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
      <div className={style['base-scroll-container']} style={baseScrollContainerStyle} ref={baseScrollContainerRef}>
        {center}
        {/* base-scroll-outer的高需要设为base-scroll-container高度和滚动条高度之差 */}
        <div className={style['base-scroll-outer']} style={{ height: '100%' }}>
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
            <div className={style['base-scroll-inner']} ref={scrollBodyRef} onScroll={onScrollBody}>
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
          onScrollFooter,
        )
      }
      {/* 一个固定在底部的单独滚动条，用来控制左右滚动 */}
      <div className={style['scroll-x']} style={{ display: 'none' }} onScroll={onScrollBottom} onMouseLeave={() => {
        // Mac上的浏览器滚动条定位情况下，鼠标离开先隐藏再显示，避免一直显示滚动条
        if (scrollBottomBarIsAbsoluted) {
          scrollBottomRef.current.style.display = 'none';

          setTimeout(function () {
            scrollBottomRef.current.style.display = 'block';
          }, 17);
        }
      }} ref={scrollBottomRef}>
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

export const Center = function Center(props) {
  const nprops = addClassName(props, style['center']);
  return <div {...nprops}>{props.children}</div>
}

