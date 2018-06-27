import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  contains,
  find,
  isNil,
} from 'ramda'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Col,
  Grid,
  Row,
  Tooltip,
} from 'former-kit'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import DetailsHead from '../../../components/DetailsHead'
import TotalDisplay from '../../../components/TotalDisplay'
import Form from './Form'
import formatAccountType from '../../../formatters/accountType'
import formatAgencyAccount from '../../../formatters/agencyAccount'
import formatCpfCnpj from '../../../formatters/cpfCnpj'
import formatCurrency from '../../../formatters/currency'

const renderInfo = (text, placement) => (
  <Tooltip
    placement={placement || 'rightStart'}
    content={text}
  >
    <IconInfo height={16} width={16} />
  </Tooltip>
)

const colors = {
  amount: '#37cc9a',
  cost: '#ff796f',
  requested: '#37cc9a',
}

const sameDate = (unavaiable, date) =>
  moment(date).diff(moment(unavaiable.date)) === 0

const isWeekend = date =>
  contains(date.weekday(), [0, 6])

const getInvalidDate = (start, unavaiableDates) => {
  const date = moment(start)
  if (isWeekend(date)) {
    return date
  }
  return find(sameDate, start, unavaiableDates)
}

const getInvalidDateMessage = (t, date) => {
  if (date.holiday) {
    return t('pages.anticipation.holiday', date.description)
  }
  return t('pages.anticipation.limited_financial_operation', date.description)
}

class AnticipationFormContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      dates: {
        end: props.date,
        start: props.date,
      },
      isAutomaticTransfer: true,
      period: props.period,
    }

    this.handleCalculateSubmit = this.handleCalculateSubmit.bind(this)
    this.validateDate = this.validateDate.bind(this)
    this.validateRequestedAmount = this.validateRequestedAmount.bind(this)
  }

  handleCalculateSubmit (values) {
    this.props.onCalculateSubmit(values)
  }

  validateDate ({ start }) {
    const {
      t,
      unavaiableDates,
    } = this.props
    const invalidDate = getInvalidDate(start, unavaiableDates)

    if (!isNil(invalidDate)) {
      return t('pages.anticipation.date_error', getInvalidDateMessage(t, invalidDate))
    }

    return false
  }

  validateRequestedAmount (value) {
    const {
      maximum,
      minimum,
      t,
    } = this.props
    const amount = Number(value)

    if (!amount) {
      return t('pages.anticipation.required_error')
    } else if (amount < minimum) {
      return t('pages.anticipation.minimum_error')
    } else if (amount > maximum) {
      return t('pages.anticipation.maximum_error')
    }

    return false
  }


  render () {
    const {
      amount,
      approximateRequested,
      bankAccount: {
        agencia,
        agencia_dv: agenciaDv,
        bank_code: bankCode,
        conta,
        conta_dv: contaDv,
        document_number: documentNumber,
        legal_name: legalName,
        type,
      },
      cost,
      loading,
      maximum,
      minimum,
      onCancel,
      onConfirm,
      requested,
      t,
      transferCost,
    } = this.props

    const {
      isAutomaticTransfer,
      period,
      dates,
    } = this.state

    const unit = t('currency_symbol')

    return (
      <Fragment>
        <Row>
          <Col
            desk={12}
            palm={12}
            tablet={12}
            tv={12}
          >
            <Card>
              <CardContent>
                <DetailsHead
                  identifier={legalName}
                  properties={[
                    {
                      children: bankCode,
                      title: t('models.bank_account.bank'),
                    },
                    {
                      children: formatAgencyAccount(agencia, agenciaDv),
                      title: t('models.bank_account.agency'),
                    },
                    {
                      children: formatAgencyAccount(conta, contaDv),
                      title: t('models.bank_account.account'),
                    },
                    {
                      children: formatAccountType(t, type),
                      title: t('models.bank_account.account_type'),
                    },
                    {
                      children: formatCpfCnpj(documentNumber),
                      title: t('models.bank_account.document'),
                    },
                  ]}
                  title={t('models.bank_account.legal_name')}
                />
              </CardContent>
            </Card>
          </Col>
        </Row>
        <Row stretch>
          <Col
            desk={8}
            palm={12}
            tablet={12}
            tv={8}
          >
            <Card>
              <Form
                anticipationInfo={renderInfo(t('pages.anticipation.date.advise'))}
                dates={dates}
                isAutomaticTransfer={isAutomaticTransfer}
                loading={loading}
                maximum={maximum}
                minimum={minimum}
                onSubmit={this.handleCalculateSubmit}
                period={period}
                periodInfo={renderInfo(t('pages.anticipation.period.advise'))}
                requested={requested}
                t={t}
                validation={{
                  date: this.validateDate,
                  requested: this.validateRequestedAmount,
                }}
              />
            </Card>
          </Col>
          <Col
            desk={4}
            palm={12}
            tablet={12}
            tv={4}
          >
            <Card>
              <CardContent>
                <Grid>
                  <Row>
                    <Col
                      align="end"
                      desk={12}
                      palm={12}
                      tablet={12}
                      tv={12}
                    >
                      <TotalDisplay
                        amount={approximateRequested}
                        color={colors.requested}
                        title={
                          <div>
                            {renderInfo(
                              t('pages.anticipation.requested.advise'),
                              'bottomStart'
                            )}
                            <span>{t('pages.anticipation.requested.title')}</span>
                          </div>
                        }
                        unit={unit}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      align="end"
                      desk={12}
                      palm={12}
                      tablet={12}
                      tv={12}
                    >
                      <TotalDisplay
                        amount={(cost + transferCost)}
                        color={colors.cost}
                        subtitle={
                          <span>
                            <div>
                              {t(
                                'pages.anticipation.cost.anticipation',
                                { cost: formatCurrency(cost) }
                              )}
                            </div>
                            <div>
                              {t(
                                'pages.anticipation.cost.transfer',
                                { cost: formatCurrency(transferCost) }
                              )}
                            </div>
                          </span>
                        }
                        title={
                          <div>
                            {renderInfo(
                              t('pages.anticipation.cost.advise'),
                              'bottomStart'
                            )}
                            <span>{t('pages.anticipation.cost.title')}</span>
                          </div>
                        }
                        unit={unit}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      align="end"
                      desk={12}
                      palm={12}
                      tablet={12}
                      tv={12}
                    >
                      <TotalDisplay
                        amount={amount}
                        color={colors.amount}
                        title={
                          <div>
                            {renderInfo(
                              t('pages.anticipation.amount.advise'),
                              'bottomStart'
                            )}
                            <span>{t('pages.anticipation.amount.title')}</span>
                          </div>
                        }
                        unit={unit}
                      />
                    </Col>
                  </Row>
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  disabled={loading}
                  fill="outline"
                  onClick={onCancel}
                  type="button"
                >
                  {t('pages.anticipation.cancel')}
                </Button>
                <Button
                  disabled={loading}
                  onClick={onConfirm}
                  type="button"
                >
                  {t('pages.anticipation.continue')}
                </Button>
              </CardActions>
            </Card>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

AnticipationFormContainer.propTypes = {
  amount: PropTypes.number.isRequired,
  approximateRequested: PropTypes.number.isRequired,
  bankAccount: PropTypes.shape({
    agencia_dv: PropTypes.string,
    agencia: PropTypes.string,
    bank_code: PropTypes.string,
    conta_dv: PropTypes.string,
    conta: PropTypes.string,
    document_number: PropTypes.string,
    document_type: PropTypes.string,
    legal_name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  cost: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(moment),
  loading: PropTypes.bool.isRequired,
  maximum: PropTypes.number.isRequired,
  minimum: PropTypes.number.isRequired,
  onCalculateSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  period: PropTypes.oneOf(['end', 'start']),
  requested: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  transferCost: PropTypes.number.isRequired,
  unavaiableDates: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.instanceOf(moment),
    description: PropTypes.string,
    holiday: PropTypes.bool,
    limited_financial_operation: PropTypes.bool,
  })).isRequired,
}

AnticipationFormContainer.defaultProps = {
  date: moment(),
  period: 'start',
}

export default AnticipationFormContainer
