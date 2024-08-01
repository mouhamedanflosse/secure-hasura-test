import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpHeaders } from '@angular/common/http';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaGFzdXJhLTViMTgzIiwiYXVkIjoiaGFzdXJhLTViMTgzIiwiYXV0aF90aW1lIjoxNzIyNDU5NTEzLCJ1c2VyX2lkIjoib3RhbmxLbXYxSGRmd1RLUlJrR3lCOTZacm9vMiIsInN1YiI6Im90YW5sS212MUhkZndUS1JSa0d5Qjk2WnJvbzIiLCJpYXQiOjE3MjI1MDc3ODIsImV4cCI6MTcyMjUxMTM4MiwiZW1haWwiOiJkdWlkQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJkdWlkQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn0sImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciJdLCJ4LWhhc3VyYS11c2VyLWlkIjoib3RhbmxLbXYxSGRmd1RLUlJrR3lCOTZacm9vMiJ9fQ.VERiMDrLPv7osdRSIPB7QbsmOsry_v6jla4PxIvd6oQ'

// --------------headers with admin secret and jwt token
// const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('x-hasura-admin-secret', 'DvINEDBVS67eUhURrPECkUIr8IyWvydlnPGvUXML1anbLFrwe9arZXJUcuqXeuxZ')

//---------------- headers only with the jwt token
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)



const uri = 'https://relaxed-dane-76.hasura.app/v1/graphql'; // <-- add the URL of the GraphQL server here
export function apolloOptionsFactory(): ApolloClientOptions<any> {

  const httpLink = inject(HttpLink);
  return {
    // remove to headers if you want it to be treated as an anonymous request
    link: httpLink.create({ uri,headers }),
    cache: new InMemoryCache(),
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];
