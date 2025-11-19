import * as React from 'react'
import type { SVGProps } from 'react'
const SvgShoppingCart = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <path
      fill='currentColor'
      d='M8.25 23.15a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3m7.7 0a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3'
    />
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.2}
      d='M.879 4.445h3.386l2.27 11.337a1.69 1.69 0 0 0 1.693 1.363h8.23a1.69 1.69 0 0 0 1.692-1.363l1.355-7.103H5.112'
    />
  </svg>
)
export default SvgShoppingCart
