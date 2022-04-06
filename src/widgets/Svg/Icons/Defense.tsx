import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 21 21" {...props}>
      <rect width="21" height="21" rx="3" fill="#3A3F50" />
      <path
        d="M15.7321 7.14545C14.9228 6.92553 14.1322 6.63976 13.3679 6.29091C12.6159 5.95877 11.8899 5.56854 11.1964 5.12364L11 5L10.8071 5.12727C10.1136 5.57218 9.3877 5.96241 8.63571 6.29455C7.8701 6.64234 7.07827 6.9269 6.26786 7.14545L6 7.21455V10.2473C6 15.1164 10.8321 16.9382 10.8786 16.9564L11 17L11.1214 16.9564C11.1714 16.9564 16 15.12 16 10.2473V7.21455L15.7321 7.14545Z"
        fill="#FCEF9C"
      />
    </Svg>
  )
}

export default Icon
