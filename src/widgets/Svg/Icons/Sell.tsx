import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <path d="M6 5V7" stroke="#63FEFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 5V11" stroke="#63FEFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 5V6" stroke="#63FEFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10V16" stroke="#63FEFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 18.5V19" stroke="#63FEFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 18.5V19" stroke="#63FEFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 18.5V19" stroke="#63FEFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 18.5V19" stroke="#63FEFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14V16" stroke="#63FEFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 13V16" stroke="#63FEFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 5V10" stroke="#63FEFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 9V16" stroke="#63FEFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

export default Icon
