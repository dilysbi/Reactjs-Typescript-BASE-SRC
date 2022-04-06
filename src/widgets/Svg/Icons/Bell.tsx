import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 10 12" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.31028 0.190063C4.33615 0.190063 3.47364 0.819461 3.17648 1.74715L0.760254 9.29011H9.8603L7.44407 1.74715C7.14691 0.819459 6.2844 0.190063 5.31028 0.190063ZM3.94526 10.2001C3.69397 10.2001 3.49025 10.4038 3.49025 10.6551C3.49025 10.9064 3.69397 11.1101 3.94526 11.1101H6.67527C6.92656 11.1101 7.13027 10.9064 7.13027 10.6551C7.13027 10.4038 6.92656 10.2001 6.67527 10.2001H3.94526Z"
        fill="white"
      />
    </Svg>
  )
}

export default Icon
