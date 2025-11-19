import EducationList from './_components/Education/EducationList'
import ExperienceList from './_components/Experience/ExperienceList'
import FaqList from './_components/Faq/FaqList'
import ServiceReviews from './_components/ServiceReviews/ServiceReviews'
import TeacherList from './_components/TeacherList/TeacherList'
import Visual from './_components/Visual/Visual'
import styles from './page.module.scss'

import { Icon } from '@/components/Icon'

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* visual section */}
      <section className={styles.visual}>
        <div className={styles.con_box}>
          <h2 className={styles.title}>
            매일 업데이트되는 다양한 수업자료를 탐색하고
            <br />
            나만의 자료도 업로드하세요
          </h2>
          <p className={styles.subtit}>
            전국 교사들이 만든 검증된 수업 자료, 수업가게에서 시작하세요
          </p>
          <Visual />
        </div>
      </section>

      {/* service reviews section */}
      <section className={styles.service}>
        <div className={styles.con_box}>
          <div className={styles.service_wrap}>
            <span className={styles.sec_tit}>Service Reviews</span>
            <h2 className={styles.title}>
              전국 교사들이 만든 검증된 수업자료를 지금 만나보세요
            </h2>
            <ServiceReviews />
          </div>
        </div>
      </section>

      {/* education section */}
      <section className={styles.education}>
        <div className={styles.con_box}>
          <div className={styles.education_wrap}>
            <h2 className={styles.small_title}>유아교육 자료</h2>
            <p className={styles.small_subtit}>
              유아 교육 담당 교사들이 가장 많이 찾은 자료
            </p>

            {/* 리스트는 최대 8개까지만 표출됩니다 */}
            <EducationList className='education_box' />
          </div>
          <div className={styles.education_wrap}>
            <h2 className={styles.small_title}>초등학교 자료</h2>
            <p className={styles.small_subtit}>
              교실에서 활발히 활용되는 인기 자료 모음
            </p>
            <EducationList className='education_box' />
          </div>
        </div>
      </section>

      {/* TeacherList section */}
      <section className={styles.teacher}>
        <div className={styles.con_box}>
          <div className={styles.teacher_wrap}>
            <span className={styles.sec_tit}>User Profile</span>
            <h2 className={styles.title}>
              이곳에서 활발히 활동 중인
              <br />
              다양한 선생님들을 만나보세요
            </h2>
            <p className={styles.small_subtit}>
              다양한 학년 및 교과목 담당 선생님들이 업로드한 검정된 자료를 바로
              확인할 수 있어요.
            </p>
          </div>
          <TeacherList />
        </div>
      </section>

      {/* education section */}
      <section className={styles.education}>
        <div className={styles.con_box}>
          <div className={styles.education_wrap}>
            <h2 className={styles.small_title}>중학교 자료</h2>
            <p className={styles.small_subtit}>
              학습 효과가 검증된 인기 콘텐츠
            </p>
            <EducationList className='education_box' />
          </div>
          <div className={styles.education_wrap}>
            <h2 className={styles.small_title}>고등학교 자료</h2>
            <p className={styles.small_subtit}>
              고등학교 교사들이 추천하는 학습 자료
            </p>
            <EducationList className='education_box' />
          </div>
        </div>
      </section>

      {/* experience section */}
      <section className={styles.experience}>
        <div className={styles.con_box}>
          <span className={styles.sec_tit}>User Stories</span>
          <h2 className={styles.title}>
            수업 준비를 바꾸는 경험,
            <br />
            현장에서 실감한 교사들이 말합니다.
          </h2>
          <p className={styles.small_subtit}>
            다양한 학년 및 교과목 담당 선생님들이 업로드한 검정된 자료를 바로
            확인할 수 있어요.
          </p>
          <ExperienceList />
        </div>
      </section>

      {/* faq section */}
      <section className={styles.faq}>
        <div className={`${styles.faq_wrap} ${styles.con_box}`}>
          <span className={styles.sec_tit}>FAQ List</span>
          <h2 className={styles.title}>수업가게, 어떻게 이용하나요?</h2>
          <p className={styles.small_subtit}>
            수업가게에 대해 자주 물어보는 질문을 모아봤어요.
          </p>
          <FaqList />
        </div>
      </section>

      {/* contact section */}
      <section className={styles.contact}>
        <div className={styles.con_box}>
          <p>교실을 넘어 확산되는 배움</p>
          <h2>
            더 많은 선생님과 <br className='mo' />
            학생을 연결하는 수업가게
          </h2>
          <div className={styles.btn_box}>
            <a href='/upload' className={styles.white}>
              자료 진열하기
              <span>
                <Icon name='arrow-right' color='currentColor' />
              </span>
            </a>
            <a href='/service' className={styles.white_line}>
              문의하기
              <span>
                <Icon name='arrow-right' color='currentColor' />
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
