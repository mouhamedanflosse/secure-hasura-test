
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  // schema: 'https://relaxed-dane-76.hasura.app/v1/graphql',
  schema:  [
    {
      'https://relaxed-dane-76.hasura.app/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': 'DvINEDBVS67eUhURrPECkUIr8IyWvydlnPGvUXML1anbLFrwe9arZXJUcuqXeuxZ',
        },
      },
    },
  ],
  documents: "src/**/*.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular'],
      config: {
        addExplicitOverride: true
      },
    }
  }
};

export default config;
