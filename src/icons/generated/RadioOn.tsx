import * as React from 'react'
import type { SVGProps } from 'react'
const SvgRadioOn = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <rect
      width={16.5}
      height={16.5}
      x={3.75}
      y={3.75}
      fill='#fff'
      stroke='currentColor'
      strokeWidth={1.5}
      rx={8.25}
    />
    <rect width={10} height={10} x={7} y={7} fill='currentColor' rx={5} />
  </svg>
)
export default SvgRadioOn
