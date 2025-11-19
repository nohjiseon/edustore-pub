import * as React from 'react'
import type { SVGProps } from 'react'
const SvgDropdown = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='m7 10 5 4 5-4'
    />
  </svg>
)
export default SvgDropdown
