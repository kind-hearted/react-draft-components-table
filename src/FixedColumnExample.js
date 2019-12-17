import React from 'react';
import {
  Table,
  Colgroup,
  Col,
  Thead,
  Tbody,
  Tfoot,
} from './FixedColumn.js';

export default function (props) {
  return (
    <Table style={{minWidth: '1200px'}}>
      <Colgroup>
        <Col width="200" fixed="true" />
        <Col width="200" span="2" />
        <Col />
        <Col width="100" fixed="true" />
      </Colgroup>
      <Thead>
        <tr>
          <th rowSpan="2" onClick={() => {
            console.log('点击表头');
          }}>多行合并表头</th>
          <th colSpan="2">年龄</th>
          <th rowSpan="2">备注信息</th>
          <th rowSpan="2">操作</th>
        </tr>
        <tr>
          <th>年龄</th>
          <th>地址</th>
        </tr>
      </Thead>
      <Tbody>
        <tr>
          <td rowSpan="2">第一列1 + 2</td>
          <td>11</td>
          <td></td>
          <td></td>
          <td onClick={() => {
            console.log('点击删除按钮');
          }}>删除1</td>
        </tr>
        <tr>
          <td>12</td>
          <td></td>
          <td></td>
          <td>删除2</td>
        </tr>
        <tr>
          <td>第一列3</td>
          <td>13</td>
          <td></td>
          <td></td>
          <td>删除3</td>
        </tr>
        <tr>
          <td>第一列4</td>
          <td>14</td>
          <td></td>
          <td></td>
          <td>删除4</td>
        </tr>
        <tr>
          <td>第一列5</td>
          <td>15</td>
          <td></td>
          <td></td>
          <td>删除5</td>
        </tr>
        <tr>
          <td>第一列6</td>
          <td>16</td>
          <td></td>
          <td></td>
          <td>删除6</td>
        </tr>
        <tr>
          <td>第一列7</td>
          <td>17</td>
          <td></td>
          <td></td>
          <td>删除7</td>
        </tr>
        <tr>
          <td>第一列8</td>
          <td>18</td>
          <td></td>
          <td></td>
          <td>删除8</td>
        </tr>
        <tr>
          <td>第一列9</td>
          <td>19</td>
          <td></td>
          <td></td>
          <td rowSpan="2">删除9 + 10</td>
        </tr>
        <tr>
          <td>第一列10</td>
          <td>20</td>
          <td></td>
          <td></td>
        </tr>
      </Tbody>
      <Tfoot>
        <tr>
          <td>汇总</td>
          <td>10</td>
          <td>20</td>
          <td>30</td>
          <td>40</td>
        </tr>
      </Tfoot>
    </Table>
  )
}