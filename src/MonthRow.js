const firstDay = persianDate => persianDate.day()

const index = (row, column) => (row * 7) + column

const indexToDay = (i, j, persianDate) =>
  index(i, j) - firstDay(persianDate) + 1

const day = (i, j, persianDate) =>
  persianDate.add('d', indexToDay(i, j, persianDate))


const isPrev = (i, j, persianDate) =>
  index(i, j) < (firstDay(persianDate) - 1)

const isNext = (i, j, persianDate) =>
  persianDate.daysInMonth() <= (index(i, j) - (firstDay(persianDate) - 1))

const isSame = (target, day) =>
  target.isSameDay(day)

export default ({row, persianDate, now, selected, onSelectDate}) => (
  <tr>
    {[...Array(7)].map((_, j) => (
        <td
          key={j}
          className={
            isPrev(row, j, persianDate)? 'prev':
            isNext(row, j, persianDate)? 'next':
            isSame(now, day(row, j, persianDate))? 'today':
            isSame(selected, day(row, j, persianDate))? 'selected': ''
          }
          data-day={indexToDay(row, j, persianDate)}
          onClick={onSelectDate}
        >
          {day(row, j, persianDate).format('D')}
        </td>
      ))}
  </tr>
)
