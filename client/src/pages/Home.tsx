import React from 'react';
import { useQuery } from 'urql';
import CustomTable from '../components/customTable';

const BLOCKS_QUERY = `
  {
    returnAllBlocks(time: 0) {
      height,
      time,
      hash
    }
  }
`;

function Home() {
  const [result] = useQuery({
    query: BLOCKS_QUERY,
  });

  const { data, fetching, error } = result;

  const columns = React.useMemo(
    () => [
      {
        Header: 'Hash',
        accessor: 'hash',
      },
      {
        Header: 'Height',
        accessor: 'height',
      },
      {
        Header: 'Time',
        accessor: 'time',
      },
    ],
    []
  );

  return fetching ? (
    <p>Loading....</p>
  ) : data?.returnAllBlocks ? (
    <CustomTable
      columns={columns}
      data={data?.returnAllBlocks.map((data: any) => {
        const time = parseInt(data.time) * 1000;
        return {
          ...data,
          time: new Date(time).toLocaleString(),
        };
      })}
      home={true}
    />
  ) : (
    <p>{error?.message}</p>
  );
}

export default Home;
