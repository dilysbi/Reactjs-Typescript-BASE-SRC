import React from 'react'
import styled from 'styled-components'
import { Text } from 'widgets/widgets'

const WrapperBox = styled.div`
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 320px;
  }
`

const StyleButton = styled(Text).attrs({ role: 'button' })`
  font-size: 14px;
  font-weight: 300;

  position: relative;
  display: flex;
  align-items: center;

  padding-right: 16px;

  border: 2px solid #0e1e69;
  border-radius: 30px;

  &:hover,
  &:focus {
    border: 2px solid #0531ff;
  }
`
const TextLeft = styled.span`
  display: flex;
  align-items: center;
  margin-left: auto;
`
const TextCustom = styled(Text)`
  font-size: 20px;
  // margin-left: 10px;
`
const Input = styled.input`
  color: #45cdf8;
  width: 100%;
  padding: 10px 18px;
  margin: 0;
  border: unset;
  outline: unset;
  background-color: transparent;
  white-space: nowrap;
  text-overflow: ellipsis;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #45cdf8;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #45cdf8;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #45cdf8;
  }
`

interface Props {
  title?: string
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
}

const Index: React.FC<Props> = ({ title, placeholder, value, onChange, ...props }) => {
  return (
    <WrapperBox>
      {title && <TextCustom>{title}</TextCustom>}
      <StyleButton small bold>
        <Input value={value} placeholder={placeholder} onChange={(e) => onChange && onChange(e.target.value)} {...props} />
        <TextLeft>
          <img src="/images/icons/search.png" alt="" />
          {/* <SearchIcon width="20px" color="primary" ml="4px" /> */}
        </TextLeft>
      </StyleButton>
    </WrapperBox>
  )
}

export default Index
