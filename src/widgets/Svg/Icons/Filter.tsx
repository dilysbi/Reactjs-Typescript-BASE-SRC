import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 15 14" {...props}>
      <path d="M14.25 0V1.5H13.5L9.75 7.125V13.5H5.25V7.125L1.5 1.5H0.75V0H14.25ZM3.303 1.5L6.75 6.6705V12H8.25V6.6705L11.697 1.5H3.303Z" />
    </Svg>
  )
}

export default Icon
