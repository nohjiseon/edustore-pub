import * as React from 'react'
import type { SVGProps } from 'react'
const SvgArrowLink = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.2}
      d='M7.357 5.5h11.144v11.143M18.5 5.5l-13 13'
    />
  </svg>
)
export default SvgArrowLink
