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

function PhysicPerson () {
  return (
    <div>
      <br />
      <CardTitle
        title="Recebedor"
        subtitle="Preencha abaxio as informações sobre o seu recebedor"
      />
      <CardContent>
        <FormInput
          size={30}
          maxLength={12}
          inputStyle="form"
          type="text"
          label="Nome"
        />
        <FormInput
          size={30}
          maxLength={12}
          inputStyle="form"
          type="text"
          label="E-mail(Opcional)"
        />
        <FormInput
          size={30}
          maxLength={12}
          inputStyle="form"
          type="text"
          label="URL(Opcional)"
        />
        <FormInput
          size={30}
          maxLength={12}
          inputStyle="form"
          type="text"
          label="Telefone(Opcional)"
        />
      </CardContent>
    </div>
  )
}

class RecipientStep extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 'physic',
      checked: props.checked,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleChange (event) {
    this.setState({
      value: event.target.value,
    })
  }

  handleCheck () {
    this.setState({
      checked: !this.state.checked,
    })
  }

  render () {
    const {
      disabled,
      error,
      name,
    } = this.props

    const {
      value,
      checked,
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
                size={30}
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
                error={error}
                disabled={disabled}
                checked={checked}
                onChange={this.handleCheck}
              />
            </Fragment>
          </CardContent>
          <br />
          {checked && value === 'physic' &&
            <PhysicPerson />}
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
  checked: PropTypes.bool,
}

RecipientStep.defaultProps = {
  name: '',
  disabled: false,
  error: '',
  checked: false,
}

export default RecipientStep
