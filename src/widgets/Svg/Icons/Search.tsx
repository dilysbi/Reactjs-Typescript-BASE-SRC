import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 16 16" {...props}>
      <path d="M1 1L6.72038 6.72038L12.4408 1" stroke="#63FEFF" strokeWidth="1.86667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.4408 15.6667L6.72038 9.94629L1 15.6667" stroke="#63FEFF" strokeWidth="1.86667" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

export default Icon
