import React from 'react'
import styled from 'styled-components'
import { Pagination } from 'antd'

const PaginationStyled = styled.div`
  width: 100%;

  .ant-pagination {
    white-space: nowrap;
  }
  .ant-pagination-item,
  .ant-pagination-item-link {
    border: unset;
  }
  .ant-pagination-item,
  .ant-pagination-item-link,
  .ant-select:not(.ant-select-customize-input) .ant-select-selector,
  .ant-pagination-options-quick-jumper input {
    background: unset;
  }
  .ant-pagination-item-active,
  .ant-select:not(.ant-select-customize-input) .ant-select-selector,
  .ant-pagination-options-quick-jumper input {
    border: 1px solid #bebfc2;
  }
  .ant-pagination-item-active,
  .ant-select-selector,
  .ant-pagination-options-quick-jumper input,
  .ant-pagination-total-text {
    color: #b1afcd;
  }
  .ant-pagination-total-text {
    display: none;
    ${({ theme }) => theme.mediaQueries.sm} {
      display: block;
    }
  }
  .ant-pagination-item-active {
    background: #2f66f2;
    border-radius: 3px;
  }

  .ant-pagination-item a,
  .ant-pagination-item-active a,
  .ant-pagination-item-ellipsis,
  .ant-pagination-item-link,
  .ant-pagination-options-quick-jumper {
    color: #b1afcd !important;
  }

  .ant-pagination-options-quick-jumper {
    margin-left: 20px;
  }
`

interface Props {
  data?: any
  onNext?: (number) => void
  onPrev?: (number) => void
  [x: string]: any
}

const ITEMS_PER_PAGE = 10

const AppPagination: React.FC<Props> = ({ defaultPageSize, wrapperStyle, ...props }) => {
  return (
    <PaginationStyled {...wrapperStyle}>
      <Pagination defaultPageSize={defaultPageSize || ITEMS_PER_PAGE} {...props} />
    </PaginationStyled>
  )
}

export default AppPagination
