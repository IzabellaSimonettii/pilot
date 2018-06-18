import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import qs from 'qs'
import {
  append,
  applySpec,
  compose,
  contains,
  defaultTo,
  either,
  identity,
  isEmpty,
  isNil,
  juxt,
  mergeAll,
  nth,
  path,
  pipe,
  tail,
  without,
  when,
} from 'ramda'
import {
  requestSearch,
  receiveSearch,
} from './actions'
import { requestLogout } from '../../Account/actions'

import dateSelectorPresets from '../../../models/dateSelectorPresets'
import filterOptions from '../../../models/transactionFilterOptions'
import RecipientsList from '../../../containers/RecipientsList'

const mapStateToProps = ({
  account: { client },
  recipients: { loading, query },
}) => ({ client, loading, query })

const mapDispatchToProps = dispatch => ({
  onRequestSearch: (query) => {
    dispatch(requestSearch(query))
  },

  onReceiveSearch: ({ query }) => {
    dispatch(receiveSearch({ query }))
  },
  onRequestSearchFail: (error) => {
    dispatch(requestLogout(error))
  },
})

const enhanced = compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)

const normalizeTo = (defaultValue, propPath) => pipe(
  path(propPath),
  when(
    either(isNil, isEmpty),
    defaultTo(defaultValue)
  )
)

const normalizeQueryStructure = applySpec({
  search: normalizeTo('', ['search']),
  offset: pipe(
    normalizeTo(1, ['offset']),
    Number
  ),
  count: pipe(
    normalizeTo(15, ['count']),
    Number
  ),
  sort: {
    order: normalizeTo('descending', ['sort', 'order']),
    field: normalizeTo(['created_at'], ['sort', 'field']),
  },
})

const parseQueryUrl = pipe(
  tail,
  qs.parse,
  juxt([
    identity,
    normalizeQueryStructure,
  ]),
  mergeAll
)


class RecipientsSearch extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      result: {
        total: {},
        list: {
          rows: [],
        },
        chart: {
          dataset: [],
        },
      },
      expandedRows: [],
      selectedRows: [],
    }

    this.handleExpandRow = this.handleExpandRow.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handlePageCountChange = this.handlePageCountChange.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
    this.handleRowDetailsClick = this.handleRowDetailsClick.bind(this)
    this.handleSelectRow = this.handleSelectRow.bind(this)
    this.handleViewModeChange = this.handleViewModeChange.bind(this)

    this.requestData = this.requestData.bind(this)
  }

  componentDidMount () {
    const urlSearchQuery = this.props.history.location.search
    if (isEmpty(urlSearchQuery)) {
      this.updateQuery(this.props.query)
    } else {
      this.requestData(parseQueryUrl(urlSearchQuery))
    }
  }

  componentWillReceiveProps (nextProps) {
    const { location: { search } } = this.props // eslint-disable-line
    const { location } = nextProps

    if (search !== location.search) {
      this.requestData(parseQueryUrl(location.search))
    }
  }

  updateQuery (query) {
    this.setState({
      expandedRows: [],
      selectedRows: [],
    })

    const buildSearchQuery = pipe(
      qs.stringify
    )

    this.props.history.push({
      pathname: 'recipients',
      search: buildSearchQuery(query),
    })
  }

  requestData (query) {
    this.props.onRequestSearch({ query })
    const searchQuery = {}
    let key = 'name'

    const isRecipientId = (recipientText) => {
      const recipientPattern = /^(re_)(\w){25}/
      return recipientPattern.test(recipientText)
    }

    const isBanckAccount = (bankAccount) => {
      const bankNumber = Number.parseInt(bankAccount, 10)
      return Number.isInteger(bankNumber)
    }

    if (query && query.search) {
      if (isRecipientId(query.search)) {
        key = 'id'
      } else if (isBanckAccount(query.search)) {
        key = 'bank_account_id'
      }

      searchQuery[key] = query.search
    }

    return this.props.client
      .recipients
      .find(searchQuery)
      .then((res) => {
        this.setState(res)
        this.props.onReceiveSearch({
          rows: res,
          query,
        })
      })
      .catch((error) => {
        this.props.onRequestSearchFail(error)
      })
  }

  handlePageCountChange (count) {
    const query = {
      ...this.props.query,
      offset: 1,
      count,
    }

    this.updateQuery(query)
  }

  handleOrderChange (field, order) {
    const query = {
      ...this.props.query,
      sort: {
        field,
        order: order === 'ascending' ? 'descending' : 'ascending',
      },
      offset: 1,
    }

    this.updateQuery(query)
  }

  handleFilterChange (filters) {
    const {
      search,
    } = filters

    const query = {
      ...this.props.query,
      search,
      offset: 1,
    }

    this.updateQuery(query)
  }

  handlePageChange (page) {
    const query = {
      ...this.props.query,
      offset: page,
    }

    this.updateQuery(query)
  }

  handleRowDetailsClick (rowIndex) {
    const { history } = this.props
    const rowData = nth(rowIndex, this.state.result.list.rows)
    const { id } = rowData
    history.push(`/recipients/${id}`)
  }

  handleRowClick (index) {
    const { expandedRows } = this.state
    this.setState({
      expandedRows: contains(index, expandedRows)
        ? without([index], expandedRows)
        : append(index, expandedRows),
    })
  }

  handleViewModeChange (viewMode) {
    this.setState({
      viewMode,
    })
  }

  handleExpandRow (expandedRows) {
    this.setState({
      expandedRows,
    })
  }

  handleSelectRow (selectedRows) {
    this.setState({
      selectedRows,
    })
  }

  render () {
    const {
      collapsed,
      columns,
      expandedRows,
      result: {
        total,
        list,
        chart,
      },
      selectedRows,
      viewMode,
    } = this.state

    const {
      loading,
      query,
      t,
    } = this.props

    return (
      <RecipientsList
        amount={total.payment ? total.payment.paid_amount : 0}
        collapsed={collapsed}
        columns={columns}
        count={total.count}
        data={chart.dataset}
        dateSelectorPresets={dateSelectorPresets}
        expandedRows={expandedRows}
        filterOptions={filterOptions}
        loading={loading}
        onChangeViewMode={this.handleViewModeChange}
        onChartsCollapse={this.handleChartsCollapse}
        onDetailsClick={this.handleRowDetailsClick}
        onExpandRow={this.handleExpandRow}
        onFilterChange={this.handleFilterChange}
        onOrderChange={this.handleOrderChange}
        onPageChange={this.handlePageChange}
        onPageCountChange={this.handlePageCountChange}
        onRowClick={this.handleRowClick}
        onSelectRow={this.handleSelectRow}
        rows={list.rows}
        selectedRows={selectedRows}
        query={query}
        viewMode={viewMode}
        t={t}
      />
    )
  }
}

RecipientsSearch.propTypes = {
  client: PropTypes.shape({
    recipients: PropTypes.shape({
      find: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  onReceiveSearch: PropTypes.func.isRequired,
  onRequestSearch: PropTypes.func.isRequired,
  onRequestSearchFail: PropTypes.func.isRequired,
  query: PropTypes.shape({
    search: PropTypes.string,
    offset: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    sort: PropTypes.shape({
      field: PropTypes.arrayOf(PropTypes.string),
      order: PropTypes.string,
    }),
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(RecipientsSearch)
