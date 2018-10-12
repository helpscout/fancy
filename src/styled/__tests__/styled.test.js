import React from 'react'
import {mount} from 'enzyme'
import styled from '../index'
import {getStyleProp, resetStyleTags} from '../../utils/testHelpers'

describe('styled', () => {
  afterEach(() => {
    resetStyleTags()
  })

  describe('Styled Components', () => {
    test('Can create a styled primitive', () => {
      const Compo = styled('span')`
        background: red;
      `
      const wrapper = mount(<Compo />)
      const el = wrapper.find('span').getNode()

      expect(el).toBeTruthy()
      expect(getStyleProp(el, 'background')).toBe('red')
    })

    test('Can create a styled component', () => {
      const Base = props => <p {...props} />
      const Compo = styled(Base)`
        background: yellow;
      `
      const wrapper = mount(<Compo />)
      const el = wrapper.find('p').getNode()

      expect(getStyleProp(el, 'background')).toBe('yellow')
    })

    test('Can pass classNames into a styled component', () => {
      const Base = props => <p {...props} />
      const Compo = styled(Base)`
        background: yellow;
      `
      const wrapper = mount(<Compo className="raptor" />)
      const el = wrapper.find('p').getNode()

      expect(getStyleProp(el, 'background')).toBe('yellow')
      expect(el.classList.contains('raptor')).toBe(true)
    })

    test('Can create a styled component with Object styles', () => {
      const Base = props => <p {...props} />
      const Compo = styled(Base)({
        background: 'yellow',
        padding: 20,
      })

      const wrapper = mount(<Compo />)
      const el = wrapper.find('p').getNode()

      expect(getStyleProp(el, 'background')).toBe('yellow')
      expect(getStyleProp(el, 'padding')).toBe('20px')
    })

    test('Can create a styled component with prop interpolation', () => {
      const Compo = styled('span')`
        background: yellow;
        ${props => props.title && 'color: red;'};
      `

      const wrapper = mount(<Compo title="Clever" />)
      const el = wrapper.find('span').getNode()

      expect(getStyleProp(el, 'background')).toBe('yellow')
      expect(getStyleProp(el, 'color')).toBe('red')
    })

    test('Can re-compute className on prop changes', () => {
      const Compo = styled('span')`
        background: yellow;
        ${props => props.title && 'color: red;'};
      `

      const wrapper = mount(<Compo />)
      const el = wrapper.find('span').getNode()

      expect(getStyleProp(el, 'background')).toBe('yellow')
      expect(getStyleProp(el, 'color')).not.toBe('red')

      wrapper.setProps({title: 'Clever'})

      expect(getStyleProp(el, 'background')).toBe('yellow')
      expect(getStyleProp(el, 'color')).toBe('red')
    })

    test('Falls back to emotion.css if emotion.cssWithScope is unavailable', () => {
      const Compo = styled('span')`
        background: yellow;
        ${props => props.title && 'color: red;'};
      `

      const wrapper = mount(<Compo />)
      const el = wrapper.find('span').getNode()

      wrapper.instance().emotion.cssWithScope = undefined
      const spy = jest.spyOn(wrapper.instance().emotion, 'css')

      wrapper.setProps({title: 'Clever'})

      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })
  })

  describe('className', () => {
    test('Autogenerates a hashed className', () => {
      const Compo = styled('span')(`
        display: block;
      `)
      const wrapper = mount(<Compo />)
      const el = wrapper.find('span').getNode()

      expect(el.classList.toString()).toContain('css-')
    })

    test('Accepts custom classNames', () => {
      const Compo = styled('span')(`
        display: block;
      `)
      const wrapper = mount(<Compo className="custom" />)
      const el = wrapper.find('span').getNode()

      expect(el.classList.toString()).toContain('css-')
      expect(el.classList.toString()).toContain('custom')
    })
  })

  // describe('Statics', () => {
  //   test('Hoists statics when created a styled-component', () => {
  //     const anotherStatic = []
  //     class StaticComponent extends React.Component {
  //       render() {
  //         return null
  //       }
  //     }
  //     class InnerComponent extends React.Component {
  //       static firstStatic = StaticComponent
  //       static secondStatic = anotherStatic
  //       render() {
  //         return null
  //       }
  //     }
  //     const TestComponent = styled(InnerComponent)()

  //     expect(TestComponent.firstStatic).toBe(StaticComponent)
  //     expect(TestComponent.secondStatic).toBe(anotherStatic)
  //   })

  //   test('Hoists a SFC static when created a styled-component', () => {
  //     const anotherStatic = []
  //     class StaticComponent extends React.Component {
  //       render() {
  //         return null
  //       }
  //     }
  //     const InnerComponent = () => {
  //       return null
  //     }
  //     InnerComponent.firstStatic = StaticComponent
  //     InnerComponent.secondStatic = anotherStatic

  //     const TestComponent = styled(InnerComponent)()

  //     expect(TestComponent.firstStatic).toBe(StaticComponent)
  //     expect(TestComponent.secondStatic).toBe(anotherStatic)
  //   })

  //   test('Hoists styled-component statics when created a styled-component', () => {
  //     class StaticComponent extends React.Component {
  //       render() {
  //         return null
  //       }
  //     }
  //     const StyledStaticComponent = styled(StaticComponent)()

  //     class InnerComponent extends React.Component {
  //       static StaticComponent = StyledStaticComponent
  //       render() {
  //         return null
  //       }
  //     }
  //     const TestComponent = styled(InnerComponent)()

  //     expect(TestComponent.StaticComponent).toBe(StyledStaticComponent)
  //   })
  // })

  describe('Extending', () => {
    test('Can extend another styled component, with different CSS props', () => {
      const Card = styled('div')`
        background: red;
      `

      const FancyCard = styled(Card)`
        padding: 20px;
      `

      const wrapper = mount(
        <span>
          <FancyCard className="fancy" />
        </span>,
      )
      const el = wrapper.find('div.fancy').getNode()

      expect(getStyleProp(el, 'background')).toBe('red')
      expect(getStyleProp(el, 'padding')).toBe('20px')
    })

    test('Can extend another styled component, with conflicting CSS props', () => {
      const Card = styled('div')`
        background: red;
      `

      const FancyCard = styled(Card)`
        background: blue;
      `

      const wrapper = mount(
        <span>
          <FancyCard className="fancy" />
        </span>,
      )
      const el = wrapper.find('div.fancy').getNode()

      expect(getStyleProp(el, 'background')).toBe('blue')
    })

    test('Can extend another component, with an inner styled component', () => {
      const SomeBaseCard = styled('div')`
        background: red;
        padding: 20px;
      `

      const CardComponent = props => {
        return <SomeBaseCard {...props} />
      }

      const someHOC = () => Component => {
        class withWrapper extends React.Component {
          render() {
            return <Component {...this.props} />
          }
        }

        return withWrapper
      }

      const SuperCard = someHOC()(someHOC()(CardComponent))

      const FancyCard = styled(SuperCard)`
        background: blue;
        color: red;
      `

      const wrapper = mount(<FancyCard className="fancy">Hallo</FancyCard>)
      const el = wrapper
        .find('.fancy')
        .first()
        .getNode()

      expect(getStyleProp(el, 'background')).toBe('blue')
      expect(getStyleProp(el, 'color')).toBe('red')
      expect(getStyleProp(el, 'padding')).toBe('20px')
    })
  })
})
