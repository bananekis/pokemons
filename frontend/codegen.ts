import { CodegenConfig } from '@graphql-codegen/cli';
import { uri } from './config';

const config: CodegenConfig = {
  schema: uri,
  documents: ['./graphql/**/*.gql'],
  generates: {
    './graphql/__generated__/types.generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
};

export default config;
