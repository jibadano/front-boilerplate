import React from 'react'
import Header from './header'

class Layout extends React.Component {

  render() {
    const { children } = this.props
    return (
      <div>
        <Header>
          {/* <Link href="/test" >
                <IconButton color="inherit" >
                  T
                </IconButton>
              </Link> */}
        </Header>
        <div style={{ paddingTop: '80px' }}>
          {children}
        </div>
      </div>
    )
  }
}

export default Layout