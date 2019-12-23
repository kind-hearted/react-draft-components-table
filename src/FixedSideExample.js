import React, { useState } from 'react';
import {
  Table,
  Colgroup,
  Col,
  Thead,
  Tbody,
  Center,
  Tfoot,
} from './components/FixedSide.js';
import style from './FixedSideExample.module.css';

export default function (props) {
  const [hoverIndex, setHoverIndex] = useState('');
  const [data1, setData1] = useState([]);
  const [loading1, setLoading1] = useState(false);
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
      <Table scrollHeight="200px" style={{minWidth: '1400px'}} scrollClassName="small-scroll-bar">
        <Colgroup>
          <Col width="300" fixed="true" />
          <Col  />
          <Col width="300" />
        </Colgroup>
        <Thead fixed="true">
          <tr>
            <th rowSpan="2">姓名</th>
            <th>年龄</th>
            <th>备注</th>
          </tr>
          <tr>
            <th>年龄</th>
            <th>备注</th>
          </tr>
        </Thead>
        <Tbody>
          <tr>
            <td rowSpan="2">姓名1 + 2</td>
            <td>年龄1</td>
            <td>备注1</td>
          </tr>
          <tr>
            <td>年龄2</td>
            <td>备注2</td>
          </tr>
          <tr>
            <td>姓名3</td>
            <td>年龄3</td>
            <td>备注3</td>
          </tr>
          <tr>
            <td>姓名4</td>
            <td>年龄4</td>
            <td>备注4</td>
          </tr>
          <tr>
            <td>姓名5</td>
            <td>年龄5</td>
            <td>备注5</td>
          </tr>
          <tr>
            <td>姓名6</td>
            <td>年龄6</td>
            <td>备注6</td>
          </tr>
          <tr>
            <td>姓名7</td>
            <td>年龄7</td>
            <td>备注7</td>
          </tr>
          <tr>
            <td>姓名8</td>
            <td>年龄8</td>
            <td>备注8</td>
          </tr>
          <tr>
            <td>姓名9</td>
            <td>年龄9</td>
            <td>备注9</td>
          </tr>
          <tr>
            <td>姓名10</td>
            <td>年龄10</td>
            <td>备注10</td>
          </tr>
          <tr>
            <td>姓名11</td>
            <td>年龄11</td>
            <td>备注11</td>
          </tr>
          <tr>
            <td>姓名12</td>
            <td>年龄12</td>
            <td>备注12</td>
          </tr>
          <tr>
            <td>姓名13</td>
            <td>年龄13</td>
            <td>备注13</td>
          </tr>
          <tr>
            <td>姓名14</td>
            <td>年龄14</td>
            <td>备注14</td>
          </tr>
          <tr>
            <td>姓名15</td>
            <td>年龄15</td>
            <td>备注15</td>
          </tr>
          <tr>
            <td>姓名16</td>
            <td>年龄16</td>
            <td>备注16</td>
          </tr>
        </Tbody>
        <Tfoot fixed="true">
          <tr>
            <td>姓名</td>
            <td>年龄</td>
            <td>备注</td>
          </tr>
        </Tfoot>
      </Table>
      <p>固定表头、第一列：水平 + 竖直方向均无滚动条</p>
      <Table scrollHeight="200px" style={{minWidth: '1400px'}}>
        <Colgroup>
          <Col width="300" fixed="true" />
          <Col  />
          <Col width="300" />
        </Colgroup>
        <Thead fixed="true">
          <tr>
            <th rowSpan="2">姓名</th>
            <th>年龄</th>
            <th>备注</th>
          </tr>
          <tr>
            <th>年龄</th>
            <th>备注</th>
          </tr>
        </Thead>
        <Tbody>
          <tr>
            <td>姓名1 + 2</td>
            <td>年龄1</td>
            <td>备注1</td>
          </tr>
        </Tbody>
        <Tfoot>
          <tr>
            <td>姓名</td>
            <td>年龄</td>
            <td>备注</td>
          </tr>
        </Tfoot>
      </Table>
      <p>固定第一列：水平 + 竖直方向均出现滚动条</p>
      <Table scrollHeight="200px" style={{minWidth: '1400px'}}>
        <Colgroup>
          <Col width="300" fixed="true" />
          <Col  />
          <Col width="300" />
        </Colgroup>
        <Thead fixed="true">
          <tr>
            <th rowSpan="2">姓名</th>
            <th>年龄</th>
            <th>备注</th>
          </tr>
          <tr>
            <th>年龄</th>
            <th>备注</th>
          </tr>
        </Thead>
        <Tbody>
          <tr>
            <td rowSpan="2">姓名1 + 2</td>
            <td>年龄1</td>
            <td>备注1</td>
          </tr>
          <tr>
            <td>年龄2</td>
            <td>备注2</td>
          </tr>
          <tr>
            <td>姓名3</td>
            <td>年龄3</td>
            <td>备注3</td>
          </tr>
          <tr>
            <td>姓名4</td>
            <td>年龄4</td>
            <td>备注4</td>
          </tr>
          <tr>
            <td>姓名5</td>
            <td>年龄5</td>
            <td>备注5</td>
          </tr>
          <tr>
            <td>姓名6</td>
            <td>年龄6</td>
            <td>备注6</td>
          </tr>
          <tr>
            <td>姓名7</td>
            <td>年龄7</td>
            <td>备注7</td>
          </tr>
          <tr>
            <td>姓名8</td>
            <td>年龄8</td>
            <td>备注8</td>
          </tr>
          <tr>
            <td>姓名9</td>
            <td>年龄9</td>
            <td>备注9</td>
          </tr>
          <tr>
            <td>姓名10</td>
            <td>年龄10</td>
            <td>备注10</td>
          </tr>
          <tr>
            <td>姓名11</td>
            <td>年龄11</td>
            <td>备注11</td>
          </tr>
          <tr>
            <td>姓名12</td>
            <td>年龄12</td>
            <td>备注12</td>
          </tr>
          <tr>
            <td>姓名13</td>
            <td>年龄13</td>
            <td>备注13</td>
          </tr>
          <tr>
            <td>姓名14</td>
            <td>年龄14</td>
            <td>备注14</td>
          </tr>
          <tr>
            <td>姓名15</td>
            <td>年龄15</td>
            <td>备注15</td>
          </tr>
          <tr>
            <td>姓名16</td>
            <td>年龄16</td>
            <td>备注16</td>
          </tr>
        </Tbody>
        <Tfoot>
          <tr>
            <td>姓名</td>
            <td>年龄</td>
            <td>备注</td>
          </tr>
        </Tfoot>
      </Table>
      <p>动态请求数据，数据为空、有数据时的使用</p>
      <button type="button" onClick={() => {
        setLoading1(true);
        setTimeout(function () {
          setLoading1(false);
          update1([]);
        }, 2000);
      }}>异步请求数据为空</button>
      <button type="button" onClick={() => {
        setLoading1(true);
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

          setLoading1(false);
          update1(data);
        }, 2000);
      }}>异步请求存在数据</button>
      <Table className={style['table-stripe']} scrollHeight="200px" style={{minWidth: '1400px'}}>
        <Colgroup>
          <Col width="100" fixed="true" />
          <Col width="300" fixed="true" />
          <Col  />
          <Col width="300" />
        </Colgroup>
        <Thead fixed="true">
          <tr>
            <th>
              <input type="checkbox" checked={allChecked1} onChange={(event) => {
                setAllChecked1(event.target.checked);
              }} />全选
            </th>
            <th>姓名</th>
            <th>年龄</th>
            <th>备注</th>
          </tr>
        </Thead>
        <Tbody>
          {
            data1.map(function (item, index) {
              return (
                <tr key={index} className={ hoverIndex === index ? style.hover : '' }
                  onMouseEnter={() => {
                    setHoverIndex(index);
                  }}
                  onMouseOut={() => {
                    setHoverIndex('');
                  }}
                  onClick={() => {
                    console.log('点击第' + (index + 1) + '行');
                  }}>
                  <td>
                    <input type="checkbox" checked={checkboxes1[index]} onChange={(event) => {
                      setCheckboxes1Item(index, event.target.checked);
                    }} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.remark}</td>
                </tr>
              )
            })
          }
        </Tbody>
        <Center style={{ display: loading1 || data1.length === 0 ? 'block' : 'none' }}>
          <div style={{ display: loading1 ? 'block' : 'none' }}>加载中...</div>
          <div style={{ display: !loading1 ? 'block' : 'none' }}>暂无数据</div>
        </Center>
      </Table>
    </div>
  )
}
