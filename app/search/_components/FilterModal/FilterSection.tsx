import React from 'react'

import styles from './FilterSection.module.scss'

import ToggleBadge from '~/components/ui/ToggleBadge'

interface Props {
  title: string
  options: readonly string[]
  selected: string[]
  disabledOptions?: string[]
  onToggle: (option: string) => void
}

const FilterSection = ({
  title,
  options,
  selected,
  disabledOptions = [],
  onToggle
}: Props) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.options_grid}>
        {options.map((option) => {
          const isDisabled = disabledOptions.includes(option)
          return (
            <button
              key={`${title}-${option}`}
              className={styles.option_button}
              onClick={() => onToggle(option)}
              disabled={isDisabled}
            >
              <ToggleBadge
                size='md'
                selected={selected.includes(option)}
                disabled={isDisabled}
              >
                {option}
              </ToggleBadge>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default FilterSection
