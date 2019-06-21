import PersianDate from './PersianDate'

import DecadeRow from './DecadeRow'

import Icon from '@mdi/react'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'

const decade = year => {
  const firstYear = Math.floor(year / 10) * 10
  return new PersianDate([firstYear])
}

export default ({
  locale,
  year,
  onSelectYear,
  goPrev,
  goNext,
  onSelectCentury
}) => (
  <div className="picker">
    <div className="header">
      <span>
        <Icon path={(locale === 'fa')? mdiChevronRight :mdiChevronLeft} onClick={goPrev} />
      </span>
      <span onClick={onSelectCentury}>{
        decade(year).add('y', 9).format('YYYY')
        + ' - ' +
        decade(year).format('YYYY')
      }</span>
      <span>
        <Icon path={(locale === 'fa')? mdiChevronLeft: mdiChevronRight} onClick={goNext} />
      </span>
    </div>
    <div className="body">
      <table>
        <tbody>
          {[...Array(4)].map((_, i) =>
            <DecadeRow
            key={i}
            row={i}
            persianDate={decade(year)}
            onSelectYear={onSelectYear} />
          )}
        </tbody>
      </table>
    </div>
  </div>
)
