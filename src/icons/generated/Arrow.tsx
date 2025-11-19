import * as React from 'react'
import type { SVGProps } from 'react'
const SvgArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.2}
      d='M17.333 9.667 11.993 5 6.666 9.667M12 19V5'
    />
  </svg>
)
export default SvgArrow
