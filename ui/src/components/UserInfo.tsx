import React from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';
import MultiItems from './MultiItems';

type Props = {
  coins: string;
  sodas: string;
}

const UserInfo: React.FC<Props> = ({coins, sodas}) => {
  return (
    <Container>
      <Grid centered columns={2}>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <b>Quarters</b><br />
              {coins}
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <b>Sodas</b><br />
              <MultiItems num={sodas} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default UserInfo;
