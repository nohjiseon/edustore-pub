import InquiryItem from './InquiryItem'
import styles from './InquiryList.module.scss'
import type { Inquiry } from '../../_mocks/inquiryData'

interface Props {
  inquiries: Inquiry[]
  onInquiryClick: (inquiry: Inquiry) => void
}

const InquiryList = ({ inquiries, onInquiryClick }: Props) => {
  return (
    <div className={styles.list}>
      {inquiries.map((inquiry) => (
        <InquiryItem
          key={inquiry.id}
          inquiry={inquiry}
          onImageClick={() => onInquiryClick(inquiry)}
        />
      ))}
    </div>
  )
}

export default InquiryList
