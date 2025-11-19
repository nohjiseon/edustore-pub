import * as React from 'react'
import type { SVGProps } from 'react'
const SvgCloseM = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.2}
      d='M6 18 18 6M6 6l12 12'
    />
  </svg>
)
export default SvgCloseM
