import React from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';
import { Form, List, Button } from 'semantic-ui-react';
import { Party } from '@daml/types';

type Props = {
  stock: string;
  price: string;
  pending: string;
  balance: string;
}

/**
 * React component to edit a list of `Party`s.
 */
const VendingMachine: React.FC<Props> = ({stock, price, pending, balance}) => {
  const handleInsertCoin = () => {
    console.log("Inserted a quarter.")
  }

  const handleDispenseSoda = () => {
    console.log("Dispensed a soda.")
  }

  return (
    <Container>
      <Grid centered columns={4}>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <b>Stock</b><br />
              {stock}
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <b>Price</b><br />
              {price}
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <b>Pending</b><br />
              {balance}
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <b>Balance</b><br />
              {balance}
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form onSubmit={handleInsertCoin}>
              <Button
                type='submit'
                className='test-select-follow-button'>
                Insert Coin
              </Button>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form onSubmit={handleDispenseSoda}>
              <Button
                type='submit'
                className='test-select-follow-button'>
                Dispense
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    // <List relaxed>
    //   {[...parties].sort((x, y) => x.localeCompare(y)).map((party) =>
    //     <List.Item
    //       key={party}
    //     >
    //       <List.Icon name='user outline' />
    //       <List.Content>
    //         <List.Header className='test-select-following'>
    //           {party}
    //         </List.Header>
    //       </List.Content>
    //     </List.Item>
    //   )}
    //   <br />
    //   <Form onSubmit={addParty}>
    //     <Form.Input
    //       fluid
    //       readOnly={isSubmitting}
    //       loading={isSubmitting}
    //       className='test-select-follow-input'
    //       placeholder="Username to follow"
    //       value={newParty}
    //       onChange={(event) => setNewParty(event.currentTarget.value)}
    //     />
    //     <Button
    //       type='submit'
    //       className='test-select-follow-button'>
    //       Follow
    //     </Button>
    //   </Form>
    // </List>
  );
};

export default VendingMachine;
