import React from 'react';
import { Icon } from 'semantic-ui-react';

type Props = {
  num: string;
}

/**
 * React component to edit a list of `Party`s.
 */
const MultiItems: React.FC<Props> = ({ num }) => {
  let n = Number(num);
  let range = Array.from(Array(n).keys());
  const result = range.map(() =>
    <Icon name="beer"></Icon>
  );

  return (
    <>
    {result}
    </>
  );
};

export default MultiItems;
