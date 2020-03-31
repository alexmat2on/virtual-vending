import React from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';
import { Form, Button } from 'semantic-ui-react';
import { ContractId } from '@daml/types';
import { User } from '@daml-ts/virtual-vending-0.1.0/lib/User';

type Props = {
  userID: ContractId<User> | undefined;
  onRestock: (customer: ContractId<User>) => Promise<boolean>;
  onCollect: (customer: ContractId<User>) => Promise<boolean>;
  onShare: (customer: ContractId<User>) => Promise<boolean>;
}

/**
 * React component to edit a list of `Party`s.
 */
const VendingMachineOwner: React.FC<Props> = ({ userID, onRestock, onCollect, onShare }) => {
  const handleRestock = () => {
    console.log("Inserted a quarter.")
    if (userID) {
      onRestock(userID);
    }
  }

  const handleCollect = () => {
    console.log("Dispensed a soda.")
    if (userID) {
      onCollect(userID);
    }
  }

  const handleShare = () => {
    if (userID) {
      onShare(userID);
    }
  }

  return (
    <Grid.Row>
      <Grid.Column>
        <Form onSubmit={handleRestock}>
          <Button
            type='submit'
            className='test-select-follow-button'>
            Restock
          </Button>
        </Form>
      </Grid.Column>
      <Grid.Column>
        <Form onSubmit={handleCollect}>
          <Button
            type='submit'
            className='test-select-follow-button'>
            Collect
          </Button>
        </Form>
      </Grid.Column>
      <Grid.Column>
        <Form onSubmit={handleShare}>
          <Button
            type='submit'
            className='test-select-follow-button'>
            Share
          </Button>
        </Form>
      </Grid.Column>
    </Grid.Row>
  );
};

export default VendingMachineOwner;
