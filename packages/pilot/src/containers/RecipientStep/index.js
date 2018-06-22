import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardTitle,
  CardContent,
  CardActions,
  RadioGroup,
  FormInput,
  FormCheckbox,
} from 'former-kit'

const options = [
  {
    name: 'Pessoa Física',
    value: 'physic',
  },
  {
    name: 'Pessoa Jurídica',
    value: 'legal',
  },
]

class RecipientStep extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 'physic',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({
      value: event.target.value,
    })
  }

  render () {
    const {
      disabled,
      error,
      name,
      // size,
    } = this.props

    const {
      value,
    } = this.state

    return (
      <div>
        <Card>
          <CardTitle
            title="Identificação"
            subtitle="Escolha qual tipo de pessoa do seu recebedor e preencha o documento"
          />
          <CardContent>
            <Fragment>
              <RadioGroup
                options={options}
                name={name}
                onChange={this.handleChange}
                value={value}
                disabled={disabled}
                error={error}
              />
              {/* <p>Teste: {value}</p> */}
              <FormInput
                maxLength={12}
                inputStyle="form"
                type="text"
                label="CNPJ"
              />
              <br />
              <br />
              <FormCheckbox
                label="Quero incluir informações sobre a empresa e os sócios"
                name="info"
              />
            </Fragment>
          </CardContent>
          <CardActions>
            <Button fill="outline">Cancelar</Button>
            <Button fill="gradient">Continuar</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

RecipientStep.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  // size: PropTypes.number,
}

RecipientStep.defaultProps = {
  name: '',
  disabled: false,
  error: '',
  // size: 30,
}

export default RecipientStep
