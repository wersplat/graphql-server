#!/usr/bin/env node

/**
 * Script to update GraphQL schema from introspection results
 */

const fs = require('fs');

function updateSchema() {
  console.log('🔧 Updating GraphQL schema from introspection...\n');

  try {
    // Read the introspection results
    const introspectionData = JSON.parse(fs.readFileSync('complete-schema-introspection.json', 'utf8'));
    const schema = introspectionData.schema;

    if (!schema) {
      console.error('❌ No schema data found in introspection results');
      return;
    }

    let schemaContent = `# Auto-generated GraphQL Schema from pg_graphql introspection
# Generated on: ${new Date().toISOString()}
# 
# This schema is automatically generated from the Supabase pg_graphql schema.
# Manual edits may be overwritten when regenerating.

# Custom scalar definitions
"""
Custom scalar for handling UUID values.
"""
scalar UUID

"""
Custom scalar for handling date and time values in ISO 8601 format.
"""
scalar DateTime

"""
Custom scalar for handling date values.
"""
scalar Date

"""
Custom scalar for handling big integers.
"""
scalar BigInt

"""
Custom scalar for handling big floats.
"""
scalar BigFloat

"""
Custom scalar for handling JSON values.
"""
scalar JSON

# Filter types
"""
Filter for UUID fields
"""
input UUIDFilterInput {
  eq: UUID
  neq: UUID
  in: [UUID!]
  nin: [UUID!]
  is: FilterIs
}

"""
Filter for String fields
"""
input StringFilterInput {
  eq: String
  neq: String
  in: [String!]
  nin: [String!]
  like: String
  ilike: String
  is: FilterIs
}

"""
Filter for Int fields
"""
input IntFilterInput {
  eq: Int
  neq: Int
  in: [Int!]
  nin: [Int!]
  gt: Int
  gte: Int
  lt: Int
  lte: Int
  is: FilterIs
}

"""
Filter for Float fields
"""
input FloatFilterInput {
  eq: Float
  neq: Float
  in: [Float!]
  nin: [Float!]
  gt: Float
  gte: Float
  lt: Float
  lte: Float
  is: FilterIs
}

"""
Filter for Boolean fields
"""
input BooleanFilterInput {
  eq: Boolean
  neq: Boolean
  is: FilterIs
}

"""
Filter for DateTime fields
"""
input DateTimeFilterInput {
  eq: DateTime
  neq: DateTime
  in: [DateTime!]
  nin: [DateTime!]
  gt: DateTime
  gte: DateTime
  lt: DateTime
  lte: DateTime
  is: FilterIs
}

"""
Filter for Date fields
"""
input DateFilterInput {
  eq: Date
  neq: Date
  in: [Date!]
  nin: [Date!]
  gt: Date
  gte: Date
  lt: Date
  lte: Date
  is: FilterIs
}

"""
Filter for BigInt fields
"""
input BigIntFilterInput {
  eq: BigInt
  neq: BigInt
  in: [BigInt!]
  nin: [BigInt!]
  gt: BigInt
  gte: BigInt
  lt: BigInt
  lte: BigInt
  is: FilterIs
}

"""
Filter for BigFloat fields
"""
input BigFloatFilterInput {
  eq: BigFloat
  neq: BigFloat
  in: [BigFloat!]
  nin: [BigFloat!]
  gt: BigFloat
  gte: BigFloat
  lt: BigFloat
  lte: BigFloat
  is: FilterIs
}

"""
Filter for JSON fields
"""
input JSONFilterInput {
  eq: JSON
  neq: JSON
  is: FilterIs
}

# Common types
"""
Page information for pagination
"""
type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

"""
Filter is enum
"""
enum FilterIs {
  NULL
  NOT_NULL
}

`;

    // Helper function to convert to valid GraphQL identifier
    function toValidGraphQLIdentifier(name) {
      return name
        .replace(/[^a-zA-Z0-9_]/g, '_') // Replace non-alphanumeric chars with underscore
        .replace(/^[0-9]/, '_$&') // Prefix with underscore if starts with number
        .replace(/_+/g, '_') // Replace multiple underscores with single
        .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
    }

    // Track processed types to avoid duplicates
    const processedTypes = new Set();
    const processedEnums = new Set();

    // Generate schema content
    if (schema.types) {
      // First pass: generate enums
      schema.types.forEach(type => {
        if (type.name && !type.name.startsWith('__') && type.kind === 'ENUM' && type.enumValues && !processedEnums.has(type.name)) {
          processedEnums.add(type.name);
          schemaContent += `"""
Enum for ${type.name}
"""
enum ${type.name} {
`;
          type.enumValues.forEach(enumValue => {
            const validName = toValidGraphQLIdentifier(enumValue.name);
            schemaContent += `  """
  ${enumValue.name}
  """
  ${validName}
`;
          });
          schemaContent += `}

`;
        }
      });

      // Second pass: generate object types
      schema.types.forEach(type => {
        if (type.name && !type.name.startsWith('__') && type.kind === 'OBJECT' && type.fields && !processedTypes.has(type.name)) {
          processedTypes.add(type.name);
          
          // Deduplicate fields
          const fieldMap = new Map();
          type.fields.forEach(field => {
            if (!fieldMap.has(field.name)) {
              const fieldType = getGraphQLType(field.type);
              const args = field.args && field.args.length > 0 
                ? `(${field.args.map(arg => `${arg.name}: ${getGraphQLType(arg.type)}`).join(', ')})`
                : '';
              fieldMap.set(field.name, `  """
  ${field.name}
  """
  ${field.name}${args}: ${fieldType}`);
            }
          });

          schemaContent += `"""
Type for ${type.name}
"""
type ${type.name} {
${Array.from(fieldMap.values()).join('\n')}
}

`;
        }
      });

      // Third pass: generate input types
      schema.types.forEach(type => {
        if (type.name && !type.name.startsWith('__') && type.kind === 'INPUT_OBJECT' && type.inputFields && !processedTypes.has(type.name)) {
          processedTypes.add(type.name);
          
          // Deduplicate input fields
          const fieldMap = new Map();
          type.inputFields.forEach(field => {
            if (!fieldMap.has(field.name)) {
              const fieldType = getGraphQLType(field.type);
              fieldMap.set(field.name, `  """
  ${field.name}
  """
  ${field.name}: ${fieldType}`);
            }
          });

          schemaContent += `"""
Input type for ${type.name}
"""
input ${type.name} {
${Array.from(fieldMap.values()).join('\n')}
}

`;
        }
      });
    }

    // Helper function to get GraphQL type
    function getGraphQLType(type) {
      if (!type) return 'String';
      
      if (type.kind === 'NON_NULL') {
        return `${getGraphQLType(type.ofType)}!`;
      }
      
      if (type.kind === 'LIST') {
        return `[${getGraphQLType(type.ofType)}]`;
      }
      
      if (type.kind === 'SCALAR') {
        switch (type.name) {
          case 'String': return 'String';
          case 'Int': return 'Int';
          case 'Float': return 'Float';
          case 'Boolean': return 'Boolean';
          case 'ID': return 'ID';
          case 'UUID': return 'UUID';
          case 'DateTime': return 'DateTime';
          case 'Date': return 'Date';
          case 'BigInt': return 'BigInt';
          case 'BigFloat': return 'BigFloat';
          case 'JSON': return 'JSON';
          default: return 'String';
        }
      }
      
      return type.name || 'String';
    }

    // Write the generated schema
    fs.writeFileSync('src/schema-generated.graphql', schemaContent);
    console.log('✅ Generated schema saved to src/schema-generated.graphql');

  } catch (error) {
    console.error('❌ Error updating schema:', error.message);
    process.exit(1);
  }
}

updateSchema();
