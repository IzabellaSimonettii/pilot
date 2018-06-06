import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import RecipientListState from './RecipientList'
import ReportListState from './ReportList'

storiesOf('Containers', module)
  .add('Recipient list', () => (
    <RecipientListState />
  ))
  .add('Report list', () => (
    <ReportListState />
  ))
