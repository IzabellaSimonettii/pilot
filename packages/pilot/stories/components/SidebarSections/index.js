import React from 'react'

import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import SidebarSections from '../../../src/components/SidebarSections'

const sections = {
  data: [
    {
      action: action('clicked'),
      actionTitle: 'Sacar',
      title: 'Disponível',
      value: <span><small>R$</small> 15.000,00</span>,
    },
    {
      action: action('clicked'),
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
