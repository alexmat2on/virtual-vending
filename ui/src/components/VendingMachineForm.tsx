import React from 'react';
import { Header, Divider, Segment, Form, Button, Grid } from 'semantic-ui-react';
import Ledger from '@daml/ledger';
import { Vending } from '@daml-ts/virtual-vending-0.1.0/lib/Vending';
import { useParty } from '@daml/react';
import { httpBaseUrl, wsBaseUrl } from '../config';
import { computeCredentials } from '../Credentials';

/**
 * React component to edit a list of `Party`s.
 */
const VendingMachineForm: React.FC = () => {
    const [newPrice, setNewPrice] = React.useState("0");
    const [newQuantity, setNewQuantity] = React.useState("0");
    const [newCustomers, setNewCustomers] = React.useState("");
    const owner = useParty();
    const credentials = computeCredentials(owner);
    let ledger = new Ledger({token: credentials?.token ?? "", httpBaseUrl, wsBaseUrl});

    const handleCreateMachine = async () => {
        const vending = {
            owner: owner,
            customers: newCustomers.split(','),
            stock: newQuantity,
            price: newPrice,
            pending: "0",
            balance: "0"
        }
        if (ledger) {
            const vendingContract = await ledger.create(Vending, vending);
            console.log("Creating vending with: ", vending, vendingContract);
        }
    }
        
  return (
    <Segment>
    <Header as='h2'>
      <Header.Content>
        Create a Vending Machine
      </Header.Content>
    </Header>
    <Divider />
    <Grid centered columns={2}>
        <Grid.Row>
            <Grid.Column>
                <Form onSubmit={handleCreateMachine}>
                <Form.Input
                    fluid
                    label="Price per drink"
                    className='test-select-follow-input'
                    placeholder="Set a price for each item."
                    value={newPrice}
                    onChange={(event) => setNewPrice(event.currentTarget.value)}
                />

                <Form.Input
                    fluid
                    label="Initial quantity"
                    className='test-select-follow-input'
                    placeholder="Stock this many items."
                    value={newQuantity}
                    onChange={(event) => setNewQuantity(event.currentTarget.value)}
                />

                <Form.Input
                    fluid
                    className='test-select-follow-input'
                    placeholder="Add some customers who can use your machine."
                    value={newCustomers}
                    onChange={(event) => setNewCustomers(event.currentTarget.value)}
                />

                <Button
                    type='submit'
                    className='test-select-follow-button'>
                    Create Machine
                </Button>
                </Form>
            </Grid.Column>
        </Grid.Row>
    </Grid>
  </Segment>
  );
};

export default VendingMachineForm;
