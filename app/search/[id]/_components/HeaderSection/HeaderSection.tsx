import ContentHeader from '../_ui/ContentHeader'

interface Props {
  breadcrumbs: string[]
  thumbnailSrc: string
  thumbnailAlt?: string
  className?: string
}

const HeaderSection = ({
  breadcrumbs,
  thumbnailSrc,
  thumbnailAlt,
  className
}: Props) => {
  if (className) {
    return (
      <div className={className}>
        <ContentHeader
          breadcrumbs={breadcrumbs}
          thumbnailSrc={thumbnailSrc}
          thumbnailAlt={thumbnailAlt}
        />
      </div>
    )
  }

  return (
    <ContentHeader
      breadcrumbs={breadcrumbs}
      thumbnailSrc={thumbnailSrc}
      thumbnailAlt={thumbnailAlt}
    />
  )
}

export default HeaderSection
