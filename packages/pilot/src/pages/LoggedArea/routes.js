import Transaction32 from 'emblematic-icons/svg/Transaction32.svg'
import Report32 from 'emblematic-icons/svg/Report32.svg'

import Transactions from '../Transactions'
import Report from '../Report'

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
  report: {
    title: 'Relatórios',
    path: '/report',
    component: Report,
    icon: Report32,
    exact: true,
  },
}
