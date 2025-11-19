import * as React from 'react'
import type { SVGProps } from 'react'
const SvgCheckboxFillM = (props: SVGProps<SVGSVGElement>) => (
  <svg fill='none' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
    <path
      fill='#11c5d4'
      d='M2 6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z'
    />
    <g filter='url(#a)'>
      <path
        stroke='#fff'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='m7 12 4 3.5L17.5 9'
        shapeRendering='crispEdges'
      />
    </g>
    <defs>
      <filter
        id='a'
        width={18}
        height={14}
        x={3.25}
        y={6.25}
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
          result='effect1_dropShadow_1407_20350'
        />
        <feBlend
          in='SourceGraphic'
          in2='effect1_dropShadow_1407_20350'
          result='shape'
        />
      </filter>
    </defs>
  </svg>
)
export default SvgCheckboxFillM
