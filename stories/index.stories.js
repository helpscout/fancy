import React from 'react'
import { storiesOf } from '@storybook/react'
import styled, { css } from '../src'

const stories = storiesOf('Basic', module)

const Card = props => {
  const { className } = props
  return (
    <div className={className}>
      <div className={blockCSS}>Card</div>
    </div>
  )
}

const blockCSS = css`
  color: #444;
  padding: 20px;
`

const FancyCard = styled(Card)`
  border: 1px solid #eee;
  border-radius: 4px;
`

stories.add('Example', () => {
  return <FancyCard className="gogogo" />
})
