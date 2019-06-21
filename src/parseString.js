import PersianDate from './PersianDate'
export default (input, persianDate, format) => {
  const isPersian = persianDate.formatNumber()
  const tokens = /([[^[]*])|(\\)?(Mo|MM?M?M?|Do|DD?D?D?|dddddd?|ddddd?|dddd?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?|X|LT|ll?l?l?|LL?L?L?)/g
  var format = format || 'YYYY-MM-DD'
  var pattern = format.replace(tokens, replaceFunction)
  pattern = new RegExp(pattern, 'gi')
  const params = pattern.exec(input)
  var output = {}
  if (params) {
    format = format.match(tokens)
    for (var i = 0; i < format.length; i++) {
      output = {
        ...output,
        ...parse(toLatinNumber(params[i + 1]) ,format[i])
      }
    }
    PersianDate.calendarType = persianDate.calendarType
    PersianDate.localeType = persianDate.localeType
    return new PersianDate([output.year, output.month, output.date])
  } else {
    return
  }


  function digit(min, max) {
    return `([۰-۹]{${min}${max? ',' + max: ''}}|\\d{${min}${max? ',' + max: ''}})`
  }

  function toLatinNumber(string) {
    const enZero = '0'.charCodeAt(0)
    const faZero = '۰'.charCodeAt(0)
    return string.replace(/[۰-۹]/g, c =>
        String.fromCharCode(c.charCodeAt(0) - faZero + enZero))
}

  function replaceFunction(token) {
      switch (token) {
          // AM/PM
          case ('a'): {
              if (isPersian)
                  return '(ق ظ|ب ظ)'
              else
                  return '(AM|PM)'
          }
          // Hours (Int)
          case ('H'): {
              return digit(1,2)
          }
          case ('HH'): {
              return digit(2)
          }
          case ('h'): {
              return digit(1,2)
          }
          case ('hh'): {
              return digit(2)
          }
          // Minutes
          case ('m'): {
              return digit(1,2)
          }
          // Two Digit Minutes
          case ('mm'): {
              return digit(2)
          }
          // Second
          case ('s'): {
              return digit(1,2)
          }
          case ('ss'): {
              return digit(2)
          }
          // Day (Int)
          case ('D'): {
              return digit(1,2)
          }
          // Return Two Digit
          case ('DD'): {
              return digit(2)
          }
          // Return day Of Year
          case ('DDD'): {
              return digit(1,3)
          }

          // Return day Of week
          case ('d'): {
              return digit(1)
          }
          // Return week day name abbr
          case ('ddd'): {
              return `(${persianDate.rangeName().weekdaysMin.join('|')})`
          }
          case ('dddd'): {
              return `(${persianDate.rangeName().weekdays.join('|')})`
          }
          // Return Persian Day Name
          case ('ddddd'): {
              return `(${persianDate.rangeName().persianDaysName.join('|')})`
          }
          case ('w'): {
              return digit(1,2)
          }
          // Return Persian Day Name
          case ('ww'): {
              return digit(2)
          }
          // Month  (Int)
          case ('M'): {
              return digit(1,2)
          }
          // Two Digit Month (Str)
          case ('MM'): {
              return digit(2)
          }
          // Abbr String of Month (Str)
          case ('MMM'): {
              return `(${persianDate.rangeName().monthsShort.join('|')})`
          }
          // Full String name of Month (Str)
          case ('MMMM'): {
              return `(${persianDate.rangeName().months.join('|')})`
          }
          // Year
          // Two Digit Year (Str)
          case ('YY'): {
              return digit(2)
          }
          // Full Year (Int)
          case ('YYYY'): {
              return digit(4)
          }
          // 8:30 PM
          case ('LT'): {
              return `(${digit(1,2)}:${digit(1,2)}(ق ظ|ب ظ|AM|PM))`
          }
          // 09/04/1986
          case ('L'): {
              return '(YYYY/MM/DD)'
          }
          // 9/4/1986
          case ('l'): {
              return '(YYYY/M/D)'
          }
          // September 4th 1986
          case ('LL'): {
              return `((${persianDate.rangeName().months.join('|')}) ${digit(2)} ${digit(4)})`
          }
          // Sep 4 1986
          case ('ll'): {
              return `((${persianDate.rangeName().monthsShort.join('|')}) ${digit(2)} ${digit(4)})`
          }
          //September 4th 1986 8:30 PM
          case ('LLL'): {
            return `((${persianDate.rangeName().months.join('|')}) ${digit(4)} ${digit(2)}   ${digit(1,2)}:${digit(1,2)}  (ق ظ|ب ظ|AM|PM))`
          }
          // Sep 4 1986 8:30 PM
          case ('lll'): {
            return `((${persianDate.rangeName().monthsShort.join('|')}) ${digit(4)} ${digit(2)}   ${digit(1,2)}:${digit(1,2)}  (ق ظ|ب ظ|AM|PM))`
          }
          //Thursday, September 4th 1986 8:30 PM
          case ('LLLL'): {
            return `((${persianDate.rangeName().weekdays.join('|')}) ${digit(1,2)} (${persianDate.rangeName().months.join('|')}) ${digit(4)}  ${digit(1,2)}:${digit(1,2)}  (ق ظ|ب ظ|AM|PM))`
          }
          // Thu, Sep 4 1986 8:30 PM
          case ('llll'): {
            return `((${persianDate.rangeName().weekdaysMin.join('|')}) ${digit(1,2)} ((${persianDate.rangeName().monthsShort.join('|')})) ${digit(4)}  ${digit(1,2)}:${digit(1,2)}  (ق ظ|ب ظ|AM|PM))`
          }
      }
  }

  function parse(value, token) {
    switch (token) {
        case ('a'): return {a: parseInt(value)}
        case ('H'): return {hour: parseInt(value)}
        case ('HH'): return {hour: parseInt(value)}
        case ('h'): return {hourA: parseInt(value)}
        case ('hh'): return {hourA: parseInt(value)}
        case ('m'): return {minute: parseInt(value)}
        case ('mm'): return {minute: parseInt(value)}
        case ('s'): return {second: parseInt(value)}
        case ('ss'): return {second: parseInt(value)}
        case ('D'): return {date: parseInt(value)}
        case ('DD'): return {date: parseInt(value)}
        case ('DDD'): return {dayYear: parseInt(value)}
        case ('d'): return {day: parseInt(value)}
        case ('ddd'): return {day: persianDate.rangeName().weekdaysMin.indexOf(value) + 1}
        case ('dddd'): return {day: persianDate.rangeName().weekdays.indexOf(value) + 1}
        case ('ddddd'): return {date: persianDate.rangeName().persianDaysName.indexOf(value) + 1}
        case ('w'): return {weak: parseInt(value)}
        case ('ww'): return {weak: parseInt(value)}
        case ('M'): return {month: parseInt(value)}
        case ('MM'): return {month: parseInt(value)}
        case ('MMM'): return {month: persianDate.rangeName().monthsShort.indexOf(value) + 1}
        case ('MMMM'): return {month: persianDate.rangeName().months.indexOf(value) + 1}
        case ('YY'): return {year: parseInt(value)}
        case ('YYYY'): return {year: parseInt(value)}
        case ('LT'): {
            return `(${digit(1,2)}:${digit(1,2)}(ق ظ|ب ظ|AM|PM))`
        }
        case ('L'): {
            return '(YYYY/MM/DD)'
        }
        case ('l'): {
            return '(YYYY/M/D)'
        }
        case ('LL'): {
            return `((${persianDate.rangeName().months.join('|')}) ${digit(2)} ${digit(4)})`
        }
        case ('ll'): {
            return `((${persianDate.rangeName().monthsShort.join('|')}) ${digit(2)} ${digit(4)})`
        }
        case ('LLL'): {
          return `((${persianDate.rangeName().months.join('|')}) ${digit(4)} ${digit(2)}   ${digit(1,2)}:${digit(1,2)}  (ق ظ|ب ظ|AM|PM))`
        }
        case ('lll'): {
          return `((${persianDate.rangeName().monthsShort.join('|')}) ${digit(4)} ${digit(2)}   ${digit(1,2)}:${digit(1,2)}  (ق ظ|ب ظ|AM|PM))`
        }
        case ('LLLL'): {
          return `((${persianDate.rangeName().weekdays.join('|')}) ${digit(1,2)} (${persianDate.rangeName().months.join('|')}) ${digit(4)}  ${digit(1,2)}:${digit(1,2)}  (ق ظ|ب ظ|AM|PM))`
        }
        case ('llll'): {
          return `((${persianDate.rangeName().weekdaysMin.join('|')}) ${digit(1,2)} ((${persianDate.rangeName().monthsShort.join('|')})) ${digit(4)}  ${digit(1,2)}:${digit(1,2)}  (ق ظ|ب ظ|AM|PM))`
        }
    }
  }
}
