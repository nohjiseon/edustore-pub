import * as React from 'react'
import type { SVGProps } from 'react'
const SvgStar = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <path
      fill='currentColor'
      d='m12 2 3.233 6.55 7.229 1.05-5.231 5.1 1.235 7.2L12 18.5l-6.466 3.4 1.235-7.2-5.23-5.1 7.228-1.05z'
    />
  </svg>
)
export default SvgStar
