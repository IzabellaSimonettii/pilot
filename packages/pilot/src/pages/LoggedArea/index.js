import React from 'react'
import PropTypes from 'prop-types'
import {
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { compose, pathOr } from 'ramda'
import { Layout } from 'former-kit'
import env from '../../environment'

import Sidebar from './Sidebar'
import Header from './Header'

import routes from './routes'

const getRecipientId = pathOr(null, ['account', 'company', 'default_recipient_id', env])
const getBalance = pathOr(null, ['account', 'balance'])
const getCompanyName = pathOr(null, ['account', 'company', 'name'])

const mapStateToProps = state => ({
  balance: getBalance(state),
  company: getCompanyName(state),
  recipientId: getRecipientId(state),
})

const enhanced = compose(
  translate(),
  withRouter,
  connect(mapStateToProps)
)

const LoggedArea = ({
  balance,
  company,
  recipientId,
  t,
}) => (
  <Layout
    sidebar={
      <Sidebar
        company={company}
        balance={balance}
        recipientId={recipientId}
        t={t}
      />
    }
    header={<Header t={t} />}
  >
    <Switch>
      {Object.values(routes).map(({ component, path }) => (
        <Route
          key={path}
          path={path}
          component={component}
        />
      ))}
      <Redirect to={routes.transactions.path} />
    </Switch>
  </Layout>
)

LoggedArea.propTypes = {
  balance: PropTypes.shape({
    available: PropTypes.number.isRequired,
    waitingFunds: PropTypes.number.isRequired,
  }).isRequired,
  company: PropTypes.string.isRequired,
  recipientId: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(LoggedArea)
