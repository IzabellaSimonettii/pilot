import React from 'react'
import {
  pipe,
  prop,
} from 'ramda'

import { Button } from 'former-kit'

import formatDate from '../../formatters/longDate'
import renderStatusLegend from '../../containers/RecipientsList/renderStatusLegend'

const getDefaultColumns = ({ t, onDetailsClick }) => ([
  {
    title: t('models.recipient.status'),
    renderer: renderStatusLegend,
    accessor: ['status'],
    orderable: true,
  },
  {
    title: t('models.recipient.id'),
    accessor: ['id'],
    orderable: true,
  },
  {
    title: t('models.recipient.bank_account_id'),
    accessor: ['bank_account', 'id'],
    orderable: true,
  },
  {
    title: t('models.recipient.bank_account_legal_name'),
    accessor: ['bank_account', 'legal_name'],
    orderable: true,
  },
  {
    title: t('models.recipient.bank_account_document_number'),
    accessor: ['bank_account', 'document_number'],
    orderable: true,
  },
  {
    title: t('models.recipient.created_date'),
    accessor: ['created_at'],
    orderable: true,
    renderer: pipe(prop('created_at'), formatDate),
  },
  {
    align: 'center',
    isAction: true,
    orderable: false,
    renderer: index => (
      <Button
        fill="outline"
        onClick={() => onDetailsClick(index)}
      >
        VER DETALHES
      </Button>
    ),
    title: t('models.recipient.details'),
    aggregator: null,
    aggregationRenderer: null,
    aggregationTitle: null,
  },
])

export default getDefaultColumns
