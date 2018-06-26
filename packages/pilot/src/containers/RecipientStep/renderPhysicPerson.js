import React from 'react'
import PropTypes from 'prop-types'
import {
  CardContent,
  Col,
  Grid,
  FormInput,
  Row,
} from 'former-kit'

const PhysicPerson = ({
  inputName,
  inputEmail,
  inputUrl,
  inputPhone,
  onChangeName,
  onChangeEmail,
  onChangeUrl,
  onChangePhone,
  // inputname traz o valor e onchnagename muda
  // props
}) => (
  <CardContent>
    <h2>Recebedor</h2>
    <h3>
      Preencha abaixo as informações sobre o seu recebedor
    </h3>
    <Grid>
      <Row>
        <Col>
          <FormInput
            size={30}
            maxLength={30}
            inputStyle="form"
            type="text"
            label="Nome"
            name="name"
            value={inputName}
            onChange={onChangeName}
          />
        </Col>
      </Row>
    </Grid>
    <br />
    <Row stretch>
      <Col
        desk={2}
        palm={2}
        tablet={2}
        tv={2}
      >
        <FormInput
          size={30}
          maxLength={30}
          inputStyle="form"
          type="text"
          label="E-mail(Opcional)"
          value={inputEmail}
          onChange={onChangeEmail}
        />
      </Col>
      <Col
        desk={2}
        palm={2}
        tablet={2}
        tv={2}
      >
        <FormInput
          size={30}
          maxLength={12}
          inputStyle="form"
          type="text"
          label="URL(Opcional)"
          value={inputUrl}
          onChange={onChangeUrl}
        />
      </Col>
      <Col
        desk={1}
        palm={1}
        tablet={1}
        tv={1}
      >
        <FormInput
          size={30}
          maxLength={30}
          inputStyle="form"
          type="text"
          label="Telefone(Opcional)"
          value={inputPhone}
          onChange={onChangePhone}
        />
      </Col>
    </Row>
  </CardContent>
)

PhysicPerson.propTypes = {
  inputName: PropTypes.string,
  inputEmail: PropTypes.string,
  inputUrl: PropTypes.string,
  inputPhone: PropTypes.string,
  onChangeName: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangeUrl: PropTypes.func,
  onChangePhone: PropTypes.func,

  // typeNumber: PropTypes.number,
}

PhysicPerson.defaultProps = {
  inputName: '',
  inputEmail: '',
  inputUrl: '',
  inputPhone: '',
  onChangeName: onChangeName => onChangeName,
  onChangeEmail: onChangeEmail => onChangeEmail,
  onChangeUrl: onChangeUrl => onChangeUrl,
  onChangePhone: onChangePhone => onChangePhone,
  // typeNumber: number,
}

export default PhysicPerson
