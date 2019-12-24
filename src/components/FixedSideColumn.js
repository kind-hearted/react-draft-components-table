import React, { useEffect, useRef } from 'react';
import style from './FixedSideColumn.module.css';
import addClassName from '../utils/addClassName.js';
import renderLeftRightFragments from '../utils/renderLeftRightFragments.js';
import computedPartOfTableWidth from '../utils/computedPartOfTableWidth.js';
import setLeftRightTrsHeight from '../utils/setLeftRightTrsHeight.js';
/**
  * 固定两侧表列（一列或连续的多列）
  * 1、固定一侧的列需要单独的列表, 每行的高度需要和实际的表相同
  * 2、当实际的表高度发生变化时, 需要重新设置固定列的表行高, 以对齐
  * 
  * 分析
  * 1、固定的列是一个新的表
  * 2、表头的宽度需要和实际的表相同
  * 3、每行的高度需要和实际的表相同
  * 4、当实际的表高度发生变化时, 需要重新设置固定表的行高、表头宽度, 以对齐
  * 5、固定的列原表格有边框, 如何分割边框?
  * 
  * 
  * 实现
  * 1、设置固定列所属新表格的宽(需要考虑合并表头的列)
  * 2、设置固定列所属新表格各行的高(需要考虑合并行的情况), 如果行高固定, 可以不计算行高设置
  */
/**
  * 设计思路
  * 1、尽量维持原生表格的使用方式, 仅以某个参数代表是否需要表头固定
  * 
  * 优化策略
  * 1、尽量不生成多余的元素
  * 2、减少计算行高的耗时
  */
// TODO：公开一个方式，可以让外部告知组件调用setLeftRightTrsHeight去更新固定列的行高

export const Table = function Table(props) {
  const leftTableRef = useRef();
  const baseTableRef = useRef();
  const rightTableRef = useRef();

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

  const setFixedTableSize = function () {
    // TODO：放在useEffect执行，频率会非常高，需要优化
    // 计算固定列宽，相加设置容器元素宽度
    const ths = baseTableRef.current.querySelector('thead tr').children;
    const leftTableWidth = computedPartOfTableWidth(ths, leftIndexes);
    leftTableRef.current.parentElement.style.width = leftTableWidth + 'px';

    const rightTableWidth = computedPartOfTableWidth(ths, rightIndexes);
    rightTableRef.current.parentElement.style.width = rightTableWidth + 'px';
    // 计算行高，设置各行高度, 表格内部可能会嵌套表格, 所以选择器需要唯一
    setLeftRightTrsHeight(baseTableRef, leftTableRef, rightTableRef, 'thead>tr');
    setLeftRightTrsHeight(baseTableRef, leftTableRef, rightTableRef, 'tbody>tr');
    setLeftRightTrsHeight(baseTableRef, leftTableRef, rightTableRef, 'tfoot>tr');
  };
  // 计算设置固定表格的列宽、行高，需要直接操作DOM
  useEffect(setFixedTableSize);

  const tableProps = addClassName(props, 'table');

  return (
    <div className={'table-box ' + style.table}>
      <div className={style.left}>
        <table {...tableProps} style={{ width: '100%' }} ref={leftTableRef}>
          <colgroup {...baseColgroup.props}>
            {leftCols}
          </colgroup>
          <thead {...baseThead.props}>
            {leftTheadTrs}
          </thead>
          <tbody {...baseTbody.props}>
            {leftTbodyTrs}
          </tbody>
          {
            leftTfootTrs &&
            <tfoot {...baseTfoot.props}>
              {leftTfootTrs}
            </tfoot>
          }
        </table>
      </div>
      <div className={style.right}>
        <table {...tableProps} style={{ width: '100%' }} ref={rightTableRef}>
          <colgroup {...baseColgroup.props}>
            {rightCols}
          </colgroup>
          <thead {...baseThead.props}>
            {rightTheadTrs}
          </thead>
          <tbody {...baseTbody.props}>
            {rightTbodyTrs}
          </tbody>
          {
            rightTfootTrs &&
            <tfoot {...baseTfoot.props}>
              {rightTfootTrs}
            </tfoot>
          }
        </table>
      </div>
      <div style={{ overflow: 'auto', width: '100%' }} className={props.scrollClassName}>
        <table ref={baseTableRef} {...tableProps}>
          {baseColgroup}
          {baseThead}
          {baseTbody}
          {baseTfoot}
        </table>
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
  return <div></div>
}

export const NoData = function NoData(props) {
  return <div></div>
}