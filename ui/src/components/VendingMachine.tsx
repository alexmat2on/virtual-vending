import React from 'react';
import { Segment, Header, Icon, Divider } from 'semantic-ui-react';
import { Container, Grid } from 'semantic-ui-react';
import { ContractId } from '@daml/types';
import { User } from '@daml-ts/virtual-vending-0.1.0/lib/User';
import VendingMachineInfo from './VendingMachineInfo';
import { Vending } from '@daml-ts/virtual-vending-0.1.0/lib/Vending';
import { useParty, useExerciseByKey } from '@daml/react'
import VendingMachineOwner from './VendingMachineOwner';

type Props = {
  machine: Vending;
  userResult: any;
  showOwnerTools: boolean;
}

/**
 * React component to edit a list of `Party`s.
 */
const VendingMachine: React.FC<Props> = ({ machine, userResult, showOwnerTools }) => {
  const owner = machine.owner;

  const exerciseInsertCoin = useExerciseByKey(Vending.InsertCoin);
  const insertCoin = async (customerUser: ContractId<User>): Promise<boolean> => {
    try {
      await exerciseInsertCoin(owner, { customerUser });
      return true;
    } catch (error) {
      alert("EIC Error:\n" + JSON.stringify(error));
      return false;
    }
  }

  const exerciseDispense = useExerciseByKey(Vending.Dispense);
  const dispenseSoda = async (customerUser: ContractId<User>): Promise<boolean> => {
    try {
      await exerciseDispense(owner, { customerUser });
      return true;
    } catch (error) {
      alert("EIC Error:\n" + JSON.stringify(error));
      return false;
    }
  }

  const exerciseCancel = useExerciseByKey(Vending.Abort);
  const cancel = async (customerUser: ContractId<User>): Promise<boolean> => {
    try {
      await exerciseCancel(owner, { customerUser });
      return true;
    } catch (error) {
      alert("EIC Error:\n" + JSON.stringify(error));
      return false;
    }
  }

  const exerciseRestock = useExerciseByKey(Vending.Restock);
  const restock = async (amount: string): Promise<boolean> => {
    try {
      await exerciseRestock(owner, { amount });
      return true;
    } catch (error) {
      alert("ER Error:\n" + JSON.stringify(error));
      return false;
    }
  }

  const exerciseCollect = useExerciseByKey(Vending.Collect);
  const collect = async (ownerUser: ContractId<User>): Promise<boolean> => {
    try {
      await exerciseCollect(owner, { ownerUser });
      return true;
    } catch (error) {
      alert("EColl Error:\n" + JSON.stringify(error));
      return false;
    }
  }

  const exerciseDisclose = useExerciseByKey(Vending.Disclose);
  const disclose = async (newCustomer: ContractId<User>): Promise<boolean> => {
    try {
      await exerciseDisclose(owner, { newCustomer });
      return true;
    } catch (error) {
      alert("ED Error:\n" + JSON.stringify(error));
      return false;
    }
  }

  const userID = userResult?.contract?.contractId ?? undefined

  return (
    <Segment>
      <Header as='h2'>
        <Icon name='shopping cart' />
        <Header.Content>
          {machine?.owner ?? ""}'s Vending Machine
      </Header.Content>
      </Header>
      <Divider />
      <Container>
        <Grid centered columns={4}>
          <VendingMachineInfo
            stock={machine?.stock ?? "0"}
            price={machine?.price ?? "0"}
            pending={machine?.pending ?? "0"}
            balance={machine?.balance ?? "0"}
            userID={userID}
            onInsertCoin={insertCoin}
            onDispense={dispenseSoda}
            onCancel={cancel}
          />
          { showOwnerTools ? 
          <VendingMachineOwner 
            userID={userID} 
            onRestock={restock} 
            onCollect={collect}
            onShare={disclose}
          /> : <></> }
        </Grid>
      </Container>
    </Segment>
  );
};

export default VendingMachine;
