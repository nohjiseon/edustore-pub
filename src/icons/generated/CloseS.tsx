import * as React from 'react'
import type { SVGProps } from 'react'
const SvgCloseS = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.2}
      d='m8 16 8-8M8 8l8 8'
    />
  </svg>
)
export default SvgCloseS
