import React from 'react'
import {storiesOf} from '@storybook/react'
import styled from '../src'

const stories = storiesOf('Nested', module)

stories.add('Targeting another emotion component', () => {
  const Child = styled('div')`
    color: red;
  `

  const Parent = styled('div')`
    ${Child} {
      color: green;
    }
  `
  return (
    <div>
      <h3>
        Note:{' '}
        <a href="https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin-emotion">
          babel-plugin-emotion
        </a>{' '}
        is required for this.
      </h3>
      <Parent>
        <Child>green</Child>
      </Parent>
      <Child>red</Child>
    </div>
  )
})

stories.add('Object styles', () => {
  const Child = styled('div')({
    color: 'red',
  })

  const Parent = styled('div')({
    [Child]: {
      color: 'green',
    },
  })

  return (
    <div>
      <h3>
        Note:{' '}
        <a href="https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin-emotion">
          babel-plugin-emotion
        </a>{' '}
        is required for this.
      </h3>
      <Parent>
        <Child>green</Child>
      </Parent>
      <Child>red</Child>
    </div>
  )
})
