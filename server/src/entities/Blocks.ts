import { Field, Int, ObjectType } from 'type-graphql';

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
}
