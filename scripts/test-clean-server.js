/**
 * Test script for the Clean GraphQL Server
 * 
 * This script tests that the clean server can start and respond to basic queries.
 */

const { spawn } = require('child_process');
const fetch = require('node-fetch');

async function testCleanServer() {
  console.log('🧪 Testing Clean GraphQL Server...\n');

  // Start the clean server
  const server = spawn('node', ['dist/clean-server.js'], {
    stdio: 'pipe',
    env: {
      ...process.env,
      PORT: '4001', // Use a different port to avoid conflicts
      NODE_ENV: 'test'
    }
  });

  let serverReady = false;
  let serverOutput = '';

  server.stdout.on('data', (data) => {
    const output = data.toString();
    serverOutput += output;
    console.log(`[SERVER] ${output.trim()}`);
    
    if (output.includes('Clean GraphQL Server ready')) {
      serverReady = true;
    }
  });

  server.stderr.on('data', (data) => {
    console.error(`[SERVER ERROR] ${data.toString()}`);
  });

  // Wait for server to start
  await new Promise((resolve) => {
    const checkReady = () => {
      if (serverReady) {
        resolve();
      } else {
        setTimeout(checkReady, 100);
      }
    };
    checkReady();
  });

  console.log('\n✅ Server started successfully!\n');

  try {
    // Test health endpoint
    console.log('🏥 Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:4001/health');
    const healthData = await healthResponse.json();
    
    if (healthResponse.ok && healthData.status === 'ok') {
      console.log('✅ Health endpoint working');
    } else {
      console.log('❌ Health endpoint failed:', healthData);
    }

    // Test root endpoint
    console.log('\n🏠 Testing root endpoint...');
    const rootResponse = await fetch('http://localhost:4001/');
    const rootData = await rootResponse.json();
    
    if (rootResponse.ok && rootData.message) {
      console.log('✅ Root endpoint working');
      console.log(`   Message: ${rootData.message}`);
    } else {
      console.log('❌ Root endpoint failed:', rootData);
    }

    // Test GraphQL endpoint with introspection
    console.log('\n📊 Testing GraphQL endpoint...');
    const graphqlResponse = await fetch('http://localhost:4001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query IntrospectionQuery {
            __schema {
              queryType {
                name
                fields {
                  name
                  type {
                    name
                  }
                }
              }
            }
          }
        `
      })
    });

    const graphqlData = await graphqlResponse.json();
    
    if (graphqlResponse.ok && graphqlData.data) {
      console.log('✅ GraphQL endpoint working');
      console.log(`   Query type: ${graphqlData.data.__schema.queryType.name}`);
      console.log(`   Available fields: ${graphqlData.data.__schema.queryType.fields.length}`);
    } else {
      console.log('❌ GraphQL endpoint failed:', graphqlData);
    }

    // Test a simple query
    console.log('\n🔍 Testing simple query...');
    const queryResponse = await fetch('http://localhost:4001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query TestQuery {
            regions {
              id
              name
            }
          }
        `
      })
    });

    const queryData = await queryResponse.json();
    
    if (queryResponse.ok) {
      if (queryData.errors) {
        console.log('⚠️  Query returned errors (expected for regions without data):', queryData.errors[0].message);
      } else {
        console.log('✅ Simple query working');
        console.log(`   Regions found: ${queryData.data.regions.length}`);
      }
    } else {
      console.log('❌ Simple query failed:', queryData);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  // Stop the server
  console.log('\n🛑 Stopping server...');
  server.kill('SIGTERM');
  
  await new Promise((resolve) => {
    server.on('close', (code) => {
      console.log(`✅ Server stopped (code: ${code})`);
      resolve();
    });
  });

  console.log('\n🎉 Clean GraphQL Server test completed!');
}

// Run the test
testCleanServer().catch(console.error);
