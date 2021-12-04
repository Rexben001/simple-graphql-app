import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
class Transaction {
  @Field()
  hash: string;
  @Field(() => Int)
  size: string;
  @Field(() => Int)
  weight: string;
  @Field(() => Int)
  fee: string;
  @Field()
  time: number;
  @Field(() => Int)
  block_index: number;
}

@ObjectType()
export class Blocks {
  @Field()
  hash: string;
  @Field(() => Int)
  height: number;
  @Field()
  time: string;
  @Field(() => Int)
  block_index: number;
  @Field(() => Int)
  size: number;
  @Field()
  prev_block: string;
  @Field(() => [Transaction])
  tx: [Transaction];
}
