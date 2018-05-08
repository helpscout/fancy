import React from 'react'
import { storiesOf } from '@storybook/react'
import fancy from '../src'
import Frame from 'react-frame-component'

const stories = storiesOf('Sample', module)

const css = (props) => `
.Card {
  background: ${props.bg};
  border: 1px solid red;

  &__block {
    padding: 20px;
  }
}
`

const Card = props => {
  const { styles } = props

  return (
    <div className={styles.Card}>
      <div className={styles.Card__block}>
        Card
      </div>
    </div>
  )
}

const FancyCard = fancy(css)(Card)

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      cards: [1, 2]
    }

    this.handleAddCard = this.handleAddCard.bind(this)
  }

  handleAddCard () {
    const { cards } = this.state
    this.setState({ cards: [...cards, cards.length + 1] })
  }

  render () {
    const { cards } = this.state
    const cardsMarkup = cards.map(id => (
      <FancyCard key={id} />
    ))

    return (
      <div>
        <div>
          {cardsMarkup}
        </div>
        <button onClick={this.handleAddCard}>Add</button>
      </div>
    )
  }
}

stories.add('Component', () => {
  return (
    <App />
  )
})
