import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0  19 19" {...props}>
      <g clipPath="url(#clip0_503_4208)">
        <path
          d="M15.8336 11.479L15.2478 7.67586C15.1903 7.30227 15.0011 6.96156 14.7143 6.71531C14.4276 6.46906 14.0622 6.33352 13.6842 6.33319H5.3171C4.93885 6.33315 4.57307 6.46851 4.28599 6.7148C3.9989 6.96108 3.80947 7.302 3.75197 7.67586L2.65551 14.8009C2.62081 15.0265 2.63532 15.257 2.69803 15.4765C2.76074 15.696 2.87018 15.8993 3.01885 16.0726C3.16751 16.2458 3.35188 16.3849 3.55931 16.4802C3.76675 16.5755 3.99235 16.6249 4.22064 16.6249H9.50026"
          stroke="#63FEFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M11.0837 15.0415L13.4587 17.4165L17.417 13.4582" stroke="#63FEFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M11.0837 3.95818C11.0837 3.53825 10.9168 3.13553 10.6199 2.83859C10.323 2.54166 9.92025 2.37485 9.50033 2.37485C9.0804 2.37485 8.67767 2.54166 8.38074 2.83859C8.08381 3.13553 7.91699 3.53825 7.91699 3.95818"
          stroke="#63FEFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_503_4208">
          <rect width="19" height="19" fill="white" transform="translate(0.000320435 -0.000152588)" />
        </clipPath>
      </defs>
    </Svg>
  )
}

export default Icon
