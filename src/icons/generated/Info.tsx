import * as React from 'react'
import type { SVGProps } from 'react'
const SvgInfo = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <rect
      width={17}
      height={17}
      x={3.5}
      y={3.5}
      stroke='currentColor'
      rx={8.5}
    />
    <path
      fill='currentColor'
      d='M11.443 17V9.576h1.176V17zm.588-8.654c-.45 0-.82-.342-.82-.78 0-.437.37-.779.82-.779.451 0 .834.342.834.78 0 .437-.383.779-.834.779'
    />
  </svg>
)
export default SvgInfo
