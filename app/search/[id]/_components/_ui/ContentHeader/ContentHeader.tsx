import styles from './ContentHeader.module.scss'

interface Props {
  breadcrumbs: string[]
  thumbnailSrc: string
  thumbnailAlt?: string
}

const ContentHeader = ({
  breadcrumbs,
  thumbnailSrc,
  thumbnailAlt = '콘텐츠 썸네일'
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.nav_thumb_wrapper}>
        <nav className={styles.breadcrumb}>
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className={styles.breadcrumb_item}>
              <span className={styles.breadcrumb_text}>{crumb}</span>
              {index < breadcrumbs.length - 1 && (
                <div className={styles.arrow_wrapper}>
                  <svg
                    width='7'
                    height='3'
                    viewBox='0 0 7 3'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className={styles.arrow_icon}
                  >
                    <path
                      d='M0.5 0.5L3.5 2.5L6.5 0.5'
                      stroke='#8F99A4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className={styles.thumbnail}>
          <img
            src={thumbnailSrc}
            alt={thumbnailAlt}
            className={styles.thumbnail_image}
          />
        </div>
      </div>
    </div>
  )
}

export default ContentHeader
