import renderer from 'react-test-renderer'
import Header from '../Header'

describe('Header', () => {
  it(`renders correctly with navigation and auth elements`, () => {
    const tree = renderer
      .create(
        <Header
          logo="Logo"
          navigation={[
            { title: 'Home', href: '/' },
            { title: 'Products', href: '/#Products' },
          ]}
          userNavigation={[
            { title: 'Settings', href: '/#Settings' },
            { title: 'My orders', href: '/#MyOrders' },
          ]}
          logoutConfig={{ label: 'Logout' }}
          authBlock={<div>authBlock</div>}
          guestBlock={<div>guestBlock</div>}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
