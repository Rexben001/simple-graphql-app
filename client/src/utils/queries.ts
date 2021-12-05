import React from 'react';
import { useQuery } from 'urql';

const Queries = ({
  query,
  variables,
}: {
  query: string;
  variables: {
    name: string;
    value: number | string;
  };
}) => {
  const { name, value } = variables;
  const variablesMemo = React.useMemo(
    () => ({
      [name]: value,
    }),
    [name, value]
  );

  const [result] = useQuery({
    query,
    variables: variablesMemo,
    requestPolicy: 'cache-first',
  });

  return result;
};

export default Queries;
