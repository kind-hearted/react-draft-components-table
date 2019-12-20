import React, { useState } from 'react';
import {
  Table,
  Colgroup,
  Col,
  Thead,
  Tbody,
  Tfoot,
} from './components/FixedLeftRight.js';
import style from './FixedLeftRightExample.module.css';

export default function (props) {
  const [hoverIndex, setHoverIndex] = useState('');

  return (
    <div>
      <p>固定两侧第一列（内容宽度大可滚动）</p>
      <Table style={{minWidth: '1200px'}} className={style['table-stripe']}>
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
          <tr className={ hoverIndex === 1 ? style.hover : '' }
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
            <td rowSpan="2">第一列1 + 2</td>
            <td>11</td>
            <td></td>
            <td></td>
            <td onClick={() => {
              console.log('点击删除按钮');
            }}>删除1</td>
          </tr>
          <tr className={ hoverIndex === 2 ? style.hover : '' }
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
            <td>12</td>
            <td></td>
            <td></td>
            <td>删除2</td>
          </tr>
          <tr className={ hoverIndex === 3 ? style.hover : '' }
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
            <td>第一列3</td>
            <td>13</td>
            <td></td>
            <td></td>
            <td>删除3</td>
          </tr>
          <tr className={ hoverIndex === 4 ? style.hover : ''}
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
            <td>第一列4</td>
            <td>14</td>
            <td></td>
            <td></td>
            <td>删除4</td>
          </tr>
          <tr className={ hoverIndex === 5 ? style.hover : '' }
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
            <td>第一列5</td>
            <td>15</td>
            <td></td>
            <td></td>
            <td>删除5</td>
          </tr>
          <tr className={ hoverIndex === 6 ? style.hover : '' }
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
            <td>第一列6</td>
            <td>16</td>
            <td></td>
            <td></td>
            <td>删除6</td>
          </tr>
          <tr className={ hoverIndex === 7 ? style.hover : '' }
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
            <td>第一列7</td>
            <td>17</td>
            <td></td>
            <td></td>
            <td>删除7</td>
          </tr>
          <tr className={ hoverIndex === 8 ? style.hover : '' }
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
            <td>第一列8</td>
            <td>18</td>
            <td></td>
            <td></td>
            <td>删除8</td>
          </tr>
          <tr className={ hoverIndex === 9 ? style.hover : '' }
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
            <td>第一列9</td>
            <td>19</td>
            <td></td>
            <td></td>
            <td rowSpan="2">删除9 + 10</td>
          </tr>
          <tr className={ hoverIndex === 10 ? style.hover : '' }
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
      <p>固定两侧第一列（内容宽度小无滚动）</p>
      <Table className={style['table-stripe']}>
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
      <p>固定左侧第一列（内容宽度大可滚动）</p>
      <Table style={{minWidth: '1200px'}}>
        <Colgroup>
          <Col width="200" fixed="true" />
          <Col width="200" span="2" />
          <Col />
          <Col width="100"/>
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
      <p>固定右侧第一列（内容宽度大可滚动）</p>
      <Table style={{minWidth: '1200px'}}>
        <Colgroup>
          <Col width="200" />
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
      <p>固定左侧第一 ~ 三列（内容宽度大可滚动）</p>
      <Table style={{minWidth: '1200px'}}>
        <Colgroup>
          <Col width="200" fixed="true" />
          <Col width="200" span="2" fixed="true" />
          <Col />
          <Col width="100" />
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
    </div>
  )
}