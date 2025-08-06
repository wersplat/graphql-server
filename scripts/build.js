const fs = require('fs');
const path = require('path');

console.log('🔨 Building GraphQL server...');

// Copy schema file
try {
  const srcPath = path.join(__dirname, '..', 'src', 'schema.graphql');
  const destPath = path.join(__dirname, '..', 'dist', 'schema.graphql');
  
  // Ensure dist directory exists
  const distDir = path.dirname(destPath);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  fs.copyFileSync(srcPath, destPath);
  console.log('✅ Schema file copied successfully');
} catch (error) {
  console.error('❌ Error copying schema file:', error);
  process.exit(1);
}

console.log('🎉 Build completed successfully!'); 