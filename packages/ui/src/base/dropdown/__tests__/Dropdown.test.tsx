import renderer from 'react-test-renderer'
import Dropdown, { DropdownAlign } from '../Dropdown'
import { DropdownItemVariant } from '../DropdownItem'

describe('Dropdown', () => {
  const variants = {
    link: { variant: DropdownItemVariant.Link, element: 'Profile', props: { href: '/#Profile' } },
    button: { variant: DropdownItemVariant.Button, element: 'Action' },
    custom: { element: <div className="block w-full bg-gray-800 text-right">Profile</div> },
  }

  Object.values(DropdownAlign).forEach(align => {
    for (const [variantKey, variantValue] of Object.entries(variants)) {
      it(`renders correctly with align=${align}, dropdown item variant=${variantKey}`, () => {
        const tree = renderer
          .create(<Dropdown items={[variantValue]} align={align} widthClass="w-80" />)
          .toJSON()
        expect(tree).toMatchSnapshot()
      })
    }
  })

  it(`renders correctly with custom trigger`, () => {
    const tree = renderer
      .create(
        <Dropdown items={Object.values(variants)} trigger={<button>Custom Trigger</button>} />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
