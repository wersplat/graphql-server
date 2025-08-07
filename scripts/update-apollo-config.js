#!/usr/bin/env node

/**
 * Script to update Apollo Server configuration to use generated schema
 */

const fs = require('fs');
const path = require('path');

function updateApolloConfig() {
  console.log('🔧 Updating Apollo Server configuration...\n');

  try {
    const indexPath = path.join(__dirname, '../src/index.ts');
    let content = fs.readFileSync(indexPath, 'utf8');

    // Update schema import to use generated schema
    content = content.replace(
      /const typeDefs = readFileSync\(join\(__dirname, 'schema\.graphql'\), 'utf8'\);/,
      `const typeDefs = readFileSync(join(__dirname, 'schema-generated.graphql'), 'utf8');`
    );

    // Add import for generated resolvers
    content = content.replace(
      /import { matchResolvers } from '\.\/resolvers\/match';/,
      `import { matchResolvers } from './resolvers/match';
import { generatedResolvers } from './resolvers/generated';`
    );

    // Update resolvers to include generated resolvers
    content = content.replace(
      /Query: {\s*\.\.\.userResolvers\.Query,\s*\.\.\.matchResolvers\.Query\s*},/,
      `Query: {
    ...userResolvers.Query,
    ...matchResolvers.Query,
    ...generatedResolvers.Query
  },`
    );

    content = content.replace(
      /Mutation: {\s*\.\.\.userResolvers\.Mutation,\s*\.\.\.matchResolvers\.Mutation\s*},/,
      `Mutation: {
    ...userResolvers.Mutation,
    ...matchResolvers.Mutation,
    ...generatedResolvers.Mutation
  },`
    );

    // Add additional scalar resolvers for the generated schema
    const additionalScalars = `
  JSON: {
    __serialize(value: any) {
      return value;
    },
    __parseValue(value: any) {
      return value;
    },
    __parseLiteral(ast: any) {
      if (ast.kind === 'StringValue') {
        return JSON.parse(ast.value);
      }
      return null;
    }
  },
  BigInt: {
    __serialize(value: any) {
      return value;
    },
    __parseValue(value: any) {
      return value;
    },
    __parseLiteral(ast: any) {
      if (ast.kind === 'StringValue') {
        return ast.value;
      }
      return null;
    }
  },
  BigFloat: {
    __serialize(value: any) {
      return value;
    },
    __parseValue(value: any) {
      return value;
    },
    __parseLiteral(ast: any) {
      if (ast.kind === 'StringValue') {
        return ast.value;
      }
      return null;
    }
  }`;

    // Insert additional scalars before the closing brace of scalarResolvers
    content = content.replace(
      /(\s+}\s+};)/,
      `${additionalScalars}$1`
    );

    // Write the updated content back
    fs.writeFileSync(indexPath, content);
    console.log('✅ Apollo Server configuration updated successfully!');
    console.log('📁 Updated: src/index.ts');
    console.log('\n🔧 Changes made:');
    console.log('  - Schema changed from schema.graphql to schema-generated.graphql');
    console.log('  - Added import for generated resolvers');
    console.log('  - Merged generated resolvers into Query and Mutation');
    console.log('  - Added JSON, BigInt, and BigFloat scalar resolvers');

  } catch (error) {
    console.error('❌ Error updating Apollo Server configuration:', error.message);
    process.exit(1);
  }
}

updateApolloConfig();
