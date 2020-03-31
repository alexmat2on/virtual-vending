import React from 'react';
import { Container, Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { User } from '@daml-ts/virtual-vending-0.1.0/lib/User';
import { Vending } from '@daml-ts/virtual-vending-0.1.0/lib/Vending';
import { useParty, useStreamFetchByKey, useStreamQuery } from '@daml/react';
import UserInfo from './UserInfo';
import VendingMachineForm from './VendingMachineForm';
import VendingMachine from './VendingMachine';

const MainView: React.FC = () => {
  const username = useParty();
  const myUserResult = useStreamFetchByKey(User, () => username, [username]);
  const myUser = myUserResult.contract?.payload;
  const allMachines = useStreamQuery(Vending).contracts;
  let machine = allMachines[0]?.payload;
  console.log("All machines", allMachines);

  return (
    <Container>
      <Grid centered columns={2}>
        <Grid.Row stretched>
          <Grid.Column>
            <Header as='h1' size='huge' color='blue' textAlign='center' style={{padding: '1ex 0em 0ex 0em'}}>
                {myUser ? `Welcome, ${myUser.user}!` : 'Loading...'}
            </Header>

            <Segment>
              <Header as='h2'>
                <Icon name='user' />
                <Header.Content>
                  {myUser?.user ?? 'Loading...'}
                  <Header.Subheader>My Pocket</Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
              <UserInfo
                coins={myUser?.balance ?? "0"}
                sodas={myUser?.sodas ?? "0"}
              />
            </Segment>

            {
              machine ? 
              <VendingMachine 
                machine={machine}
                userResult={myUserResult}
                showOwnerTools={ username === machine.owner }
              />
              :
              <VendingMachineForm />
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default MainView;
