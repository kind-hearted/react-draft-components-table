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
} from './components/FixedSideColumn.js';
import style from './FixedSideColumnExample.module.css';

export default function (props) {
  const [hoverIndex, setHoverIndex] = useState('');
  const [data1, setData1] = useState([]);
  const [status1, setStatus1] = useState('no-data');

  return (
    <div>
      <p>说明：可选的固定两侧的列，只可能出现横向滚动条，不会出现纵向滚动条。</p>
      <p>注意：NoData、Loading、Fail的加载有关的状态显示，Loading、Fail不能固定高度，并且其最小高度应该和NoData的高度一致。</p>
      <p>固定两侧第一列（内容宽度大可滚动）</p>
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
      <TableContainer style={{ width: '800px' }} status={status1}>
        <Table style={{minWidth: '1200px'}} className={style['table-stripe']}>
          <Colgroup>
            <Col width="200" fixed="true" />
            <Col width="200" span="2" />
            <Col />
            <Col width="100" fixed="true" />
          </Colgroup>
          <Thead>
            <Tr>
              <Th rowSpan="2" onClick={() => {
                console.log('点击表头');
              }}>多行合并表头</Th>
              <Th colSpan="2">年龄</Th>
              <Th rowSpan="2">备注信息</Th>
              <Th rowSpan="2">操作</Th>
            </Tr>
            <Tr>
              <Th>年龄</Th>
              <Th>地址</Th>
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
                    <Td>第一列{index + 1}</Td>
                    <Td>{10 + index + 1}</Td>
                    <Td>地址{index + 1}</Td>
                    <Td>备注{index + 1}</Td>
                    <Td>删除{index + 1}</Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
        <Loading className="loading" style={{ minHeight: '100px' }}><span>加载中...</span></Loading>
        <NoData style={{ textAlign: 'center', height: '100px', lineHeight: '100px' }}>无数据</NoData>
        <Fail className="fail" style={{ minHeight: '100px' }}><span>加载失败...</span></Fail>
      </TableContainer>
      {/* <p>固定两侧第一列（内容宽度小无滚动）</p>
      <Table className={style['table-stripe']}>
        <Colgroup>
          <Col width="200" fixed="true" />
          <Col width="200" span="2" />
          <Col />
          <Col width="100" fixed="true" />
        </Colgroup>
        <Thead>
          <Tr>
            <Th rowSpan="2" onClick={() => {
              console.log('点击表头');
            }}>多行合并表头</Th>
            <Th colSpan="2">年龄</Th>
            <Th rowSpan="2">备注信息</Th>
            <Th rowSpan="2">操作</Th>
          </Tr>
          <Tr>
            <Th>年龄</Th>
            <Th>地址</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td rowSpan="2">第一列1 + 2</Td>
            <Td>11</Td>
            <Td></Td>
            <Td></Td>
            <Td onClick={() => {
              console.log('点击删除按钮');
            }}>删除1</Td>
          </Tr>
          <Tr>
            <Td>12</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除2</Td>
          </Tr>
          <Tr>
            <Td>第一列3</Td>
            <Td>13</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除3</Td>
          </Tr>
          <Tr>
            <Td>第一列4</Td>
            <Td>14</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除4</Td>
          </Tr>
          <Tr>
            <Td>第一列5</Td>
            <Td>15</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除5</Td>
          </Tr>
          <Tr>
            <Td>第一列6</Td>
            <Td>16</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除6</Td>
          </Tr>
          <Tr>
            <Td>第一列7</Td>
            <Td>17</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除7</Td>
          </Tr>
          <Tr>
            <Td>第一列8</Td>
            <Td>18</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除8</Td>
          </Tr>
          <Tr>
            <Td>第一列9</Td>
            <Td>19</Td>
            <Td></Td>
            <Td></Td>
            <Td rowSpan="2">删除9 + 10</Td>
          </Tr>
          <Tr>
            <Td>第一列10</Td>
            <Td>20</Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Td>汇总</Td>
            <Td>10</Td>
            <Td>20</Td>
            <Td>30</Td>
            <Td>40</Td>
          </Tr>
        </Tfoot>
      </Table>
      <p>固定左侧第一列（内容宽度大可滚动）</p>
      <Table style={{minWidth: '1200px'}}>
        <Colgroup>
          <Col width="200" fixed="true" />
          <Col width="200" span="2" />
          <Col />
          <Col width="100"/>
        </Colgroup>
        <Thead>
          <Tr>
            <Th rowSpan="2" onClick={() => {
              console.log('点击表头');
            }}>多行合并表头</Th>
            <Th colSpan="2">年龄</Th>
            <Th rowSpan="2">备注信息</Th>
            <Th rowSpan="2">操作</Th>
          </Tr>
          <Tr>
            <Th>年龄</Th>
            <Th>地址</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td rowSpan="2">第一列1 + 2</Td>
            <Td>11</Td>
            <Td></Td>
            <Td></Td>
            <Td onClick={() => {
              console.log('点击删除按钮');
            }}>删除1</Td>
          </Tr>
          <Tr>
            <Td>12</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除2</Td>
          </Tr>
          <Tr>
            <Td>第一列3</Td>
            <Td>13</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除3</Td>
          </Tr>
          <Tr>
            <Td>第一列4</Td>
            <Td>14</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除4</Td>
          </Tr>
          <Tr>
            <Td>第一列5</Td>
            <Td>15</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除5</Td>
          </Tr>
          <Tr>
            <Td>第一列6</Td>
            <Td>16</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除6</Td>
          </Tr>
          <Tr>
            <Td>第一列7</Td>
            <Td>17</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除7</Td>
          </Tr>
          <Tr>
            <Td>第一列8</Td>
            <Td>18</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除8</Td>
          </Tr>
          <Tr>
            <Td>第一列9</Td>
            <Td>19</Td>
            <Td></Td>
            <Td></Td>
            <Td rowSpan="2">删除9 + 10</Td>
          </Tr>
          <Tr>
            <Td>第一列10</Td>
            <Td>20</Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Td>汇总</Td>
            <Td>10</Td>
            <Td>20</Td>
            <Td>30</Td>
            <Td>40</Td>
          </Tr>
        </Tfoot>
      </Table>
      <p>固定右侧第一列（内容宽度大可滚动）</p>
      <Table style={{minWidth: '1200px'}}>
        <Colgroup>
          <Col width="200" />
          <Col width="200" span="2" />
          <Col />
          <Col width="100" fixed="true" />
        </Colgroup>
        <Thead>
          <Tr>
            <Th rowSpan="2" onClick={() => {
              console.log('点击表头');
            }}>多行合并表头</Th>
            <Th colSpan="2">年龄</Th>
            <Th rowSpan="2">备注信息</Th>
            <Th rowSpan="2">操作</Th>
          </Tr>
          <Tr>
            <Th>年龄</Th>
            <Th>地址</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td rowSpan="2">第一列1 + 2</Td>
            <Td>11</Td>
            <Td></Td>
            <Td></Td>
            <Td onClick={() => {
              console.log('点击删除按钮');
            }}>删除1</Td>
          </Tr>
          <Tr>
            <Td>12</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除2</Td>
          </Tr>
          <Tr>
            <Td>第一列3</Td>
            <Td>13</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除3</Td>
          </Tr>
          <Tr>
            <Td>第一列4</Td>
            <Td>14</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除4</Td>
          </Tr>
          <Tr>
            <Td>第一列5</Td>
            <Td>15</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除5</Td>
          </Tr>
          <Tr>
            <Td>第一列6</Td>
            <Td>16</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除6</Td>
          </Tr>
          <Tr>
            <Td>第一列7</Td>
            <Td>17</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除7</Td>
          </Tr>
          <Tr>
            <Td>第一列8</Td>
            <Td>18</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除8</Td>
          </Tr>
          <Tr>
            <Td>第一列9</Td>
            <Td>19</Td>
            <Td></Td>
            <Td></Td>
            <Td rowSpan="2">删除9 + 10</Td>
          </Tr>
          <Tr>
            <Td>第一列10</Td>
            <Td>20</Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Td>汇总</Td>
            <Td>10</Td>
            <Td>20</Td>
            <Td>30</Td>
            <Td>40</Td>
          </Tr>
        </Tfoot>
      </Table>
      <p>固定左侧第一 ~ 三列（内容宽度大可滚动）</p>
      <Table style={{minWidth: '1200px'}}>
        <Colgroup>
          <Col width="200" fixed="true" />
          <Col width="200" span="2" fixed="true" />
          <Col />
          <Col width="100" />
        </Colgroup>
        <Thead>
          <Tr>
            <Th rowSpan="2" onClick={() => {
              console.log('点击表头');
            }}>多行合并表头</Th>
            <Th colSpan="2">年龄</Th>
            <Th rowSpan="2">备注信息</Th>
            <Th rowSpan="2">操作</Th>
          </Tr>
          <Tr>
            <Th>年龄</Th>
            <Th>地址</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td rowSpan="2">第一列1 + 2</Td>
            <Td>11</Td>
            <Td></Td>
            <Td></Td>
            <Td onClick={() => {
              console.log('点击删除按钮');
            }}>删除1</Td>
          </Tr>
          <Tr>
            <Td>12</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除2</Td>
          </Tr>
          <Tr>
            <Td>第一列3</Td>
            <Td>13</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除3</Td>
          </Tr>
          <Tr>
            <Td>第一列4</Td>
            <Td>14</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除4</Td>
          </Tr>
          <Tr>
            <Td>第一列5</Td>
            <Td>15</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除5</Td>
          </Tr>
          <Tr>
            <Td>第一列6</Td>
            <Td>16</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除6</Td>
          </Tr>
          <Tr>
            <Td>第一列7</Td>
            <Td>17</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除7</Td>
          </Tr>
          <Tr>
            <Td>第一列8</Td>
            <Td>18</Td>
            <Td></Td>
            <Td></Td>
            <Td>删除8</Td>
          </Tr>
          <Tr>
            <Td>第一列9</Td>
            <Td>19</Td>
            <Td></Td>
            <Td></Td>
            <Td rowSpan="2">删除9 + 10</Td>
          </Tr>
          <Tr>
            <Td>第一列10</Td>
            <Td>20</Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Td>汇总</Td>
            <Td>10</Td>
            <Td>20</Td>
            <Td>30</Td>
            <Td>40</Td>
          </Tr>
        </Tfoot>
      </Table> */}
    </div>
  )
}