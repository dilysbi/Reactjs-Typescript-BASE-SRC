import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 7 15" {...props}>
      <path
        d="M4.77151 10.5114V0.401785C4.77151 0.179899 4.60071 0 4.39006 0H2.60997C2.39932 0 2.22852 0.179899 2.22852 0.401785V10.5114H0.764434C0.0847588 10.5114 -0.25562 11.3769 0.224972 11.8832L2.96055 14.7646C3.2585 15.0785 3.74154 15.0785 4.03945 14.7646L6.77503 11.8832C7.25562 11.377 6.91524 10.5114 6.23557 10.5114H4.77151Z"
        fill="url(#paint0_linear)"
      />
      <defs>
        <linearGradient id="paint0_linear" x1="1.53344" y1="-6.59087" x2="-11.8936" y2="2.81707" gradientUnits="userSpaceOnUse">
          <stop stopColor="#51fbff" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
      </defs>
    </Svg>
  )
}

export default Icon
