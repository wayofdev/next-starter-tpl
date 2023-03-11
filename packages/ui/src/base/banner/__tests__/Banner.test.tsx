import renderer from 'react-test-renderer'
import Banner from '../Banner'

it('should match snapshot', () => {
  const tree = renderer
    .create(<Banner message="Big news! We're excited to announce a brand new product." />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
