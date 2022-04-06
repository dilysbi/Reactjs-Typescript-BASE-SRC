import styled from 'styled-components'
import { CheckboxProps, scales } from './types'

const getScale = ({ scale }: CheckboxProps) => {
  switch (scale) {
    case scales.SM:
      return '24px'
    case scales.MD:
    default:
      return '28px'
  }
}

const Checkbox = styled.input.attrs({ border: 1, checkedWidth: 4, type: 'checkbox' })<CheckboxProps>`
  appearance: none;
  display: flex;
  align-items: center;
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;

  position: relative;
  padding: 30% 2em;
  box-sizing: border-box;

  color: #fff;
  background: #19183e;
  background-clip: padding-box;
  border: ${({ border }) => border}px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -${({ border }) => border}px;
    border-radius: inherit;
    background: #424082;
  }

  &:after {
    content: '';
    position: absolute;
    border-bottom: ${({ checkedWidth }) => checkedWidth}px solid;
    border-left: ${({ checkedWidth }) => checkedWidth}px solid;
    border-color: transparent;
    top: 27%;
    left: 2%;
    right: 0;
    width: 60%;
    height: 36%;
    margin: auto;
    transform: rotate(-50deg);
    transition: border-color 0.2s ease-in-out;
  }

  &:checked {
    &:before {
      background: ${({ theme }) => theme.colors.textGradient};
    }
    &:after {
      border-color: #51fbff;
    }
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: ${getScale};
    height: ${getScale};
    min-width: ${getScale};
    min-height: ${getScale};
  }
`

Checkbox.defaultProps = {
  scale: scales.MD,
}

export default Checkbox
