# Benjamin-Ajewole-Coding-Challenge

### How to start App

Clone this repo `git clone https://github.com/NuriCareers/Benjamin-Ajewole-Coding-Challenge`

Install both frontend and backend packages `make install-packages`

Start up backend GraphQL server `make start-backend`

Start up frontend app `make start-frontend`

Alternatively, you can run it with docker

Run `make start-docker`

GraphQL playground `http://localhost:3333/graphql`
React App `http://localhost:3000/`

#### Run tests

Make sure your server is running before running your test cases

Then run `make test`

### Tech stack

GraphQL
React
TypeScript
Urql
ApolloServer
Docker
Jest
Axios
Supertest
### Caching?

I implemented client caching using `Urql`. If I had more time, I would have used Redis on the backend.

### Hosting?

- Deploy backend on AWS EC2 using CloudFormation templates that supports Auto-Scaling and Load Balancing

- Deploy frontend on AWS S3 and CloudFront or Netlify
