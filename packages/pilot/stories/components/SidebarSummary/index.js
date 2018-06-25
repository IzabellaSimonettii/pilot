import React from 'react'

import Section from '../../Section'
import SidebarSections from '../../../src/components/SidebarSections'
import SidebarSummary from '../../../src/components/SidebarSummary'

const sections = {
  data: [
    {
      action: () => {},
      actionTitle: 'Sacar',
      title: 'Disponível',
      value: <span><small>R$</small> 15.000,00</span>,
    },
    {
      action: () => {},
      actionTitle: 'Antecipar',
      title: 'A receber',
      value: <span><small>R$</small> 70.000,00</span>,
    },
  ],
  hideMsg: 'Ocultar saldo',
  showMsg: 'Mostrar saldo',
  title: 'Pagar.me',
}

class SidebarSummaryExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: false,
      showInfos: false,
    }
  }

  render () {
    const {
      collapsed,
      showInfos,
    } = this.state

    return (
      <Section>
        {!collapsed &&
          <SidebarSummary
            active={showInfos}
            onClick={() => this.setState({ showInfos: !showInfos })}
            subtitle={showInfos ? `${sections.hideMsg}` : `${sections.showMsg}`}
            title={sections.title}
          >
            <SidebarSections sections={sections.data} />
          </SidebarSummary>
        }
      </Section>
    )
  }
}

export default SidebarSummaryExample
