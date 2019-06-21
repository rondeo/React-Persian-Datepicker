const isActive = (i, j) => (i === 3 && j !== 1)? false: true

const year = (i, j, persianDate) => {
  const numbers = (j === 0)? (i * 3): 1
  return isActive(i, j)? (i === 3? 9: numbers) + persianDate.year(): ''
}

const yearString = (i, j, persianDate) => {
  var numbers = (j === 0)? (i * 3): 1
  return isActive(i, j)? persianDate.add('y', (i === 3? 9: numbers)).format('YYYY'): ''
}

export default ({row, persianDate, onSelectYear}) => (
  <tr className="decade-years">
    {[...Array(3)].map((_, j) =>
      <td
        className={isActive(row, j)? "": "disabled"}
        key={j}
        data-year={isActive(row, j)? year(row, j, persianDate): ''}
        onClick={isActive(row, j)? onSelectYear: ()=>{}}
      >
        { yearString(row, j, persianDate) }
      </td>
    )}
  </tr>
)
