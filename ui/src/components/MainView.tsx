import React, { useMemo } from 'react';
import { Container, Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { Party } from '@daml/types';
import { User } from '@daml-ts/virtual-vending-0.1.0/lib/User';
import { Vending } from '@daml-ts/virtual-vending-0.1.0/lib/Vending';
import { useParty, useExerciseByKey, useStreamFetchByKey, useStreamQuery } from '@daml/react';
import UserInfo from './UserInfo';
import VendingMachine from './VendingMachine';

const MainView: React.FC = () => {
  const username = useParty();
  const myUserResult = useStreamFetchByKey(User, () => username, [username]);
  const myUser = myUserResult.contract?.payload;
  const allMachines = useStreamQuery(Vending).contracts;
  let machine = allMachines[0]?.payload;
  console.log("All machines", allMachines);

  // // Sorted list of users that are following the current user
  // const followers = useMemo(() =>
  //   allUsers
  //   .map(user => user.payload)
  //   .filter(user => user.username !== username)
  //   .sort((x, y) => x.username.localeCompare(y.username)),
  //   [allUsers, username]);

  // const exerciseFollow = useExerciseByKey(User.Follow);

  // const follow = async (userToFollow: Party): Promise<boolean> => {
  //   try {
  //     await exerciseFollow(username, {userToFollow});
  //     return true;
  //   } catch (error) {
  //     alert("Unknown error:\n" + JSON.stringify(error));
  //     return false;
  //   }
  // }

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
            <Segment>
              <Header as='h2'>
                <Icon name='shopping cart' />
                <Header.Content>
                  The Vending Machine
                </Header.Content>
              </Header>
              <Divider />
              <VendingMachine 
                stock={machine?.stock ?? "0"}
                price={machine?.price ?? "0"}
                pending={machine?.pending ?? "0"}
                balance={machine?.balance ?? "0"}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default MainView;
