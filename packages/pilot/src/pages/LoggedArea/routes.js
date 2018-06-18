import Transaction32 from 'emblematic-icons/svg/Transaction32.svg'

import Transactions from '../Transactions'
import Recipients from '../Recipients'

export default {
  transactions: {
    title: 'transactions.list',
    path: '/transactions',
    component: Transactions,
    icon: Transaction32,
    exact: true,
  },
  transactionsDetails: {
    title: 'transactions.details',
    path: '/transactions/:id',
    exact: true,
  },
  recipients: {
    title: 'pages.recipients.title',
    path: '/recipients',
    component: Recipients,
    icon: Transaction32,
    exact: true,
  },
}
