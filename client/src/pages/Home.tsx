import React from 'react';
import Select from 'react-select';
import { Box, Text, Flex } from '@chakra-ui/react';

import Queries from '../utils/queries';
import CustomTable from '../components/customTable';
import Spinner from '../components/spinner';

const BLOCKS_QUERY = `
  query returnAllBlocks($time: Float!) {
    returnAllBlocks(time: $time) {
      height,
      time,
      hash
    }
  }
`;

const getMilliSeconds = (value?: number) => {
  let date;
  if (value) {
    date = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * value);
  } else date = new Date();
  return `${Date.parse(date.toISOString())}`;
};

const options = [
  { value: getMilliSeconds(), label: 'Today' },
  { value: getMilliSeconds(1), label: 'Yesterday' },
  { value: getMilliSeconds(2), label: '2 days ago' },
  { value: getMilliSeconds(3), label: '3 days ago' },
  { value: getMilliSeconds(4), label: '4 days ago' },
  { value: getMilliSeconds(5), label: '5 days ago' },
  { value: getMilliSeconds(6), label: '6 days ago' },
  { value: getMilliSeconds(7), label: 'Last week' },
  { value: getMilliSeconds(30), label: 'Last month' },
];

function Home() {
  const [selectedOption, setSelectedOption] = React.useState({
    value: getMilliSeconds(),
    label: 'Today',
  });

  const { data, fetching, error } = Queries({
    query: BLOCKS_QUERY,
    variables: { name: 'time', value: Number(selectedOption?.value) },
  });

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };

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

  return (
    <Box paddingTop='50px' px='2rem'>
      {fetching ? (
        <Spinner />
      ) : data?.returnAllBlocks ? (
        <>
          <Flex marginTop='2rem' alignContent='center'>
            <Text alignSelf='center' px='1rem'>
              Select a day
            </Text>
            <Box width='150px'>
              <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
              />
            </Box>
          </Flex>
          <Flex flexDir='column'>
            <Text padding='2rem 1rem 1rem'>
              Showing Data for{' '}
              <Text as='span' fontWeight={600}>
                {selectedOption.label}
              </Text>
            </Text>

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
          </Flex>
        </>
      ) : (
        <Text color='red' textAlign='center' marginTop='20vh' fontSize='2rem'>
          {error?.message}
        </Text>
      )}
    </Box>
  );
}

export default Home;
