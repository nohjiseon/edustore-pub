import * as React from 'react'
import type { SVGProps } from 'react'
const SvgCheckboxFillS = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <path
      fill='#11c5d4'
      d='M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z'
    />
    <g filter='url(#a)'>
      <path
        stroke='#fff'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='m7.5 12 3.6 3.15 5.85-5.85'
        shapeRendering='crispEdges'
      />
    </g>
    <defs>
      <filter
        id='a'
        width={16.95}
        height={13.35}
        x={3.75}
        y={6.55}
        colorInterpolationFilters='sRGB'
        filterUnits='userSpaceOnUse'
      >
        <feFlood floodOpacity={0} result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          result='hardAlpha'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
        />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={1.5} />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix values='0 0 0 0 0.121569 0 0 0 0 0.184314 0 0 0 0 0.329412 0 0 0 0.1 0' />
        <feBlend
          in2='BackgroundImageFix'
          result='effect1_dropShadow_1444_23534'
        />
        <feBlend
          in='SourceGraphic'
          in2='effect1_dropShadow_1444_23534'
          result='shape'
        />
      </filter>
    </defs>
  </svg>
)
export default SvgCheckboxFillS
