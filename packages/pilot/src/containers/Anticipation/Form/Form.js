import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Form from 'react-vanilla-form'
import {
  Button,
  Card,
  CardContent,
  Col,
  DateInput,
  FormInput,
  Grid,
  RadioGroup,
  Row,
  SegmentedSwitch,
} from 'former-kit'
import Calendar32 from 'emblematic-icons/svg/Calendar32.svg'
import CurrencyInput from '../../../components/CurrencyInput'
import formatCurrency from '../../../formatters/currency'
import translateDateInput from '../../../formatters/dateInputTranslator'
import style from './style.css'

const AnticipationForm = ({
  anticipationInfo,
  date,
  isAutomaticTransfer,
  loading,
  maximum,
  minimum,
  onSubmit,
  period,
  periodInfo,
  requested,
  t,
  validation,
}) => (
  <Form
    data={{
      date,
      period,
      requested: requested.toString(),
      transfer: isAutomaticTransfer ? 'automatic' : 'manual',
    }}
    validateOn="blur"
    validation={validation}
    onSubmit={onSubmit}
  >
    <Card>
      <CardContent>
        <Grid>
          <Row>
            <Col>
              <div>
                <div>
                  {t('pages.anticipation.period.title')}
                  {periodInfo}
                </div>
                <SegmentedSwitch
                  name="period"
                  options={[
                    {
                      title: t('pages.anticipation.start'),
                      value: 'start',
                    },
                    {
                      title: t('pages.anticipation.end'),
                      value: 'end',
                    },
                  ]}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div>
                {t('pages.anticipation.date.label')}
                {anticipationInfo}
              </div>
              <DateInput
                icon={<Calendar32 width={16} height={16} />}
                name="date"
                strings={translateDateInput(t)}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <FormInput
                label={t(
                  'pages.anticipation.requested.label',
                  { currency: t('currency_symbol') }
                )}
                name="requested"
                disabled={loading}
                renderer={props => (
                  <CurrencyInput
                    max={maximum}
                    {...props}
                  />
                )}
              />
            </Col>
            <Col>
              <div>{t('pages.anticipation.avaiable.title')}</div>
              <div>
                <span>{t('pages.anticipation.avaiable.max')}</span>
                <strong className={style.avaiable}>
                  {formatCurrency(maximum)}
                </strong>
                <span>{t('pages.anticipation.avaiable.min')}</span>
                <strong className={style.avaiable}>
                  {formatCurrency(minimum)}
                </strong>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div>{t('pages.anticipation.requested.label')}</div>
              <RadioGroup
                name="transfer"
                options={[
                  {
                    name: t('pages.anticipation.yes'),
                    value: 'automatic',
                  },
                  {
                    name: t('pages.anticipation.no'),
                    value: 'manual',
                  },
                ]}
                value={isAutomaticTransfer ? 'automatic' : 'manual'}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                fill="outline"
                type="submit"
              >
                {t('pages.anticipation.simulate')}
              </Button>
              <p>{t('pages.anticipation.advise')}</p>
            </Col>
          </Row>

        </Grid>
      </CardContent>
    </Card>
  </Form>
)

AnticipationForm.propTypes = {
  anticipationInfo: PropTypes.element.isRequired,
  date: PropTypes.instanceOf(moment).isRequired,
  isAutomaticTransfer: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  maximum: PropTypes.number.isRequired,
  minimum: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  period: PropTypes.oneOf(['end', 'start']).isRequired,
  periodInfo: PropTypes.element.isRequired,
  requested: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  validation: PropTypes.shape({
    date: PropTypes.func,
    requested: PropTypes.func,
  }).isRequired,
}

export default AnticipationForm
