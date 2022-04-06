import React from 'react'
import styled from 'styled-components'
import { DropdownProps, PositionProps, Position } from './types'

const getLeft = ({ position }: PositionProps) => {
  if (position === 'top-right') {
    return '100%'
  }
  if (position === 'bottom-left') {
    return '0'
  }
  return '50%'
}

const getBottom = ({ position }: PositionProps) => {
  if (position === 'top' || position === 'top-right') {
    return '100%'
  }
  return 'auto'
}

const DropdownContent = styled.div<{ padding?: string; position: Position }>`
  display: none;
  width: max-content;
  flex-direction: column;

  position: absolute;
  left: ${getLeft};
  bottom: ${getBottom};
  transform: translate(-50%, 0);

  background-color: ${({ theme }) => theme.nav.background};
  box-shadow: ${({ theme }) => theme.shadows.level1};
  padding: ${({ padding }) => padding || '16px'};
  max-height: 500px;
  overflow-y: auto;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  border-radius: ${({ theme }) => theme.radii.small};
`

const Container = styled.div`
  position: relative;
  &:hover ${DropdownContent}, &:focus-within ${DropdownContent} {
    display: flex;
  }
`

const Dropdown: React.FC<DropdownProps> = ({ padding, target, position = 'bottom', children }) => {
  return (
    <Container>
      {target}
      <DropdownContent position={position} padding={padding}>
        {children}
      </DropdownContent>
    </Container>
  )
}
Dropdown.defaultProps = {
  position: 'bottom',
}

export default Dropdown
