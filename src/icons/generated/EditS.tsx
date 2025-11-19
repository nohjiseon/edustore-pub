import * as React from 'react'
import type { SVGProps } from 'react'
const SvgEditS = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit={10}
      strokeWidth={1.3}
      d='m8.226 19.369-3.693.625a.456.456 0 0 1-.526-.526l.624-3.694c.042-.247.16-.475.338-.652L15.853 4.237a.81.81 0 0 1 1.144 0l2.766 2.766a.81.81 0 0 1 0 1.144L8.878 19.032a1.2 1.2 0 0 1-.652.337M14.412 5.91l3.732 3.732'
    />
  </svg>
)
export default SvgEditS
