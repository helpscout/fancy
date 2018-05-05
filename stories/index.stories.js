import React from 'react'
import { storiesOf } from '@storybook/react'
import fancy from '../src'
import Frame from 'react-frame-component'

const stories = storiesOf('Sample', module)

const css = `
.Card {
  border: 1px solid #eee;
  border-radius: 4px;

  &__block {
    padding: 20px;
  }
}
`

const Card = props => {
  return (
    <div>
      <div className='Card'>
        <div className='Card__block'>
          ddd
        </div>
      </div>
    </div>
  )
}

const FancyCard = fancy(css)(Card)

stories.add('Component', () => {
  return (
    <div>
      <Frame>
        <FancyCard />
        <FancyCard />
        <FancyCard />
      </Frame>
    </div>
  )
})
