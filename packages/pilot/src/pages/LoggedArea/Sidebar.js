import React from 'react'
import PropTypes from 'prop-types'
import {
  head,
  pipe,
  split,
  values,
} from 'ramda'

import { withRouter } from 'react-router-dom'

import SidebarContainer from '../../containers/Sidebar'

import routes from './routes'

import Logo from '../logo.svg'

const removeRouteParams = pipe(
  split(':'),
  head
)

const Sidebar = ({
  balance,
  company,
  recipientId,
  location: { pathname },
  history,
  t,
}) => (
  <SidebarContainer
    logo={Logo}
    balance={balance}
    company={company}
    links={values(routes)
      .filter(({ hidden }) => !hidden)
      .map(route => ({
        ...route,
        active: pathname.includes(removeRouteParams(route.path)),
      }))
    }
    onLinkClick={history.push}
    onWithdraw={() => history.push(`/withdraw/${recipientId}`)}
    onAnticipate={() => history.push(`/anticipation/${recipientId}`)}
    t={t}
  />
)

Sidebar.propTypes = {
  balance: PropTypes.shape({
    available: PropTypes.number.isRequired,
    waitingFunds: PropTypes.number.isRequired,
  }).isRequired,
  company: PropTypes.string.isRequired,
  recipientId: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default withRouter(Sidebar)
