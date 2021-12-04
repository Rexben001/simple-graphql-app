import { Resolver, Query, Arg } from 'type-graphql';
import { Blocks } from '../entities/Blocks';
import axios from 'axios';
import { ErrorResponse } from '../utils/errors';

@Resolver()
export class BlocksResolver {
  @Query(() => [Blocks])
  async returnAllBlocks(@Arg('time') time: number) {
    try {
      if (!time) {
        const date: Date = new Date(); // today's date and time in ISO format
        time = Date.parse(date.toISOString());
        console.log('Here');
      }
      const { data } = await axios.get(
        `https://blockchain.info/blocks/${time}?format=json`
      );
      return data;
    } catch (error) {
      return new ErrorResponse(error);
    }
  }

  @Query((_returns) => Blocks)
  async returnBlock(@Arg('hash') hash: string) {
    const regexExp = /^[a-f0-9]{64}$/gi.test(hash);

    try {
      if (!regexExp) {
        throw new Error('Invalid hash value, it must be a string of SHA256');
      }
      const { data } = await axios.get(
        `https://blockchain.info/rawblock/${hash}`
      );
      return data;
    } catch (error) {
      return new ErrorResponse(error);
    }
  }
}
