import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from '../src'
import ThemeProvider from '../src/ThemeProvider'
import Frame from 'react-frame-component'

const stories = storiesOf('Sample', module)

const css = props => {
  return `
    .Card {
      background: ${props.theme.card.background};
      border: 1px solid ${props.theme.card.border};
      &__block {
        padding: 20px;
      }
    }
`
}

const Card = props => {
  const { styles } = props

  return (
    <div className={styles.Card}>
      <div className={styles.Card__block}>Card</div>
    </div>
  )
}

const FancyCard = styled(Card)(css)

const theme = {
  card: {
    background: '#eee',
    border: '#bbb',
  },
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      cards: [1, 2],
    }

    this.handleAddCard = this.handleAddCard.bind(this)
  }

  handleAddCard() {
    const { cards } = this.state
    this.setState({ cards: [...cards, cards.length + 1] })
  }

  render() {
    const { cards } = this.state
    const cardsMarkup = cards.map(id => <FancyCard key={id} />)

    return (
      <div>
        <ThemeProvider theme={theme} scope="html body div">
          {cardsMarkup}
          <button onClick={this.handleAddCard}>Add</button>
        </ThemeProvider>
      </div>
    )
  }
}

stories.add('Component', () => {
  return <App />
})
