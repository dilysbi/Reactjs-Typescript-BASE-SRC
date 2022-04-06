import React, { useMemo } from 'react'
import { Form, Select } from 'antd'
import { get, map } from 'lodash'
import styled from 'styled-components'

const { Item } = Form
const { Option } = Select

const SelectStyled = styled(Item)<{ background: string }>`
  width: 100%;
  max-width: 160px;
  margin-left: auto;

  .ant-select {
    color: #fff;
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector,
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    height: 100%;
    height: 40px;

    padding: 4px 12px;
    background: ${({ background }) => background || 'transparent'};
    border: 1px solid #312f62;
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector .ant-select-selection-search-input {
    height: 100%;
    height: 40px;
  }
  .ant-select-selection-item {
    line-height: 32px;
  }
`

const FormSelect = (props) => {
  const { name = '', label = '', rules = [], options = [], optionProps = {}, formItemProps = {}, showSearch = true, allowClear = true, className = '', placeholder = 'All', ...inputProps } = props
  const renderOptions = useMemo(() => {
    if (options && get(options, 'length') > 0) {
      return map(options, (item, index) => {
        return (
          <Option {...optionProps} key={`select-${name}-${index}`} value={get(item, 'value')}>
            {get(item, 'label')}
          </Option>
        )
      })
    }
    return <></>
  }, [options, name, optionProps])

  return (
    <SelectStyled name={name} label={label} rules={rules} background="#19183E" {...formItemProps}>
      <Select suffixIcon={<></>} allowClear={allowClear} showSearch={showSearch} placeholder={placeholder} optionFilterProp="children" className={`form-select ${className}`} {...inputProps}>
        {renderOptions}
      </Select>
    </SelectStyled>
  )
}

export default FormSelect
