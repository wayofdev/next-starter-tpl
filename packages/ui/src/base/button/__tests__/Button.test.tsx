import renderer from 'react-test-renderer'
import { Button, Size, Mode } from '../Button'

describe('Button', () => {
  const sizes = Object.values(Size)
  const modes = Object.values(Mode)

  sizes.forEach(size => {
    modes.forEach(mode => {
      const indexOfSize = Object.values(Size).indexOf(size as unknown as Size)
      const indexOfMode = Object.values(Mode).indexOf(mode as unknown as Mode)

      const keyOfSize = Object.keys(Size)[indexOfSize]
      const keyOfMode = Object.keys(Mode)[indexOfMode]

      it(`renders correctly with size=${keyOfSize} and mode=${keyOfMode}`, () => {
        const tree = renderer.create(<Button mode={mode} size={size} label="Button" />).toJSON()
        expect(tree).toMatchSnapshot()
      })
    })
  })
})
