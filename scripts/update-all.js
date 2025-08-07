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

    // 4. Generate resolver stubs
    console.log('\n4. Generating resolver stubs...');
    execSync('node scripts/generate-resolvers.js', { stdio: 'inherit' });

    // 5. Update Apollo Server configuration
    console.log('\n5. Updating Apollo Server configuration...');
    execSync('node scripts/update-apollo-config.js', { stdio: 'inherit' });

    console.log('\n✅ All updates completed successfully!');
    console.log('\n📁 Generated files:');
    console.log('  - src/types/generated.ts');
    console.log('  - src/schema-generated.graphql');
    console.log('  - src/resolvers/generated.ts');
    console.log('  - Updated src/index.ts');
    console.log('  - complete-schema-introspection.json');
    console.log('  - schema-summary.json');

    console.log('\n🔧 Next steps:');
    console.log('  1. Review and customize the generated resolvers');
    console.log('  2. Test your GraphQL server with the new schema');
    console.log('  3. Update your frontend queries to match the new schema');

  } catch (error) {
    console.error('❌ Error during update process:', error.message);
  }
}

updateAll();
