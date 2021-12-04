import { ApolloError } from 'apollo-server-errors';

export class ErrorResponse {
  constructor(error: {
    response?: {
      data: {
        message: string;
      };
      status: string;
    };
    message?: string;
  }) {
    if (error.response) {
      const { data, status } = error.response;
      throw new ApolloError(data.message, status);
    } else if (error?.message?.includes('Invalid hash value')) {
      throw new ApolloError(error.message, '422');
    }
    throw new ApolloError(error.message || '', '500');
  }
}
