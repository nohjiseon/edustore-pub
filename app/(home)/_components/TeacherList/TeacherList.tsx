import Image from 'next/image'

import styles from './TeacherList.module.scss'
import { teacherSections } from '../../_mock/teacherList'

const TeacherList = () => {
  return (
    <div className={styles.teacher_wrap}>
      <div className={styles.teacher_marquee}>
        {teacherSections.map((items) => (
          <div
            key={items.idx}
            className={`${styles.teacher_list} ${(styles as any)[items.type]}`}
          >
            {items.items.map((teacher) => (
              <div key={teacher.id} className={styles.teacher_box}>
                <div className={styles.img_box}>
                  <Image src={teacher.imageSrc} alt='프로필 이미지' />
                </div>
                <div className={styles.txt_box}>
                  <span>{teacher.name}</span>
                  <p>{teacher.description}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
export default TeacherList
