import * as React from 'react'
import type { SVGProps } from 'react'
const SvgKebab = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <circle cx={12} cy={5} r={2} fill='currentColor' />
    <circle cx={12} cy={12} r={2} fill='currentColor' />
    <circle cx={12} cy={19} r={2} fill='currentColor' />
  </svg>
)
export default SvgKebab
