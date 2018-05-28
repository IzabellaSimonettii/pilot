import React, { Fragment } from 'react'
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
import reportsModel from './reports.js'
import reportStatus from './reportStatus.js'
import reportStatusLegend from './reportStatusLegend.js'
import TrashIcon from 'emblematic-icons/svg/Trash32.svg'
import DownloadIcon from 'emblematic-icons/svg/Download32.svg'
import AddIcon from 'emblematic-icons/svg/Add32.svg'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
import {
  contains,
  path
} from 'ramda'
import style from './style.css'
import ReportList from '../../../src/containers/ReportList'

//variável para preencher o Popover
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

// variável para preencher o Dropdown
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

export default class ReportListState extends React.Component {
  constructor(props) {
    super(props)

    //Dropdown
    const { value } = this.props

    //Pagination
    const {
      currentPage,
      totalPages,
    } = props

    this.state = {
      expandedCard: [],
      selected: value,
      currentPage: currentPage || 1,
      totalPages: totalPages || 10,
    }

    this.handleClick = this.handleClick.bind(this)
    this.pageChanged = this.pageChanged.bind(this)
  }

  handleClick(id) {
    if (contains(id, this.state.expandedCard)) {
      this.setState({
        expandedCard: this.state.expandedCard.filter(cardId => cardId !== id)
      })
    } else {
      this.setState({
        expandedCard: [...this.state.expandedCard, id]
      })
    }
  }

  pageChanged(page) {
    this.setState({
      currentPage: page,
    })
  }

  render() {
    // const para Paginator
    const { currentPage, totalPages } = this.state
    const { disabled } = this.props
    const error = totalPages < currentPage || currentPage === 0

    return (
      <ReportList
        // esse reports é o reports do src/ReportList
        // reportsModel vem o meu import mockado
        reports={reportsModel}
      />
    )
  }
}