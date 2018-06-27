import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import style from './style.css'

const SidebarSummary = ({
  children,
  collapsed,
  onClick,
  subtitle,
  title,
}) => (
  <div
    className={classNames(style.summary, {
      [style.active]: !collapsed,
    })}
  >
    <button
      className={style.title}
      onClick={onClick}
      role="link"
    >
      {title}

      {subtitle &&
        <span className={style.subtitle}>
          {subtitle}
        </span>
      }
    </button>

    {!collapsed
      && children
    }
  </div>
)

SidebarSummary.propTypes = {
  children: PropTypes.node,
  collapsed: PropTypes.bool,
  onClick: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
}

SidebarSummary.defaultProps = {
  children: null,
  collapsed: true,
  onClick: null,
  subtitle: '',
}

export default SidebarSummary
