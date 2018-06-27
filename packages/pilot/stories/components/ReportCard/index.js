import React from 'react'
import ReportCard from '../../../src/components/ReportCard'

const report = {
  object: 'report',
  id: 'rep_fjh9eevpv00031uo7st5nscqc',
  status: 'ready',
  type: 'plans',
  data: {
    company_id: '58ebcf091173c91400a0b05d',
    created_at: '2018-03-11T00:00:00.000Z',
    updated_at: '2018-03-11T00:00:00.000Z',
  },
  url: 'http://s3.amazonaws.com/tract-live/public/plans_cjh9eew06000012rxte25jpkr.json?AWSAccessKeyId=AKIAIUD2DGLYBPF7X3FA&Expires=1526493233&Signature=ce4THQeQV%2Ft%2BDPUnbTHSYo51mCI%3D',
  created_at: '2018-05-16T17:47:02.035Z',
  updated_at: '2018-05-16T17:47:02.596Z',
}

class ReportCardState extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      ...report,
      expandedCard: false,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({
      expandedCard: !this.state.expandedCard,
    })
  }

  render () {
    return (
      <ReportCard
        report={report}
        onClick={this.handleClick()}
        cardExpanded={this.state.expandedCard}
      />

    )
  }
}

export default ReportCardState
