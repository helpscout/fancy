import React from 'react'
import styled, { ThemeProvider } from '../src/index'

const Card = props => {
  const { className, children } = props

  return (
    <div className={className}>
      <div className="CardBlock">{children || 'Card'}</div>
    </div>
  )
}

const FancyCard = styled(Card)`
  border: 1px solid #eee;
  border-radius: 4px;
  ${props =>
    props.theme.color &&
    `
    background: ${props.theme.color};
  `} .CardBlock {
    padding: 20px;
  }
`

const BigCard = styled(FancyCard)`
  padding: 40px 20px;
`

class ColorfulCards extends React.Component {
  constructor() {
    super()
    this.state = {
      color: '#ffffff',
      cards: [1, 2],
    }

    this.handleAddCard = this.handleAddCard.bind(this)
    this.handleChangeColor = this.handleChangeColor.bind(this)
  }

  handleAddCard() {
    const { cards } = this.state
    this.setState({ cards: [...cards, cards.length + 1] })
  }

  handleChangeColor(event) {
    const color = event.target.value
    this.setState({
      color,
    })
  }

  render() {
    const { cards, color } = this.state
    const cardsMarkup = cards.map(id => <FancyCard key={id} />)

    return (
      <ThemeProvider theme={{ color }}>
        <div>
          <button onClick={this.handleAddCard}>Add</button>
          <input type="color" onChange={this.handleChangeColor} value={color} />
          <hr />
          {cardsMarkup}
          <BigCard>Big Card</BigCard>
        </div>
      </ThemeProvider>
    )
  }
}

export default ColorfulCards
