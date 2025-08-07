/**
 * Start both GraphQL servers for comparison
 * 
 * This script starts both the original verbose server and the clean server
 * on different ports so you can compare them side by side.
 */

const { spawn } = require('child_process');
const { exec } = require('child_process');

console.log('🚀 Starting GraphQL Servers for Comparison...\n');

// Start the original verbose server on port 4000
console.log('📊 Starting Original Verbose Server (port 4000)...');
const originalServer = spawn('node', ['dist/index.js'], {
  stdio: 'pipe',
  env: {
    ...process.env,
    PORT: '4000',
    NODE_ENV: 'development'
  }
});

originalServer.stdout.on('data', (data) => {
  console.log(`[ORIGINAL] ${data.toString().trim()}`);
});

originalServer.stderr.on('data', (data) => {
  console.error(`[ORIGINAL ERROR] ${data.toString()}`);
});

// Start the clean server on port 4001
console.log('✨ Starting Clean GraphQL Server (port 4001)...');
const cleanServer = spawn('node', ['dist/clean-server.js'], {
  stdio: 'pipe',
  env: {
    ...process.env,
    PORT: '4001',
    NODE_ENV: 'development'
  }
});

cleanServer.stdout.on('data', (data) => {
  console.log(`[CLEAN] ${data.toString().trim()}`);
});

cleanServer.stderr.on('data', (data) => {
  console.error(`[CLEAN ERROR] ${data.toString()}`);
});

// Wait a moment for servers to start
setTimeout(() => {
  console.log('\n🎉 Both servers are running!');
  console.log('\n📊 Server URLs:');
  console.log('   Original (Verbose): http://localhost:4000/graphql');
  console.log('   Clean:              http://localhost:4001/graphql');
  console.log('\n🔍 Health Checks:');
  console.log('   Original: http://localhost:4000/health');
  console.log('   Clean:    http://localhost:4001/health');
  console.log('\n📚 Documentation:');
  console.log('   Clean API Guide: README_CLEAN_API.md');
  console.log('   Full Documentation: CLEAN_GRAPHQL_API.md');
  console.log('   Examples: examples/clean-vs-verbose-comparison.js');
  console.log('\n💡 Try these example queries:');
  console.log('   Original: playersCollection { edges { node { gamertag player_rp } } }');
  console.log('   Clean:    players { items { gamertag playerRp } }');
  console.log('\n⏹️  Press Ctrl+C to stop both servers\n');
}, 3000);

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down servers...');
  originalServer.kill('SIGTERM');
  cleanServer.kill('SIGTERM');
  
  setTimeout(() => {
    console.log('✅ Servers stopped');
    process.exit(0);
  }, 1000);
});

// Handle server crashes
originalServer.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ Original server crashed with code ${code}`);
  }
});

cleanServer.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ Clean server crashed with code ${code}`);
  }
});
