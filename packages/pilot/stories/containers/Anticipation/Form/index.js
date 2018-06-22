import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
import AnticipationForm from '../../../../src/containers/Anticipation/Form'
import Section from '../../../Section'

const defaultState = {
  amount: 1269633,
  approximateRequested: 1270000,
  bank_account: {
    agencia: '0932',
    agencia_dv: '5',
    bank_code: '341',
    charge_transfer_fees: true,
    conta: '58054',
    conta_dv: '1',
    date_created: '2017-01-06T18:52:22.215Z',
    document_number: '26268738888',
    document_type: 'cpf',
    id: 17365090,
    legal_name: 'API BANK ACCOUNT',
    object: 'bank_account',
    type: 'conta_corrente',
  },
  cost: 300,
  date: moment(),
  max: 2000000,
  min: 10000,
  period: 'end',
  requested: 0,
  transferCost: 67,
}

const getRandomInt = (min, max) => {
  const ceil = Math.ceil(min)
  const floor = Math.floor(max)
  return Math.floor(Math.random() * (floor - ceil)) + ceil
}

class AnticipationFormState extends Component {
  constructor () {
    super()

    this.state = defaultState
    this.handleCalculate = this.handleCalculate.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  handleCalculate ({
    requested,
    date,
    period,
  }) {
    const {
      cost,
      max,
      transferCost,
    } = this.state
    const approximateRequested = getRandomInt(requested, max)
    this.setState({
      amount: (approximateRequested - (cost + transferCost)),
      approximateRequested,
      date,
      period,
      requested,
    })

    action('calculate')({
      requested,
      period,
      date,
    })
  }

  handleCancel () {
    action('cancel')()
    this.setState(defaultState)
  }

  handleConfirm () {
    action('confirm')(this.state)
  }

  render () {
    const {
      amount,
      approximateRequested,
      bank_account, // eslint-disable-line camelcase
      cost,
      date,
      max,
      min,
      period,
      requested,
      transferCost,
    } = this.state

    return (
      <Section>
        <AnticipationForm
          amount={amount}
          approximateRequested={approximateRequested}
          bankAccount={bank_account} // eslint-disable-line camelcase
          cost={cost}
          date={date}
          loading={false}
          maximum={max}
          minimum={min}
          period={period}
          onCalculateSubmit={this.handleCalculate}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          requested={requested}
          t={t => t}
          transferCost={transferCost}
        />
      </Section>
    )
  }
}

export default AnticipationFormState
