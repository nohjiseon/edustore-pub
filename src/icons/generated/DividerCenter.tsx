import * as React from 'react'
import type { SVGProps } from 'react'
const SvgDividerCenter = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <rect width={1} height={14} x={11.5} y={5} fill='currentColor' rx={0.5} />
  </svg>
)
export default SvgDividerCenter
