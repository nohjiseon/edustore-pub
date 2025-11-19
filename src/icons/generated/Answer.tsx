import * as React from 'react'
import type { SVGProps } from 'react'
const SvgAnswer = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <rect width={24} height={24} fill='#333' rx={12} />
    <path
      fill='#fff'
      d='M8.86 17h-1.6l3.555-9.898h1.736L16.119 17h-1.6l-.902-2.611H9.762zm1.332-3.87h2.988l-1.463-4.224h-.069z'
    />
  </svg>
)
export default SvgAnswer
