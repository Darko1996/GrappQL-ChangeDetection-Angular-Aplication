import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache, split } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const uri = environment.apiUrl;

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const http = httpLink.create({
    uri: environment.apiUrl,
    withCredentials: true,
  });

  const ws = new WebSocketLink({
    uri: `wss://api-staging.csgoroll.com/graphql`,
    options: {
      reconnect: true,
    },
  });

  const link = split(
    ({ query }) => {
      const data = getMainDefinition(query);
      return data.kind === 'OperationDefinition' && data.operation === 'subscription';
    },
    ws,
    http
  );

  return {
    link: link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
