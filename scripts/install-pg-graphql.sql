-- Install and enable pg_graphql extension in Supabase
-- Run this in your Supabase SQL Editor

-- Enable the pg_graphql extension
CREATE EXTENSION IF NOT EXISTS pg_graphql;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA graphql TO anon;
GRANT USAGE ON SCHEMA graphql TO authenticated;
GRANT USAGE ON SCHEMA graphql TO service_role;

-- Verify the extension is installed
SELECT * FROM pg_extension WHERE extname = 'pg_graphql';

-- Test the graphql.resolve function
SELECT graphql.resolve('
  query IntrospectionQuery {
    __schema {
      types {
        name
      }
    }
  }
'::text, '{}'::jsonb);

-- Show available tables in the GraphQL schema
SELECT graphql.resolve('
  query {
    __type(name: "Query") {
      fields {
        name
        type {
          name
        }
      }
    }
  }
'::text, '{}'::jsonb);
