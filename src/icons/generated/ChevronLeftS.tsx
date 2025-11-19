import * as React from 'react'
import type { SVGProps } from 'react'
const SvgChevronLeftS = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.2}
      d='m14.5 7-5 5 5 5'
    />
  </svg>
)
export default SvgChevronLeftS
