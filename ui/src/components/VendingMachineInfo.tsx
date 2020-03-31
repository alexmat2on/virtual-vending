import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Form, Button } from 'semantic-ui-react';
import { ContractId } from '@daml/types';
import { User } from '@daml-ts/virtual-vending-0.1.0/lib/User';
import MultiItems from './MultiItems';

type Props = {
  stock: string;
  price: string;
  pending: string;
  balance: string;
  userID: ContractId<User> | undefined;
  onInsertCoin: (customer: ContractId<User>) => Promise<boolean>;
  onDispense: (customer: ContractId<User>) => Promise<boolean>;
  onCancel: (customer: ContractId<User>) => Promise<boolean>;
}

/**
 * React component to edit a list of `Party`s.
 */
const VendingMachineInfo: React.FC<Props> = ({ stock, price, pending, balance, userID, onInsertCoin, onDispense, onCancel }) => {
  const handleInsertCoin = () => {
    console.log("Inserted a quarter.")
    if (userID) {
      onInsertCoin(userID);
    }
  }

  const handleDispenseSoda = () => {
    console.log("Dispensed a soda.")
    if (userID) {
      onDispense(userID);
    }
  }

  const handleCancel = () => {
    if (userID) {
      onCancel(userID);
    }
  }

  return (
    <>
      <Grid.Row stretched>
        <Grid.Column>
          <Segment>
            <b>Stock</b><br />
            <MultiItems num={stock}/>
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
            {pending}
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
        <Grid.Column>
          <Form onSubmit={handleCancel}>
            <Button
              type='submit'
              className='test-select-follow-button'>
              Cancel
              </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

export default VendingMachineInfo;
