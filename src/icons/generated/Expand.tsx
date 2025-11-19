import * as React from 'react'
import type { SVGProps } from 'react'
const SvgExpand = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <path stroke='currentColor' d='m7 16.5 5 4 5-4m0-9-5-4-5 4' />
  </svg>
)
export default SvgExpand
