import React, { useState } from 'react';
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
} from './components/Fixed.js';
import style from './FixedExample.module.css';

export default function (props) {
  const [hoverIndex, setHoverIndex] = useState('');
  const [popupDisplay, setPopupDisplay] = useState(false);
  const [data1, setData1] = useState([]);
  const [status1, setStatus1] = useState('no-data');
  const [checkboxes1, _setCheckboxes1] = useState({});
  const [allChecked1, _setAllChecked1] = useState(false);
  const [count, setCount] = useState(0);
  const setCheckboxes1Item = function (key, value) {
    checkboxes1[key] = value;
    let allChecked = true;

    for (let key in checkboxes1) {
      if (!checkboxes1[key]) {
        allChecked = false;
        break;
      }
    }

    _setAllChecked1(allChecked);
    _setCheckboxes1(checkboxes1);
    setCount(count + 1);
  };
  const setAllChecked1 = function (value) {
    for (let key in checkboxes1) {
      checkboxes1[key] = value;
    }

    _setAllChecked1(value);
    _setCheckboxes1(checkboxes1);
  };
  const update1 = function (data) {
    const checkboxes = {};

    data.forEach(function (item, index) {
      checkboxes[index] = false;
    });

    _setCheckboxes1(checkboxes);
    setData1(data);
    _setAllChecked1(false);
  };

  return (
    <div>
      <p>固定表头、表尾、第一列：水平 + 竖直方向均出现滚动条</p>
      <div style={{ position: 'relative', zIndex: 100 }}>
      <TableContainer style={{ width: '800px', height: '350px' }} scrollBarClassName="small-scroll-bar1">
        <Table style={{minWidth: '1400px'}}>
          <Colgroup>
            <Col width="300" fixed="true" />
            <Col  />
            <Col width="300" />
          </Colgroup>
          <Thead fixed="true">
            <Tr>
              <Th style={{ position: 'relative' }}>
                <span>姓名</span>
                <button type="button" onClick={() => {
                  setPopupDisplay(!popupDisplay);
                }}>弹窗</button>
                <div className={style.popup} style={{ display: popupDisplay ? 'block' : 'none', top: '100%' }}>
                  <span>弹出窗</span>
                </div>
              </Th>
              <Th>年龄</Th>
              <Th>备注</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>姓名1</Td>
              <Td>年龄1</Td>
              <Td>备注1</Td>
            </Tr>
            <Tr>
              <Td>姓名2</Td>
              <Td>年龄2</Td>
              <Td>备注2</Td>
            </Tr>
            <Tr>
              <Td>姓名3</Td>
              <Td>年龄3</Td>
              <Td>备注3</Td>
            </Tr>
            <Tr>
              <Td>姓名4</Td>
              <Td>年龄4</Td>
              <Td>备注4</Td>
            </Tr>
            <Tr>
              <Td>姓名5</Td>
              <Td>年龄5</Td>
              <Td>备注5</Td>
            </Tr>
            <Tr>
              <Td>姓名6</Td>
              <Td>年龄6</Td>
              <Td>备注6</Td>
            </Tr>
            <Tr>
              <Td>姓名7</Td>
              <Td>年龄7</Td>
              <Td>备注7</Td>
            </Tr>
            <Tr>
              <Td>姓名8</Td>
              <Td>年龄8</Td>
              <Td>备注8</Td>
            </Tr>
            <Tr>
              <Td>姓名9</Td>
              <Td>年龄9</Td>
              <Td>备注9</Td>
            </Tr>
            <Tr>
              <Td>姓名10</Td>
              <Td>年龄10</Td>
              <Td>备注10</Td>
            </Tr>
            <Tr>
              <Td>姓名11</Td>
              <Td>年龄11</Td>
              <Td>备注11</Td>
            </Tr>
            <Tr>
              <Td>姓名12</Td>
              <Td>年龄12</Td>
              <Td>备注12</Td>
            </Tr>
            <Tr>
              <Td>姓名13</Td>
              <Td>年龄13</Td>
              <Td>备注13</Td>
            </Tr>
            <Tr>
              <Td>姓名14</Td>
              <Td>年龄14</Td>
              <Td>备注14</Td>
            </Tr>
            <Tr>
              <Td>姓名15</Td>
              <Td>年龄15</Td>
              <Td>备注15</Td>
            </Tr>
            <Tr>
              <Td>姓名16</Td>
              <Td>年龄16</Td>
              <Td>备注16</Td>
            </Tr>
          </Tbody>
          <Tfoot fixed="true">
            <Tr>
              <Td>姓名</Td>
              <Td>年龄</Td>
              <Td>备注</Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      </div>
      <p>固定表头、第一列：水平 + 竖直方向均无滚动条</p>
      <TableContainer style={{ width: '800px', height: '350px' }}>
        <Table style={{minWidth: '1400px'}}>
          <Colgroup>
            <Col width="300" fixed="true" />
            <Col  />
            <Col width="300" />
          </Colgroup>
          <Thead fixed="true">
            <Tr>
              <Th rowSpan="2">姓名</Th>
              <Th>年龄</Th>
              <Th>备注</Th>
            </Tr>
            <Tr>
              <Th>年龄</Th>
              <Th>备注</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>姓名1</Td>
              <Td>年龄1</Td>
              <Td>备注1</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Td>姓名</Td>
              <Td>年龄</Td>
              <Td>备注</Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <p>固定第一列：水平 + 竖直方向均出现滚动条</p>
      <TableContainer style={{ width: '800px', height: '350px' }}>
        <Table style={{minWidth: '1400px'}}>
          <Colgroup>
            <Col width="300" fixed="true" />
            <Col  />
            <Col width="300" />
          </Colgroup>
          <Thead fixed="true">
            <Tr>
              <Th rowSpan="2">姓名</Th>
              <Th>年龄</Th>
              <Th>备注</Th>
            </Tr>
            <Tr>
              <Th>年龄</Th>
              <Th>备注</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td rowSpan="2">姓名1 + 2</Td>
              <Td>年龄1</Td>
              <Td>备注1</Td>
            </Tr>
            <Tr>
              <Td>年龄2</Td>
              <Td>备注2</Td>
            </Tr>
            <Tr>
              <Td>姓名3</Td>
              <Td>年龄3</Td>
              <Td>备注3</Td>
            </Tr>
            <Tr>
              <Td>姓名4</Td>
              <Td>年龄4</Td>
              <Td>备注4</Td>
            </Tr>
            <Tr>
              <Td>姓名5</Td>
              <Td>年龄5</Td>
              <Td>备注5</Td>
            </Tr>
            <Tr>
              <Td>姓名6</Td>
              <Td>年龄6</Td>
              <Td>备注6</Td>
            </Tr>
            <Tr>
              <Td>姓名7</Td>
              <Td>年龄7</Td>
              <Td>备注7</Td>
            </Tr>
            <Tr>
              <Td>姓名8</Td>
              <Td>年龄8</Td>
              <Td>备注8</Td>
            </Tr>
            <Tr>
              <Td>姓名9</Td>
              <Td>年龄9</Td>
              <Td>备注9</Td>
            </Tr>
            <Tr>
              <Td>姓名10</Td>
              <Td>年龄10</Td>
              <Td>备注10</Td>
            </Tr>
            <Tr>
              <Td>姓名11</Td>
              <Td>年龄11</Td>
              <Td>备注11</Td>
            </Tr>
            <Tr>
              <Td>姓名12</Td>
              <Td>年龄12</Td>
              <Td>备注12</Td>
            </Tr>
            <Tr>
              <Td>姓名13</Td>
              <Td>年龄13</Td>
              <Td>备注13</Td>
            </Tr>
            <Tr>
              <Td>姓名14</Td>
              <Td>年龄14</Td>
              <Td>备注14</Td>
            </Tr>
            <Tr>
              <Td>姓名15</Td>
              <Td>年龄15</Td>
              <Td>备注15</Td>
            </Tr>
            <Tr>
              <Td>姓名16</Td>
              <Td>年龄16</Td>
              <Td>备注16</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Td>姓名</Td>
              <Td>年龄</Td>
              <Td>备注</Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <p>动态请求数据，数据为空、有数据时的使用</p>
      <button type="button" onClick={() => {
        setStatus1('loading');
        setTimeout(function () {
          setStatus1('no-data');
          update1([]);
        }, 2000);
      }}>异步请求数据为空</button>
      <button type="button" onClick={() => {
        setStatus1('loading');
        setTimeout(function () {
          const data = [];
          let i = 0;

          while(i < 200) {
            data.push({
              name: '姓名' + (i + 1),
              age: '年龄' + (i + 1),
              remark: '备注' + (i + 1),
            });
            i++
          }

          setStatus1('have-data');
          update1(data);
        }, 2000);
      }}>异步请求存在数据</button>
      <TableContainer style={{ width: '800px', height: '350px' }} status={status1}>
        <Table className={style['table-stripe']} style={{minWidth: '1400px'}}>
          <Colgroup>
            <Col width="100" fixed="true" />
            <Col width="300" fixed="true" />
            <Col  />
            <Col width="300" />
          </Colgroup>
          <Thead fixed="true">
            <Tr>
              <Th>
                <input type="checkbox" checked={allChecked1} onChange={(event) => {
                  setAllChecked1(event.target.checked);
                }} />全选
              </Th>
              <Th>姓名</Th>
              <Th>年龄</Th>
              <Th>备注</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              data1.map(function (item, index) {
                return (
                  <Tr key={index} className={ hoverIndex === index ? style.hover : '' }
                    onMouseEnter={() => {
                      setHoverIndex(index);
                    }}
                    onMouseOut={() => {
                      setHoverIndex('');
                    }}
                    onClick={() => {
                      console.log('点击第' + (index + 1) + '行');
                    }}>
                    <Td>
                      <input type="checkbox" checked={checkboxes1[index] || false} onChange={(event) => {
                        setCheckboxes1Item(index, event.target.checked);
                      }} />
                    </Td>
                    <Td>{item.name}</Td>
                    <Td>{item.age}</Td>
                    <Td>{item.remark}</Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
        <Loading className="loading"><span>加载中...</span></Loading>
        <NoData className="no-data">无数据</NoData>
        <Fail className="fail"><span>加载失败...</span></Fail>
      </TableContainer>
    </div>
  )
}
