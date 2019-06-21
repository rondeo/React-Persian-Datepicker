import React from 'react'
import { render } from 'react-dom'
import Datepicker from '../src'

window.React = React

class PersianDatepicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locale: 'fa',
      calendar: 'persian',
      format: "D MMMM YYYY"
    }

    this.changeCalendar = this.changeCalendar.bind(this)
    this.changeLocale = this.changeLocale.bind(this)
    this.changeFormat = this.changeFormat.bind(this)
  }

  changeCalendar(event) {
    this.setState({
      calendar: event.target.value
    })
  }

  changeLocale(event) {
    this.setState({
      locale: event.target.value
    })
  }

  changeFormat(event) {
    this.setState({
      format: event.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <div className="options">
          <div className="calendar">
            <h4>Calendar Type</h4>
            <div className="pretty p-default p-round">
              <input type="radio"
                name="type"
                value="persian"
                onChange={this.changeCalendar}
                checked={this.state.calendar === 'persian'}
              />
            <div className="state p-primary">
                <i className="icon mdi mdi-check"></i>
                <label>Jalali</label>
              </div>
            </div>

            <div className="pretty p-default p-round">
              <input type="radio"
                name="type"
                value="gregorian"
                onChange={this.changeCalendar}
                checked={this.state.calendar === 'gregorian'}
              />
            <div className="state p-primary">
                <label>Gregorian</label>
              </div>
            </div>
          </div>

          <div className="calendar">
            <h4>Locale</h4>
            <div className="pretty p-default p-round">
              <input type="radio"
                name="locale"
                value="fa"
                onChange={this.changeLocale}
                checked={this.state.locale === 'fa'}
              />
            <div className="state p-primary">
                <i className="icon mdi mdi-check"></i>
                <label>farsi</label>
              </div>
            </div>

            <div className="pretty p-default p-round">
              <input type="radio"
                name="locale"
                value="en"
                onChange={this.changeLocale}
                checked={this.state.locale === 'en'}
              />
            <div className="state p-primary">
                <label>english</label>
              </div>
            </div>
          </div>

          <div className="calendar">
            <h4>Format</h4>
            <div className="pretty p-default p-round">
              <input type="radio"
                name="format"
                value="D MMMM YYYY"
                onChange={this.changeFormat}
                checked={this.state.format === 'D MMMM YYYY'}
              />
            <div className="state p-primary">
                <i className="icon mdi mdi-check"></i>
                <label>21 June 2019</label>
              </div>
            </div>

            <div className="pretty p-default p-round">
              <input type="radio"
                name="format"
                value="MMM D, YY"
                onChange={this.changeFormat}
                checked={this.state.format === 'MMM D, YY'}
              />
            <div className="state p-primary">
                <label>Jun 21, 19</label>
              </div>
            </div>
          </div>

          {/*<div className="calendar">
            <h4>Theme</h4>
              <div className="pretty p-switch p-fill">
                <input type="checkbox" />
                <div className="state">
                  <label>Dark</label>
                </div>
              </div>
          </div>*/}

        </div>
        <div className="datepicker">
          <h4>Light Theme</h4>
          <Datepicker
            {...this.state} />
        </div>
        <div className="datepicker dark">
          <h4>Dark Theme</h4>
          <Datepicker
            {...this.state} />
        </div>
      </div>
    )
  }
}

render(
	<PersianDatepicker />,
  document.getElementById('container')
)
