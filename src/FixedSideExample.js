import React from 'react';
import {
  Table,
  Colgroup,
  Col,
  Thead,
  Tbody,
  Tfoot,
} from './components/FixedSide.js';

export default function (props) {
  return (
    <div>
      <p>固定表头、第一列：水平 + 竖直方向均出现滚动条</p>
      <Table scrollHeight="300px" style={{minWidth: '1400px'}}>
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
      </Table>
      <p>固定表头、第一列：水平 + 竖直方向均无滚动条</p>
      <Table scrollHeight="300px" style={{minWidth: '1400px'}}>
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
        </Tbody>
      </Table>
    
    </div>
  )
}
