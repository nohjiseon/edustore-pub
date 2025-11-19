import * as React from 'react'
import type { SVGProps } from 'react'
const SvgMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.2}
      d='m20.339 17.99-2.61-3.3m0 0a4.64 4.64 0 0 0 1.711-3.155c.271-2.595-1.594-4.954-4.167-5.27s-4.877 1.533-5.148 4.128c-.272 2.595 1.594 4.954 4.167 5.27a4.58 4.58 0 0 0 3.437-.973'
    />
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeWidth={1.2}
      d='M8.281 6.726H3.41m3.41 5.844H3.41m8.77 5.847H3.41'
    />
  </svg>
)
export default SvgMenu
