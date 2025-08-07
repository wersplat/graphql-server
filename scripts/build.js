const fs = require('fs');
const path = require('path');

console.log('🔨 Building GraphQL server...');

// Copy schema files
try {
  // Copy the original schema file
  const srcPath = path.join(__dirname, '..', 'src', 'schema.graphql');
  const destPath = path.join(__dirname, '..', 'dist', 'schema.graphql');
  
  // Ensure dist directory exists
  const distDir = path.dirname(destPath);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  fs.copyFileSync(srcPath, destPath);
  console.log('✅ Original schema file copied successfully');
  
  // Copy the generated schema file
  const generatedSrcPath = path.join(__dirname, '..', 'src', 'schema-generated.graphql');
  const generatedDestPath = path.join(__dirname, '..', 'dist', 'schema-generated.graphql');
  
  if (fs.existsSync(generatedSrcPath)) {
    fs.copyFileSync(generatedSrcPath, generatedDestPath);
    console.log('✅ Generated schema file copied successfully');
  } else {
    console.log('⚠️  Generated schema file not found, skipping...');
  }
  
} catch (error) {
  console.error('❌ Error copying schema files:', error);
  process.exit(1);
}

console.log('🎉 Build completed successfully!'); 