import MonthRow from './MonthRow'

import Icon from '@mdi/react'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'

const computeRows = persianDate => {
  const days = persianDate.daysInMonth()
  const header = 8 - persianDate.day()
  const footer = (days - header) % 7
  const body = days - header - footer
  return body / 7 + (header === 0? 0: 1) + (footer === 0? 0: 1)
}

export default ({
  locale,
  persianDate,
  now,
  selected,
  onSelectDate,
  goPrev,
  goNext,
  onSelectYear,
  goToToday
}) => (
  <div className="picker">
    <div className="header">
      <span className="chevron">
        <Icon path={(locale === 'fa')? mdiChevronRight :mdiChevronLeft} onClick={goPrev} />
      </span>
      <span onClick={onSelectYear}>{persianDate.format('MMMM YYYY')}</span>
      {now.isSameMonth(persianDate)?
        <span className="chevron">
          <Icon path={(locale === 'fa')? mdiChevronLeft: mdiChevronRight} onClick={goNext} />
        </span>
      :
        <span className="today-chevron">
          <span className="go-to-today" onClick={goToToday}>
            {(locale === 'fa')? "امروز": "Today"}
          </span>
          <Icon className="chevron" path={(locale === 'fa')? mdiChevronLeft: mdiChevronRight} onClick={goNext} />
        </span>
      }
    </div>
    <div className="body">
      <table>
        <thead>
          <tr className="week-days">
            {persianDate.rangeName().weekdaysMin.map((name, i) => (
              <th key={i}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(computeRows(persianDate))].map((_, i) =>
            <MonthRow
              key={i}
              row={i}
              persianDate={persianDate}
              now={now}
              selected={selected}
              onSelectDate={onSelectDate}
            />
          )}
        </tbody>
      </table>
    </div>
  </div>
)
