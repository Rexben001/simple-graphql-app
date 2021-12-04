import supertest from 'supertest';

const baseURL = supertest('http://localhost:3333/graphql');

describe('GET Request (returnAllBlocks)', () => {
  const list_blocks = {
    query: `query returnAllBlocks {
              returnAllBlocks(time: 0) {
                height,
                block_index,
                hash
              }
            }`,
    operationName: 'returnAllBlocks',
  };

  it('get the list of current blocks ', async () => {
    const { status } = await baseURL.post('?').send(list_blocks);
    expect(status).toBe(200);
  });
});

describe('GET Request (returnBlock)', () => {
  const block = {
    query: `query returnBlock{
              returnBlock(hash: "0000000000000000000efcea1cc1a169955e9cf6f039ddeabfdd1da1ac6d9899"){
                  block_index,
                size,
                prev_block
                }
            }`,
    operationName: 'returnBlock',
  };

  const block2 = {
    query: `query returnBlock{
              returnBlock(){
                  block_index,
                size,
                prev_block
                }
            }`,
    operationName: 'returnBlock',
  };

  const block3 = {
    query: `query returnBlock{
              returnBlock(hash: "0000000000000000000efcea1cc1a169955e9cf6f039ddeabfdd1da1ac6d9892"){
                  block_index,
                size,
                prev_block
                }
            }`,
    operationName: 'returnBlock',
  };

  const block4 = {
    query: `query returnBlock{
              returnBlock(hash: "cc1a169955e9cf6f039ddeabfdd1da1ac6d9892"){
              block_index,
                size,
                prev_block
                }
            }`,
    operationName: 'returnBlock',
  };

  it('gets block details using valid hash', async () => {
    const { body, status } = await baseURL.post('?').send(block);
    expect(status).toBe(200);
    expect(body.data.returnBlock.block_index).toBe(603966);
    expect(body.data.returnBlock.size).toBe(1265708);
  });

  it('gets invalid syntax', async () => {
    const { body } = await baseURL.post('?').send(block2);

    expect(body.errors[0].message).toBe(
      'Syntax Error: Expected Name, found ")".'
    );
  });

  it('gets item not found', async () => {
    const { body } = await baseURL.post('?').send(block3);
    expect(body.errors[0].message).toBe('Item not found or argument invalid');
  });

  it('gets invalid hash value', async () => {
    const { body } = await baseURL.post('?').send(block4);

    expect(body.errors[0].message).toBe(
      'Invalid hash value, it must be a string of SHA256'
    );
  });
});
