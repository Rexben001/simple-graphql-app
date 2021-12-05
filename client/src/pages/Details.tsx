import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flex, Box, Text, IconButton, Divider } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

import Queries from '../utils/queries';
import CustomTable from '../components/customTable';
import Spinner from '../components/spinner';

const BLOCK_QUERY = `
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

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const hash = query.get('hash');

  const { data, fetching, error } = Queries({
    query: BLOCK_QUERY,
    variables: { name: 'hash', value: `${hash}` },
  });

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

  const DisplayDetails = ({
    name,
    data,
  }: {
    name: string;
    data: number | string;
  }) => (
    <>
      <Flex p='.5rem 2rem' justifyContent='space-between'>
        <Text color='#718096' fontWeight={600}>
          {name}
        </Text>
        <Text textAlign='left'>{data}</Text>
      </Flex>
      <Divider orientation='horizontal' />
    </>
  );

  return (
    <Box pt='60px' px='2rem'>
      <Flex
        onClick={() =>
          navigate('/', {
            replace: true,
          })
        }
        cursor='pointer'
      >
        <IconButton
          icon={<ChevronLeftIcon h={6} w={6} />}
          aria-label='back'
          backgroundColor='rgb(242, 246, 255)'
          border='none'
        />
        <Text alignSelf='center' pl='.2rem'>
          Back to Homepage
        </Text>
      </Flex>

      {fetching ? (
        <Spinner />
      ) : data?.returnBlock ? (
        <Flex flexDir='column'>
          <Flex
            flexDir='column'
            bg='#e8f0fe'
            padding='1rem'
            borderRadius='6px'
            mt='1rem'
          >
            <DisplayDetails name='Hash' data={hash || ''} />
            <DisplayDetails
              name=' Block Index'
              data={data?.returnBlock?.block_index || ''}
            />
            <DisplayDetails
              name='Previous Block'
              data={data?.returnBlock?.prev_block || ''}
            />
            <DisplayDetails
              name='Size'
              data={`${data?.returnBlock?.size} bytes` || ''}
            />
          </Flex>

          <Flex mx='2rem' flexDir='column' mt='1rem'>
            <Text textTransform='uppercase' fontWeight={600} color='#718096'>
              Block Transactions
            </Text>
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
        </Flex>
      ) : (
        <Text color='red' textAlign='center' marginTop='20vh' fontSize='2rem'>
          {error?.message}
        </Text>
      )}
    </Box>
  );
};

export default Details;
