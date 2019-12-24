import React, { useRef, useState } from 'react';
import {
  TableContainer,
  Loading,
  NoData,
  Fail,
  Table,
  Colgroup,
  Col,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from './components/FixedHeaderFooter.js';

export default function (props) {
  const popupRef = useRef();
  const [data1, setData1] = useState([]);
  const [status1, setStatus1] = useState('no-data');

  return (
    <div>
      <p>说明：可选的固定表头、表尾，只可能出现纵向滚动条，不会出现横向滚动条。</p>
      <p>注意：代码实现时使用了offsetHeight（整数）计算固定表头、表尾的高度，在Edge、IE浏览器下，避免表头、表尾高度出现小数，出现小数后，底部边框会被挡住。</p>
      <p>固定表头+表尾(内容溢出有滚动)</p>
      <button type="button" onClick={() => {
        setStatus1('loading');
        setTimeout(function () {
          setStatus1('no-data');
          setData1([]);
        }, 2000);
      }}>动态加载无数据</button>
      <button type="button" onClick={() => {
        setStatus1('loading');
        setTimeout(function () {
          const data = [];
          let i = 0;

          while (i < 30) {
            data[i] = 0;
            i++;
          }

          setStatus1('have-data');
          setData1(data);
        }, 2000);
      }}>动态加载有数据</button>
      <button type="button" onClick={() => {
        setStatus1('loading');
        setTimeout(function () {
          setStatus1('fail');
        }, 2000);
      }}>动态加载失败</button>
      <TableContainer style={{ height: '350px' }} scrollBarClassName="small-scroll-bar" status={status1}>
        <Table className="table">
          <Colgroup className="colgroup">
            <Col width="200" className="col1"/>
            <Col width="200" className="col2"/>
            <Col width="200" className="col3"/>
            <Col className="col4"/>
          </Colgroup>
          <Thead className="thead" fixed="true">
            <Tr>
              <Th rowSpan="2" style={{ position: 'relative' }}>
                <span>多行合并表头</span>
                <button type="button" onClick={() => {
                  const style = popupRef.current.style;

                  if (style.display === 'block') {
                    style.display = 'none';
                  } else {
                    style.display = 'block';
                  }
                }}>弹窗</button>
                <div className="popup" ref={popupRef}></div>
              </Th>
              <Th colSpan="2">年龄</Th>
              <Th rowSpan="2">备注信息</Th>
            </Tr>
            <Tr>
              <Th>年龄</Th>
              <Th>地址</Th>
            </Tr>
          </Thead>
          <Tbody className="tbody">
            {
              data1.map(function (item, index) {
                return (
                  <tr key={index}>
                    <td>姓名{index}</td>
                    <td>年龄{index}</td>
                    <td>地址{index}</td>
                    <td>备注信息{index}</td>
                  </tr>
                )
              })
            }
          </Tbody>
          <Tfoot className="tfoot" fixed="true">
            <Tr>
              <Td>汇总</Td>
              <Td>10</Td>
              <Td>20</Td>
              <Td>30</Td>
            </Tr>
          </Tfoot>
        </Table>
        <Loading className="loading"><span>加载中...</span></Loading>
        <NoData className="no-data">无数据</NoData>
        <Fail className="fail"><span>加载失败...</span></Fail>
      </TableContainer>
      <p>固定表头+表尾(内容少无滚动)</p>
      <TableContainer style={{ height: '350px' }}>
        <Table className="table">
          <Colgroup className="colgroup">
            <Col width="200" className="col1"/>
            <Col width="200" className="col2"/>
            <Col width="200" className="col3"/>
            <Col className="col4"/>
          </Colgroup>
          <Thead className="thead" fixed="true">
            <Tr>
              <Th rowSpan="2">多行合并表头</Th>
              <Th colSpan="2">年龄</Th>
              <Th rowSpan="2">备注信息</Th>
            </Tr>
            <Tr>
              <Th>年龄</Th>
              <Th>地址</Th>
            </Tr>
          </Thead>
          <Tbody className="tbody">
            <Tr className="tr">
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
          </Tbody>
          <Tfoot className="tfoot" fixed="true">
            <Tr>
              <Td>汇总</Td>
              <Td>10</Td>
              <Td>20</Td>
              <Td>30</Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <p>固定表头</p>
      <TableContainer style={{ height: '350px' }}>
        <Table className="table">
          <Colgroup className="colgroup">
            <Col width="200" className="col1"/>
            <Col width="200" className="col2"/>
            <Col width="200" className="col3"/>
            <Col className="col4"/>
          </Colgroup>
          <Thead className="thead" fixed="true">
            <Tr>
              <Th rowSpan="2">多行合并表头</Th>
              <Th colSpan="2">年龄</Th>
              <Th rowSpan="2">备注信息</Th>
            </Tr>
            <Tr>
              <Th>年龄</Th>
              <Th>地址</Th>
            </Tr>
          </Thead>
          <Tbody className="tbody">
            <Tr className="tr">
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
          </Tbody>
          <Tfoot className="tfoot">
            <Tr>
              <Td>汇总</Td>
              <Td>10</Td>
              <Td>20</Td>
              <Td>30</Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <p>固定表尾</p>
      <TableContainer style={{ height: '350px' }}>
        <Table className="table">
          <Colgroup className="colgroup">
            <Col width="200" className="col1"/>
            <Col width="200" className="col2"/>
            <Col width="200" className="col3"/>
            <Col className="col4"/>
          </Colgroup>
          <Thead className="thead">
            <Tr>
              <Th rowSpan="2">多行合并表头</Th>
              <Th colSpan="2">年龄</Th>
              <Th rowSpan="2">备注信息</Th>
            </Tr>
            <Tr>
              <Th>年龄</Th>
              <Th>地址</Th>
            </Tr>
          </Thead>
          <Tbody className="tbody">
            <Tr className="tr">
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
            <Tr>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
              <Td>表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。</Td>
            </Tr>
          </Tbody>
          <Tfoot className="tfoot" fixed="true">
            <Tr>
              <Td>汇总</Td>
              <Td>10</Td>
              <Td>20</Td>
              <Td>30</Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  )
}