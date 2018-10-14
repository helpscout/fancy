import React from 'react'
import {storiesOf} from '@storybook/react'
import styled, {ThemeProvider} from '../../src/index'

const stories = storiesOf('Styled Components/Advanced', module)

stories.add('Theming', () => {
  // Define our button, but with the use of props.theme this time
  const Button = styled('button')`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;

    /* Color the border and text with theme.main */
    color: ${props => props.theme.main};
    border: 2px solid ${props => props.theme.main};
  `

  // We are passing a default theme for Buttons that arent wrapped in the ThemeProvider
  Button.defaultProps = {
    theme: {
      main: 'palevioletred',
    },
  }

  // Define what props.theme will look like
  const theme = {
    main: 'mediumseagreen',
  }

  return (
    <div>
      <Button>Normal</Button>

      <ThemeProvider theme={theme}>
        <Button>Themed</Button>
      </ThemeProvider>
    </div>
  )
})

stories.add('Function themes', () => {
  // Define our button, but with the use of props.theme this time
  const Button = styled('button')`
    color: ${props => props.theme.fg};
    border: 2px solid ${props => props.theme.fg};
    background: ${props => props.theme.bg};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;
  `

  // Define our `fg` and `bg` on the theme
  const theme = {
    fg: 'palevioletred',
    bg: 'white',
  }

  // This theme swaps `fg` and `bg`
  const invertTheme = ({fg, bg}) => ({
    fg: bg,
    bg: fg,
  })

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button>Default Theme</Button>

        <ThemeProvider theme={invertTheme}>
          <Button>Inverted Theme</Button>
        </ThemeProvider>
      </div>
    </ThemeProvider>
  )
})

stories.add('The theme prop', () => {
  // Define our button
  const Button = styled('button')`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;

    /* Color the border and text with theme.main */
    color: ${props => props.theme.main};
    border: 2px solid ${props => props.theme.main};
  `

  // Define what main theme will look like
  const theme = {
    main: 'mediumseagreen',
  }

  return (
    <div>
      <Button theme={{main: 'royalblue'}}>Ad hoc theme</Button>
      <ThemeProvider theme={theme}>
        <div>
          <Button>Themed</Button>
          <Button theme={{main: 'darkorange'}}>Overidden</Button>
        </div>
      </ThemeProvider>
    </div>
  )
})

stories.add('Refs', () => {
  const Input = styled('input')`
    padding: 0.5em;
    margin: 0.5em;
    color: palevioletred;
    background: papayawhip;
    border: none;
    border-radius: 3px;
  `

  class Form extends React.Component {
    setInputRef = node => {
      this.inputRef = node
    }

    handleOnMouseEnter = () => {
      this.inputRef.focus()
    }

    handleOnMouseLeave = () => {
      this.inputRef.blur()
    }

    render() {
      return (
        <Input
          innerRef={this.setInputRef}
          placeholder="Hover to focus!"
          onMouseEnter={this.handleOnMouseEnter}
          onMouseLeave={this.handleOnMouseLeave}
        />
      )
    }
  }

  return <Form />
})

stories.add('Media Templates', () => {
  const Content = styled('div')`
    background: papayawhip;
    height: 3em;
    width: 3em;

    @media (max-width: 700px) {
      background: palevioletred;
    }
  `
  return <Content />
})

stories.add('Style objects', () => {
  // Static object
  const Box = styled('div')({
    background: 'palevioletred',
    height: '50px',
    width: '50px',
  })

  // Adapting based on props
  const PropsBox = styled('div')(props => ({
    background: props.background,
    height: '50px',
    width: '50px',
  }))

  return (
    <div>
      <Box />
      <PropsBox background="blue" />
    </div>
  )
})
