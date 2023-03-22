import renderer from 'react-test-renderer'
import Button, { Size, Mode } from '../Button'

describe('Button', () => {
  for (const [sizeKey, sizeValue] of Object.entries(Size)) {
    for (const [modeKey, modeValue] of Object.entries(Mode)) {
      it(`renders correctly with size=${sizeKey} and mode=${modeKey}`, () => {
        const tree = renderer
          .create(<Button mode={modeValue} size={sizeValue} label="Button" />)
          .toJSON()
        expect(tree).toMatchSnapshot()
      })
    }
  }
})
