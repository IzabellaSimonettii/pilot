import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardActions,
  CardTitle,
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
  Dropdown,
  Legend,
  Pagination,
  Popover,
  PopoverMenu,
} from 'former-kit'
import DownloadIcon from 'emblematic-icons/svg/Download32.svg'
import AddIcon from 'emblematic-icons/svg/Add32.svg'
import moment from 'moment'
import {
  contains,
  path,
} from 'ramda'
import reportStatusLegend from '../../models/reportStatusLegend'
import style from './style.css'

const items = [
  {
    title: 'PDF',
  },
  {
    title: 'Excel',
  },
  {
    title: 'csv',
  },
]

const options = [
  {
    name: '5 itens por página',
    value: 'five',
  },
  {
    name: '10 itens por página',
    value: 'ten',
  },
  {
    name: '50 itens por página',
    value: 'fifty',
  },
  {
    name: '100 itens por página',
    value: 'hundred',
  },
]

class ReportList extends Component {
  constructor (props) {
    super(props)
    const {
      currentPage,
      totalPages,
    } = props
    this.state = {
      expandedCard: [],
      // de onde vem o value?
      selected: 'ten',
      currentPage: currentPage || 1,
      totalPages: totalPages || 10,
    }

    this.handleClick = this.handleClick.bind(this)
    this.pageChanged = this.pageChanged.bind(this)
  }

  handleClick (id) {
    if (contains(id, this.state.expandedCard)) {
      this.setState({
        expandedCard: this.state.expandedCard.filter(cardId => cardId !== id),
      })
    } else {
      this.setState({
        expandedCard: [...this.state.expandedCard, id],
      })
    }
  }

  pageChanged (page) {
    this.setState({
      currentPage: page,
    })
  }

  render () {
    const { currentPage, totalPages } = this.state
    const { reports, disabled } = this.props
    const error = totalPages < currentPage || currentPage === 0

    return (
      <Card>
        <CardTitle
          title="Relatórios - Total de 75"
          subtitle={
            <div className={style.cardComponent}>
              <Button
                size="default"
                relevance="low"
                fill="outline"
                icon={<AddIcon width={12} height={12} />}
              >
                Novo Relatório
              </Button>
              <Dropdown
                name="dropdown"
                options={options}
                onChange={event => this.setState({ selected: event.target.value })}
                value={this.state.selected}
                placeholder="Itens por página"
                error=""
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={this.pageChanged}
                strings={this.props.strings}
                disabled={disabled}
              />
              {error &&
                <p>Epic fail!</p>
              }
            </div>
          }
        />
        {reports.reports.map(report => (
          <CardContent key={report.id}>
            <CardSection>
              <CardSectionDoubleLineTitle
                title={report.type}
                subtitle={`Período: ${moment(report.data.created_at).format('DD/MM/YYYY')} até ${moment(report.data.updated_at).format('DD/MM/YYYY')} | Criado: ${moment(report.created_at).format('DD/MM/YYYY')}`}
                collapsed={!contains(report.id, this.state.expandedCard)}
                icon={
                  <Legend
                    color={path([report.status, 'color'], reportStatusLegend)}
                    acronym={path([report.status, 'acronym'], reportStatusLegend)}
                    hideLabel
                  />
                }
                onClick={
                  () => this.handleClick(report.id)
                }
              />
              {contains(report.id, this.state.expandedCard) &&
                <div>
                  <CardContent>
                    Filtros
                    <p>Status: {path([report.status, 'text'], reportStatusLegend)}</p>
                  </CardContent>
                  <CardActions>
                    <Popover
                      placement="bottomEnd"
                      content={
                        <Fragment>
                          <div>
                            <strong>Exportar para:</strong>
                          </div>
                          <PopoverMenu items={items} />
                        </Fragment>
                      }
                    >
                      <Button
                        fill="outline"
                        icon={<DownloadIcon width={12} height={12} />}
                      >
                        Exportar
                      </Button>
                    </Popover>
                  </CardActions>
                </div>
              }
            </CardSection>
          </CardContent>
        ))}
      </Card>
    )
  }
}

ReportList.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.shape({
      company_id: PropTypes.string,
      created_at: PropTypes.instanceOf(moment),
      updated_at: PropTypes.instanceOf(moment),
    }).isRequired,
    object: PropTypes.string,
    id: PropTypes.string,
    status: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string,
    created_at: PropTypes.instanceOf(moment),
    updated_at: PropTypes.instanceOf(moment),
  })).isRequired,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  disabled: PropTypes.bool,
  strings: PropTypes.string,
}

ReportList.defaultProps = {
  currentPage: 1,
  totalPages: 10,
  disabled: false,
  strings: '',
}

export default ReportList
