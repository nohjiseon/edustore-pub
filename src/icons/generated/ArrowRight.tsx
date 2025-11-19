import * as React from 'react'
import type { SVGProps } from 'react'
const SvgArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.2}
      d='M14.333 17.333 19 11.993l-4.667-5.326M5 12h14'
    />
  </svg>
)
export default SvgArrowRight
