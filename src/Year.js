import Icon from '@mdi/react'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'

export default ({
  locale,
  persianDate,
  onSelectMonth,
  goPrev,
  goNext,
  onSelectDecade
}) => (
  <div className="picker">
    <div className="header">
      <span>
        <Icon path={(locale === 'fa')? mdiChevronRight :mdiChevronLeft} onClick={goPrev} />
      </span>
      <span onClick={onSelectDecade}>{persianDate.format('YYYY')}</span>
      <span>
        <Icon path={(locale === 'fa')? mdiChevronLeft: mdiChevronRight} onClick={goNext} />
      </span>
    </div>
    <div className="body">
      <table>
        <tbody>
          {[...Array(4)].map((_, i) =>
            <tr key={i} className="year-months">
              {[...Array(3)].map((__, j) =>
                <td key={j} data-month={(i * 3) + j + 1} onClick={onSelectMonth}>
                  {persianDate.startOf('year').add('M', (i * 3) + j).format('MMMM')}
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)
