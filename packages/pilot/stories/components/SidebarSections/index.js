import React from 'react'

import Section from '../../Section'
import SidebarSections from '../../../src/components/SidebarSections'

const sections = {
  hideMsg: 'Hide balance',
  showMsg: 'Show balance',
  title: 'Pagar.me',
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
}

const SidebarSectionsExample = () => (
  <Section>
    <SidebarSections sections={sections.data} />
  </Section>
)

export default SidebarSectionsExample
