#!/usr/bin/env node

/**
 * Script to update GraphQL schema from introspection results
 */

const fs = require('fs');

function updateGraphQLSchema() {
  console.log('🔧 Updating GraphQL schema from introspection...\n');

  try {
    // Read the introspection results
    const introspectionData = JSON.parse(fs.readFileSync('complete-schema-introspection.json', 'utf8'));
    const schema = introspectionData.schema;

    if (!schema) {
      console.error('❌ No schema data found in introspection results');
      return;
    }

    let schemaCode = `# Auto-generated GraphQL Schema from pg_graphql introspection
# Generated on: ${new Date().toISOString()}
# 
# This schema is automatically generated from the Supabase pg_graphql schema.
# Manual edits may be overwritten when regenerating.

`;

    // Add custom scalars
    schemaCode += `"""
Custom scalar for handling date and time values in ISO 8601 format.
"""
scalar DateTime

"""
Custom scalar for handling UUID values.
"""
scalar UUID

"""
Custom scalar for handling JSON values.
"""
scalar JSON

"""
Custom scalar for handling JSON object values.
"""
scalar JSONObject

"""
Custom scalar for handling big integers.
"""
scalar BigInt

"""
Custom scalar for handling big floats.
"""
scalar BigFloat

"""
Custom scalar for handling time values.
"""
scalar Time

"""
Custom scalar for handling timestamp with timezone values.
"""
scalar Timestamptz

`;

    // Process each type
    schema.types.forEach(type => {
      if (type.name && type.name.startsWith('__')) return; // Skip introspection types

      if (type.kind === 'ENUM' && type.enumValues) {
        // Generate enum
        schemaCode += `"""
${type.description || `Enum for ${type.name}`}
"""
enum ${type.name} {\n`;
        type.enumValues.forEach(enumValue => {
          if (enumValue.name) {
            schemaCode += `  """
  ${enumValue.description || enumValue.name}
  """
  ${enumValue.name}\n`;
          }
        });
        schemaCode += `}\n\n`;
      } else if (type.kind === 'INPUT_OBJECT' && type.inputFields) {
        // Generate input type
        schemaCode += `"""
${type.description || `Input type for ${type.name}`}
"""
input ${type.name}Input {\n`;
        type.inputFields.forEach(field => {
          if (field.name && field.type) {
            const fieldType = getGraphQLType(field.type);
            const optional = field.type.kind === 'NON_NULL' ? '!' : '';
            schemaCode += `  """
  ${field.description || field.name}
  """
  ${field.name}: ${fieldType}${optional}\n`;
          }
        });
        schemaCode += `}\n\n`;
      } else if (type.kind === 'OBJECT' && type.fields) {
        // Generate object type
        schemaCode += `"""
${type.description || `Type for ${type.name}`}
"""
type ${type.name} {\n`;
        type.fields.forEach(field => {
          if (field.name && field.type) {
            const fieldType = getGraphQLType(field.type);
            const optional = field.type.kind === 'NON_NULL' ? '!' : '';
            schemaCode += `  """
  ${field.description || field.name}
  """
  ${field.name}: ${fieldType}${optional}\n`;
          }
        });
        schemaCode += `}\n\n`;
      }
    });

    // Write the generated schema
    const outputPath = 'src/schema-generated.graphql';
    fs.writeFileSync(outputPath, schemaCode);
    console.log(`✅ Generated schema saved to ${outputPath}`);

  } catch (error) {
    console.error('❌ Error updating schema:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

function getGraphQLType(graphqlType) {
  if (!graphqlType) return 'String';
  
  if (graphqlType.kind === 'NON_NULL') {
    return getGraphQLType(graphqlType.ofType);
  } else if (graphqlType.kind === 'LIST') {
    return `[${getGraphQLType(graphqlType.ofType)}]`;
  } else if (graphqlType.name) {
    return graphqlType.name;
  } else {
    return 'String';
  }
}

updateGraphQLSchema();
