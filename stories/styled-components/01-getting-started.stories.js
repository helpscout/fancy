import React from 'react'
import {storiesOf} from '@storybook/react'
import styled, {keyframes} from '../../src/index'

const stories = storiesOf('Styled Components/Basics', module)

stories.add('Getting Started', () => {
  // Create a Title component that'll render an <h1> tag with some styles
  const Title = styled('h1')`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
  `

  // Create a Wrapper component that'll render a <section> tag with some styles
  const Wrapper = styled('section')`
    padding: 4em;
    background: papayawhip;
  `

  return (
    <Wrapper>
      <Title>Hello World!</Title>
    </Wrapper>
  )
})

stories.add('Adapting based on props', () => {
  const Button = styled('button')`
    /* Adapt the colors based on primary prop */
    background: ${props => (props.primary ? 'palevioletred' : 'white')};
    color: ${props => (props.primary ? 'white' : 'palevioletred')};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
  `

  return (
    <div>
      <Button>Normal</Button>
      <Button primary>Primary</Button>
    </div>
  )
})

stories.add('Extending styles', () => {
  // The Button from the last section without the interpolations
  const Button = styled('button')`
    color: palevioletred;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
  `

  // A new component based on Button, but with some override styles
  const TomatoButton = styled(Button)`
    color: tomato;
    border-color: tomato;
  `

  return (
    <div>
      <Button>Normal Button</Button>
      <TomatoButton>Tomato Button</TomatoButton>
    </div>
  )
})

stories.add('Styling any components', () => {
  // This could be react-router-dom's Link for example
  const Link = ({className, children}) => (
    <a className={className}>{children}</a>
  )

  const StyledLink = styled(Link)`
    color: palevioletred;
    font-weight: bold;
  `

  return (
    <div>
      <Link>Unstyled, boring Link</Link>
      <br />
      <StyledLink>Styled, exciting Link</StyledLink>
    </div>
  )
})

stories.add('Passed props', () => {
  // Create an Input component that'll render an <input> tag with some styles
  const Input = styled('input')`
    padding: 0.5em;
    margin: 0.5em;
    color: ${props => props.inputColor || 'palevioletred'};
    background: papayawhip;
    border: none;
    border-radius: 3px;
  `

  // Render a styled text input with the standard input color, and one with a custom input color
  return (
    <div>
      <Input defaultValue="@probablyup" type="text" />
      <Input defaultValue="@geelen" type="text" inputColor="rebeccapurple" />
    </div>
  )
})

stories.add('Pseudoelements, pseudoselectors, and nesting', () => {
  const Thing = styled('button')`
    color: blue;

    ::before {
      content: '🚀';
    }

    :hover {
      color: red;
    }
  `

  return <Thing>Hello world!</Thing>
})

stories.add('Complex Pseudoelements', () => {
  const Thing = styled('div')`
    color: blue;

    &:hover {
      color: red; // <Thing> when hovered
    }

    & ~ & {
      background: tomato; // <Thing> as a sibling of <Thing>, but maybe not directly next to it
    }

    & + & {
      background: lime; // <Thing> next to <Thing>
    }

    &.something {
      background: orange; // <Thing> tagged with an additional CSS class ".something"
    }

    .something-else & {
      border: 1px solid; // <Thing> inside another element labeled ".something-else"
    }
  `

  Thing.defaultProps = {
    tabIndex: 0,
  }

  return (
    <p>
      <Thing>Hello world!</Thing>
      <Thing>How ya doing?</Thing>
      <Thing className="something">The sun is shining...</Thing>
      <div>Pretty nice day today.</div>
      <Thing>Don't you think?</Thing>
      <div className="something-else">
        <Thing>Splendid.</Thing>
      </div>
    </p>
  )
})

stories.add('Child className', () => {
  const Thing = styled('div')`
    color: blue;

    .something {
      border: 1px solid; // an element labeled ".something" inside <Thing>
      display: block;
    }
  `

  return (
    <Thing>
      <label htmlFor="foo-button" className="something">
        Mystery button
      </label>
      <button id="foo-button">What do I do?</button>
    </Thing>
  )
})

stories.add('Attaching additional props', () => {
  const Input = styled('input')`
    color: palevioletred;
    font-size: 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;

    /* here we use the dynamically computed props */
    margin: ${props => props.margin};
    padding: ${props => props.padding};
  `

  Input.defaultProps = {
    type: 'password',
    margin: props => props.size || '1em',
    padding: props => props.size || '1em',
  }

  return (
    <div>
      <Input placeholder="A small text input" size="1em" />
      <br />
      <Input placeholder="A bigger text input" size="2em" />
    </div>
  )
})

stories.add('Animations', () => {
  // keyframes returns a unique name based on a hash of the contents of the keyframes
  const rotate360 = keyframes`
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  `

  // Here we create a component that will rotate everything we pass in over two seconds
  const Rotate = styled('div')`
    display: inline-block;
    animation: ${rotate360} 2s linear infinite;
    padding: 2rem 1rem;
    font-size: 1.2rem;
  `

  return <Rotate>&lt; 💅 &gt;</Rotate>
})
