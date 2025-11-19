import * as React from 'react'
import type { SVGProps } from 'react'
const SvgCloseL = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.2}
      d='M4 20 20 4M4 4l16 16'
    />
  </svg>
)
export default SvgCloseL
