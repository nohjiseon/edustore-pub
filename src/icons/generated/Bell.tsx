import * as React from 'react'
import type { SVGProps } from 'react'
const SvgBell = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.2}
      d='M16.537 10.146a5.559 5.559 0 1 0-11.117 0c0 6.485-2.78 8.338-2.78 8.338h16.677s-2.78-1.853-2.78-8.338m-3.961 10.435a1.854 1.854 0 0 1-3.205 0'
    />
  </svg>
)
export default SvgBell
