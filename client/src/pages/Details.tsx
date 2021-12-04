import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flex, Box, Text } from '@chakra-ui/react';
import { useQuery } from 'urql';

import CustomTable from '../components/customTable';

const BLOCKS_QUERY = `
  query returnBlock($hash: String!) {
    returnBlock(hash: $hash){
        block_index,
        size,
        prev_block,
        tx {
          hash,
          size,
          weight,
          fee,
          time,
          block_index
        }
    }          
  }
`;

function Details(props: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const hash = query.get('hash');

  console.log('props>>', props);
  const [result] = useQuery({
    query: BLOCKS_QUERY,
    variables: {
      hash: `${hash}`,
    },
  });

  const { data, fetching, error } = result;

  const columns = React.useMemo(
    () => [
      {
        Header: 'Hash',
        accessor: 'hash',
      },
      {
        Header: 'Size',
        accessor: 'size',
      },
      {
        Header: 'Weight',
        accessor: 'weight',
      },
      {
        Header: 'Fee',
        accessor: 'fee',
      },
      {
        Header: 'Time',
        accessor: 'time',
      },
      {
        Header: 'Block Index',
        accessor: 'block_index',
      },
    ],
    []
  );

  return (
    <Box>
      <Text
        onClick={() =>
          navigate('/', {
            replace: true,
          })
        }
        cursor='pointer'
      >
        Back to Home
      </Text>
      {fetching ? (
        <p>Loading</p>
      ) : data?.returnBlock ? (
        <Flex flexDir='column'>
          <Text>
            <strong>Hash </strong>
            {hash}
          </Text>
          <Text>
            <strong>Block Index </strong>
            {data?.returnBlock?.block_index}
          </Text>
          <Text>
            <strong>Previous Block </strong>
            {data?.returnBlock?.prev_block}
          </Text>
          <Text>
            <strong>Size </strong>
            {data?.returnBlock?.size}
          </Text>

          <Text>Block Transaction </Text>
          <CustomTable
            columns={columns}
            data={data?.returnBlock?.tx.map((data: any) => {
              const time = parseInt(data.time) * 1000;
              return {
                ...data,
                time: new Date(time).toLocaleString(),
              };
            })}
          />
        </Flex>
      ) : (
        <p>{error?.message}</p>
      )}
    </Box>
  );
}

export default Details;
