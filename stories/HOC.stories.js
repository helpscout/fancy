import React from 'react'
import {storiesOf} from '@storybook/react'
import propConnect from '@helpscout/blue/components/PropProvider/propConnect'
import {namespaceComponent} from '@helpscout/blue/utilities/component'
import styled, {ScopeProvider} from '../src'
import Card from './CardCo'

const stories = storiesOf('HOC', module)

const StyledCard = styled(Card)`
  padding: 0px;
  background: red;
`

const Thing = styled('div')`
  padding: 20px;
`

class Test extends React.Component {
  componentDidMount() {
    const cardNode = document.querySelector('.card')
    const styledCardNode = document.querySelector('.styledCard')

    const a = cardNode.classList.length
    const l = styledCardNode.classList.length

    this.node.innerHTML = `
      ✅ PASS: cardNode: ${a};<br /><br />
      ${l === a ? '✅ PASS' : '🔥 FAIL'}: styledCardNode: ${l};<br /><br />
      <hr />
      ${cardNode.classList.toString()}
      <hr />
      ${styledCardNode.classList.toString()}
      <hr />
    `
  }
  render() {
    return (
      <ScopeProvider scope="#APP">
        <div id="APP">
          <div ref={node => (this.node = node)} />
          <Card className="card" innerRef={node => (this.cardNode = node)}>
            Card
          </Card>
          <StyledCard
            className="styledCard"
            innerRef={node => (this.styledCardNode = node)}
          >
            StyledCard
          </StyledCard>
          <Thing innerRef={node => (this.thingNode = node)}>Thing</Thing>
        </div>
      </ScopeProvider>
    )
  }
}

stories.add('Example', () => {
  return <Test />
})
