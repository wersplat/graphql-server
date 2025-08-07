#!/usr/bin/env node

/**
 * Master script to update everything from introspection results
 */

const { execSync } = require('child_process');

async function updateAll() {
  console.log('🚀 Updating everything from GraphQL introspection...\n');

  try {
    // 1. Run introspection
    console.log('1. Running introspection...');
    execSync('node scripts/introspect-schema.js', { stdio: 'inherit' });

    // 2. Generate TypeScript types
    console.log('\n2. Generating TypeScript types...');
    execSync('node scripts/generate-types.js', { stdio: 'inherit' });

    // 3. Update GraphQL schema
    console.log('\n3. Updating GraphQL schema...');
    execSync('node scripts/update-schema.js', { stdio: 'inherit' });

    // 4. Update resolvers
    console.log('\n4. Generating resolver stubs...');
    execSync('node scripts/update-resolvers.js', { stdio: 'inherit' });

    console.log('\n✅ All updates completed successfully!');
    console.log('\n📁 Generated files:');
    console.log('  - src/types/generated.ts');
    console.log('  - src/schema-generated.graphql');
    console.log('  - src/resolvers/generated.ts');
    console.log('  - complete-schema-introspection.json');
    console.log('  - schema-summary.json');

  } catch (error) {
    console.error('❌ Error during update process:', error.message);
  }
}

updateAll();
