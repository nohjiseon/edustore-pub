import * as React from 'react'
import type { SVGProps } from 'react'
const SvgBlueArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 25' width='1em' height='1em' {...props}>
    <path stroke='currentColor' strokeWidth={2} d='m8 4.5 8 8-8 8' />
  </svg>
)
export default SvgBlueArrow
