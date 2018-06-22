import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardTitle,
  CardContent,
  CardActions,
  RadioGroup,
} from 'former-kit'

const options = [
  {
    name: 'Pessoa Física',
    value: 'physic',
  },
  {
    name: 'PEssoa Jurídica',
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
    // const {
    //   disabled,
    //   error,
    //   name,
    // } = this.props

    const {
      value,
    } = this.state

    return (
      <div>
        <Card>
          <CardTitle
            title="Identificação"
          />
          <CardContent>
            <p>Lorem ipsum dolor sit amet, consectetur</p>
            <div>
              <RadioGroup
                options={options}
                // name={name}
                onChange={this.handleChange}
                value={value}
                // disabled={disabled}
                // error={error}
              />
              <p>Selected: {value}</p>
            </div>
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

export default RecipientStep
