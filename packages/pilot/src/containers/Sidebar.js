/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'

import SidebarSections from '../components/SidebarSections'
import SidebarSummary from '../components/SidebarSummary'

import {
  Sidebar,
  SidebarHeader,
  SidebarLink,
  SidebarLinks,
} from 'former-kit'

import Menu32 from 'emblematic-icons/svg/Menu32.svg'

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

class SidebarContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false,
      showInfos: false,
    }

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this)
  }

  handleToggleSidebar () {
    const { collapsed } = this.state
    this.setState({ collapsed: !collapsed })
  }

  render () {
    const {
      collapsed,
      showInfos,
    } = this.state
    const {
      links,
      logo: Logo,
      onLinkClick,
      t,
    } = this.props
    return (
      <Sidebar collapsed={collapsed}>
        <SidebarHeader>
          {!collapsed && <Logo width="140" />}
          <button onClick={this.handleToggleSidebar}>
            <Menu32 width={16} height={16} />
          </button>
        </SidebarHeader>
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
        <SidebarLinks>
          {links.map(({
            active,
            icon: Icon,
            path,
            title,
          }) => (
            <SidebarLink
              key={path}
              title={t(title)}
              active={active}
              icon={<Icon width={16} height={16} />}
              collapsed={collapsed}
              onClick={() => onLinkClick(path)}
            />
          )
        )}
        </SidebarLinks>
      </Sidebar>
    )
  }
}

SidebarContainer.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool,
    title: PropTypes.string,
    path: PropTypes.string,
    icon: PropTypes.func,
    component: PropTypes.func,
  })).isRequired,
  logo: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default SidebarContainer
