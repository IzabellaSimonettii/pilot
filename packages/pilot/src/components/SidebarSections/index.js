import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'former-kit'

import style from './style.css'

class SidebarSections extends React.PureComponent {
  render () {
    const {
      sections,
    } = this.props

    return (
      <div className={style.sections}>
        <ul>
          {sections.map(section => (
            <li key={`${section.title}`}>
              <span className={style.title}>{section.title}</span>
              <div className={style.value}>{section.value}</div>
              {section.actionTitle &&
                <Button
                  onClick={section.action}
                  size="tiny"
                >
                  {section.actionTitle}
                </Button>
              }
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

SidebarSections.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func,
    actionTitle: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.element,
  })).isRequired,
}

export default SidebarSections
