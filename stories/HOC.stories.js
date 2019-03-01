import React from 'react'
import { storiesOf } from '@storybook/react'
import propConnect from '@helpscout/hsds-react/components/PropProvider/propConnect'
import { namespaceComponent } from '@helpscout/hsds-react/utilities/component'
import styled, { ScopeProvider } from '../src'
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
