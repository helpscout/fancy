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

stories.add('Component', () => {
  return (
    <div>
      <Frame>
        <FancyCard bg='red' />
        <FancyCard bg='red' />
        <FancyCard bg='red' />
      </Frame>
    </div>
  )
})
