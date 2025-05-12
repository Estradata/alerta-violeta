import type { SVGProps } from 'react'

export function CustomMapPin(props: SVGProps<SVGSVGElement>) {
  const BORDER_COLOR = '#581c87'
  const CIRCLE_COLOR = '#6b21a8'
  const PIN_COLOR = '#a855f7'

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='z-[1]'
      width={26}
      height={38}
      style={{
        display: 'block',
        overflow: 'visible',
        gridArea: 1,
        pointerEvents: 'all',
      }}
      viewBox='0 0 26 37'
      {...props}
    >
      <g
        fill='none'
        fillRule='evenodd'
        style={{
          pointerEvents: 'auto',
        }}
      >
        <path
          fill={BORDER_COLOR}
          d='M13 0C5.817 0 0 5.773 0 12.918c0 7.655 5.59 10.526 9.555 17.16C12.09 34.321 11.342 37 13 37c1.723 0 .975-2.743 3.445-6.858C20.085 23.86 26 20.605 26 12.918 26 5.773 20.183 0 13 0Z'
          className='RIFJN-maps-pin-view-border'
        />

        <path
          fill={PIN_COLOR}
          d='M13.017 35c-.233 0-.3-.065-.7-1.275-.332-1.046-.832-2.648-2.13-4.61-1.265-1.928-2.596-3.498-3.861-5.002C3.363 20.517 1 17.706 1 12.64 1.033 6.199 6.393 1 13.017 1S25 6.23 25 12.639c0 5.067-2.33 7.911-5.326 11.507-1.232 1.504-2.53 3.073-3.795 4.97-1.265 1.928-1.797 3.498-2.13 4.544-.4 1.275-.5 1.34-.732 1.34Z'
          className='RIFvHW-maps-pin-view-background'
        />

        <path
          fill={CIRCLE_COLOR}
          d='M13 18a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z'
          className='KWCFZI-maps-pin-view-default-glyph'
        />

        <image
          width={15}
          height={15}
          x='50%'
          y='50%'
          style={{
            transform: 'translate(-7.5px,-12.5px)',
          }}
        />
      </g>
    </svg>
  )
}
