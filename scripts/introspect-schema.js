#!/usr/bin/env node

/**
 * Script to introspect the pg_graphql schema and get everything
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase configuration');
  process.exit(1);
}

async function introspectSchema() {
  console.log('🔍 Introspecting complete pg_graphql schema...\n');

  const graphqlEndpoint = `${supabaseUrl}/graphql/v1`;
  const results = {};

  try {
    // 1. Get the complete schema
    console.log('1. Getting complete schema...');
    const schemaResponse = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        query: `
          query IntrospectionQuery {
            __schema {
              queryType {
                name
                fields {
                  name
                  description
                  args {
                    name
                    description
                    type {
                      name
                      kind
                      ofType {
                        name
                        kind
                      }
                    }
                    defaultValue
                  }
                  type {
                    name
                    kind
                    ofType {
                      name
                      kind
                      ofType {
                        name
                        kind
                      }
                    }
                  }
                }
              }
              mutationType {
                name
                fields {
                  name
                  description
                  args {
                    name
                    description
                    type {
                      name
                      kind
                      ofType {
                        name
                        kind
                      }
                    }
                    defaultValue
                  }
                  type {
                    name
                    kind
                    ofType {
                      name
                      kind
                    }
                  }
                }
              }
              subscriptionType {
                name
                fields {
                  name
                  description
                  args {
                    name
                    description
                    type {
                      name
                      kind
                      ofType {
                        name
                        kind
                      }
                    }
                    defaultValue
                  }
                  type {
                    name
                    kind
                    ofType {
                      name
                      kind
                    }
                  }
                }
              }
              types {
                name
                description
                kind
                fields {
                  name
                  description
                  args {
                    name
                    description
                    type {
                      name
                      kind
                      ofType {
                        name
                        kind
                      }
                    }
                    defaultValue
                  }
                  type {
                    name
                    kind
                    ofType {
                      name
                      kind
                      ofType {
                        name
                        kind
                      }
                    }
                  }
                }
                inputFields {
                  name
                  description
                  type {
                    name
                    kind
                    ofType {
                      name
                      kind
                    }
                  }
                  defaultValue
                }
                enumValues {
                  name
                  description
                  isDeprecated
                  deprecationReason
                }
                interfaces {
                  name
                  kind
                }
                possibleTypes {
                  name
                  kind
                }
              }
              directives {
                name
                description
                locations
                args {
                  name
                  description
                  type {
                    name
                    kind
                    ofType {
                      name
                      kind
                    }
                  }
                  defaultValue
                }
              }
            }
          }
        `
      })
    });

    const schemaResult = await schemaResponse.json();
    results.schema = schemaResult.data?.__schema;

    if (results.schema) {
      console.log('✅ Complete schema retrieved');

      // 2. Display all types
      console.log('\n2. All available types:');
      const types = results.schema.types.filter(type => type.name && !type.name.startsWith('__'));
      types.forEach(type => {
        console.log(`  - ${type.name} (${type.kind})`);
        if (type.description) {
          console.log(`    Description: ${type.description}`);
        }
      });

      // 3. Display queries
      if (results.schema.queryType) {
        console.log('\n3. Available queries:');
        results.schema.queryType.fields.forEach(field => {
          console.log(`  - ${field.name}`);
          if (field.description) {
            console.log(`    Description: ${field.description}`);
          }
          if (field.args && field.args.length > 0) {
            console.log(`    Arguments: ${field.args.map(arg => `${arg.name}: ${arg.type.name || arg.type.ofType?.name}`).join(', ')}`);
          }
        });
      }

      // 4. Display mutations
      if (results.schema.mutationType) {
        console.log('\n4. Available mutations:');
        results.schema.mutationType.fields.forEach(field => {
          console.log(`  - ${field.name}`);
          if (field.description) {
            console.log(`    Description: ${field.description}`);
          }
          if (field.args && field.args.length > 0) {
            console.log(`    Arguments: ${field.args.map(arg => `${arg.name}: ${arg.type.name || arg.type.ofType?.name}`).join(', ')}`);
          }
        });
      }

      // 5. Display subscriptions
      if (results.schema.subscriptionType) {
        console.log('\n5. Available subscriptions:');
        results.schema.subscriptionType.fields.forEach(field => {
          console.log(`  - ${field.name}`);
          if (field.description) {
            console.log(`    Description: ${field.description}`);
          }
          if (field.args && field.args.length > 0) {
            console.log(`    Arguments: ${field.args.map(arg => `${arg.name}: ${arg.type.name || arg.type.ofType?.name}`).join(', ')}`);
          }
        });
      }

      // 6. Detailed field information for main types
      console.log('\n6. Detailed field information for main types:');
      const mainTypes = ['players', 'matches', 'teams', 'events', 'badges', 'users'];
      
      for (const typeName of mainTypes) {
        const type = types.find(t => t.name === typeName);
        if (type && type.fields) {
          console.log(`\n${typeName.toUpperCase()} fields:`);
          type.fields.forEach(field => {
            console.log(`  - ${field.name}: ${field.type.name || field.type.ofType?.name || 'Unknown'}`);
            if (field.description) {
              console.log(`    Description: ${field.description}`);
            }
            if (field.args && field.args.length > 0) {
              console.log(`    Arguments: ${field.args.map(arg => `${arg.name}: ${arg.type.name || arg.type.ofType?.name}`).join(', ')}`);
            }
          });
        }
      }

      // 7. Save complete results to file
      fs.writeFileSync('complete-schema-introspection.json', JSON.stringify(results, null, 2));
      console.log('\n✅ Complete schema introspection saved to complete-schema-introspection.json');

      // 8. Generate a summary report
      const summary = {
        totalTypes: types.length,
        queries: results.schema.queryType?.fields?.length || 0,
        mutations: results.schema.mutationType?.fields?.length || 0,
        subscriptions: results.schema.subscriptionType?.fields?.length || 0,
        directives: results.schema.directives?.length || 0,
        mainTypes: mainTypes.filter(typeName => types.find(t => t.name === typeName))
      };

      fs.writeFileSync('schema-summary.json', JSON.stringify(summary, null, 2));
      console.log('✅ Schema summary saved to schema-summary.json');

      console.log('\n📊 Schema Summary:');
      console.log(`  - Total types: ${summary.totalTypes}`);
      console.log(`  - Queries: ${summary.queries}`);
      console.log(`  - Mutations: ${summary.mutations}`);
      console.log(`  - Subscriptions: ${summary.subscriptions}`);
      console.log(`  - Directives: ${summary.directives}`);
      console.log(`  - Main types found: ${summary.mainTypes.join(', ')}`);

    } else {
      console.error('❌ Failed to retrieve schema');
    }

  } catch (error) {
    console.error('❌ Error introspecting schema:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

introspectSchema();
