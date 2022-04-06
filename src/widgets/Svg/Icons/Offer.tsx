import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 15 17" {...props}>
      <path d="M1.66666 1L7.38704 6.72038L13.1074 1" stroke="#63FEFF" strokeWidth="1.86667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.1074 15.6667L7.38704 9.94629L1.66666 15.6667" stroke="#63FEFF" strokeWidth="1.86667" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

export default Icon
