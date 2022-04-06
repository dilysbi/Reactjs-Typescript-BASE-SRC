import React from 'react'
import { Tabs } from 'antd'
import styled from 'styled-components'

const TabsWrapper = styled.div<{ height?: string; minWidth?: string }>`
  .ant-tabs-nav {
    margin: 0;
    &::before {
      border: unset !important;
    }
  }
  .ant-tabs-nav-wrap {
    color: #45cdf8;

    padding: 2px;

    background: rgba(16, 13, 31, 0.3);
    border: 2px solid #0e1e69;
    border-radius: 30px;
    box-sizing: border-box;
  }
  .ant-tabs-nav-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  // item tabs
  .ant-tabs-tab {
    min-width: ${({ minWidth }) => minWidth || '100px'};
    height: calc(${({ height }) => height || '45px'} - 8px);
    padding: 0;
    margin: 0;

    display: flex;
    text-align: center;
    justify-content: center;

    &:hover,
    &:active {
      color: $primary-color;
    }
  }
  .ant-tabs-tab-btn {
    font-weight: bold;
    line-height: 20px;
    white-space: pre-wrap;
  }
  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: #ffffff !important;
    }
  }
  // animation
  .ant-tabs-ink-bar {
    background: linear-gradient(90deg, #384cff 0%, #2486f9 0.01%, #3ddcec 100%);
    border-radius: 80px;
    height: 100% !important;
    z-index: -1;
  }

  @media screen and (min-width: 992px) {
    .ant-tabs-content-holder {
      padding: 0 24px;
    }
  }
`

const { TabPane } = Tabs

interface Props {
  options: any
  activeKey: string
  minWidth?: string
  height?: string
  onChange: (v: any) => void
  [t: string]: any
}

const Index = ({ options, activeKey, onChange, minWidth, height, ...props }: Props) => {
  return (
    <TabsWrapper height={height} minWidth={minWidth} {...props}>
      <Tabs activeKey={activeKey} centered onChange={onChange}>
        {options.map(({ id, title, content }) => {
          return (
            <TabPane key={id} tab={<div>{title}</div>}>
              {content}
            </TabPane>
          )
        })}
      </Tabs>
    </TabsWrapper>
  )
}

export default Index
