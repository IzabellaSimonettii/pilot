import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import style from './style.css'

const SidebarSummary = ({
  title,
  subtitle,
  children,
  onClick,
  active,
  collapsed,
}) => (
  <div
    className={classNames(style.summary, {
      [style.active]: active,
    })}
  >
    <button
      className={style.title}
      onClick={onClick}
      role="link"
    >
      {!collapsed && title}

      {subtitle &&
        <span className={style.subtitle}>
          {subtitle}
        </span>
      }
    </button>

    {active && children}
  </div>
)

SidebarSummary.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  collapsed: PropTypes.bool,
  onClick: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
}

SidebarSummary.defaultProps = {
  active: false,
  children: null,
  collapsed: false,
  onClick: null,
  subtitle: '',
}

export default SidebarSummary
