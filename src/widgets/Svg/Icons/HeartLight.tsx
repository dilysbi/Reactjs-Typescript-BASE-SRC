import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 12 12" {...props}>
      {`<3`}
    </Svg>
  )
}

export default Icon
