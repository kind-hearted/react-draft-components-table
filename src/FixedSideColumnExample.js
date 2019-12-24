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

  return (
    <div>
      <p>说明：可选的固定两侧的列，只可能出现横向滚动条，不会出现纵向滚动条。</p>
      <p>固定两侧第一列（内容宽度大可滚动）</p>
      <TableContainer style={{ width: '800px' }}>
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
            <Tr className={ hoverIndex === 1 ? style.hover : '' }
              onMouseEnter={() => {
                setHoverIndex(1);
              }}
              onMouseOut={() => {
                setHoverIndex('');
              }}
              onClick={() => {
                console.log("点击第1行");
              }}
            >
              <Td rowSpan="2">第一列1 + 2</Td>
              <Td>11</Td>
              <Td>地址1</Td>
              <Td>备注1</Td>
              <Td onClick={() => {
                console.log('点击删除按钮');
              }}>删除1</Td>
            </Tr>
            <Tr className={ hoverIndex === 2 ? style.hover : '' }
              onMouseEnter={() => {
                setHoverIndex(2);
              }}
              onMouseOut={() => {
                setHoverIndex('');
              }}
              onClick={() => {
                console.log("点击第2行");
              }}
            >
              <Td>12</Td>
              <Td>地址2</Td>
              <Td>备注2</Td>
              <Td>删除2</Td>
            </Tr>
            <Tr className={ hoverIndex === 3 ? style.hover : '' }
              onMouseEnter={() => {
                setHoverIndex(3);
              }}
              onMouseOut={() => {
                setHoverIndex('');
              }}
              onClick={() => {
                console.log("点击第3行");
              }}
            >
              <Td>第一列3</Td>
              <Td>13</Td>
              <Td>地址3</Td>
              <Td>备注3</Td>
              <Td>删除3</Td>
            </Tr>
            <Tr className={ hoverIndex === 4 ? style.hover : ''}
              onMouseEnter={() => {
                setHoverIndex(4);
              }}
              onMouseOut={() => {
                setHoverIndex('');
              }}
              onClick={() => {
                console.log("点击第4行");
              }}
            >
              <Td>第一列4</Td>
              <Td>14</Td>
              <Td>地址4</Td>
              <Td>备注4</Td>
              <Td>删除4</Td>
            </Tr>
            <Tr className={ hoverIndex === 5 ? style.hover : '' }
              onMouseEnter={() => {
                setHoverIndex(5);
              }}
              onMouseOut={() => {
                setHoverIndex('');
              }}
              onClick={() => {
                console.log("点击第5行");
              }}
            >
              <Td>第一列5</Td>
              <Td>15</Td>
              <Td>地址5</Td>
              <Td>备注5</Td>
              <Td>删除5</Td>
            </Tr>
            <Tr className={ hoverIndex === 6 ? style.hover : '' }
              onMouseEnter={() => {
                setHoverIndex(6);
              }}
              onMouseOut={() => {
                setHoverIndex('');
              }}
              onClick={() => {
                console.log("点击第6行");
              }}
            >
              <Td>第一列6</Td>
              <Td>16</Td>
              <Td>地址6</Td>
              <Td>备注6</Td>
              <Td>删除6</Td>
            </Tr>
            <Tr className={ hoverIndex === 7 ? style.hover : '' }
              onMouseEnter={() => {
                setHoverIndex(7);
              }}
              onMouseOut={() => {
                setHoverIndex('');
              }}
              onClick={() => {
                console.log("点击第7行");
              }}
            >
              <Td>第一列7</Td>
              <Td>17</Td>
              <Td>地址7</Td>
              <Td>备注7</Td>
              <Td>删除7</Td>
            </Tr>
            <Tr className={ hoverIndex === 8 ? style.hover : '' }
              onMouseEnter={() => {
                setHoverIndex(8);
              }}
              onMouseOut={() => {
                setHoverIndex('');
              }}
              onClick={() => {
                console.log("点击第8行");
              }}
            >
              <Td>第一列8</Td>
              <Td>18</Td>
              <Td>地址8</Td>
              <Td>备注8</Td>
              <Td>删除8</Td>
            </Tr>
            <Tr className={ hoverIndex === 9 ? style.hover : '' }
              onMouseEnter={() => {
                setHoverIndex(9);
              }}
              onMouseOut={() => {
                setHoverIndex('');
              }}
              onClick={() => {
                console.log("点击第9行");
              }}
            >
              <Td>第一列9</Td>
              <Td>19</Td>
              <Td>地址9</Td>
              <Td>备注9</Td>
              <Td rowSpan="2">删除9 + 10</Td>
            </Tr>
            <Tr className={ hoverIndex === 10 ? style.hover : '' }
              onMouseEnter={() => {
                setHoverIndex(10);
              }}
              onMouseOut={() => {
                setHoverIndex('');
              }}
              onClick={() => {
                console.log("点击第10行");
              }}
            >
              <Td>第一列10</Td>
              <Td>20</Td>
              <Td>地址10</Td>
              <Td>备注10</Td>
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