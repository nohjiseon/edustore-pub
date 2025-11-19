import * as React from 'react'
import type { SVGProps } from 'react'
const SvgDownArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <path
      stroke='#333'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.3}
      d='m4.5 9 7.5 6 7.5-6'
    />
  </svg>
)
export default SvgDownArrow
