const fs = require('fs');
const path = require('path');

console.log('🔨 Building GraphQL server...');

// Copy schema files
try {
  // Copy the main schema file (this is what index.ts uses)
  const schemaSrcPath = path.join(__dirname, '..', 'src', 'schema.graphql');
  const schemaDestPath = path.join(__dirname, '..', 'dist', 'schema.graphql');
  
  // Ensure dist directory exists
  const distDir = path.dirname(schemaDestPath);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  if (fs.existsSync(schemaSrcPath)) {
    fs.copyFileSync(schemaSrcPath, schemaDestPath);
    console.log('✅ Main schema file copied successfully');
  } else {
    console.log('❌ Main schema file not found!');
    process.exit(1);
  }
  
  // Copy the generated schema file (for reference/backup)
  const generatedSrcPath = path.join(__dirname, '..', 'src', 'schema-generated.graphql');
  const generatedDestPath = path.join(__dirname, '..', 'dist', 'schema-generated.graphql');
  
  if (fs.existsSync(generatedSrcPath)) {
    fs.copyFileSync(generatedSrcPath, generatedDestPath);
    console.log('✅ Generated schema file copied successfully');
  } else {
    console.log('⚠️  Generated schema file not found, skipping...');
  }

  // Copy the clean schema file (for reference/backup)
  const cleanSrcPath = path.join(__dirname, '..', 'src', 'schema-clean.graphql');
  const cleanDestPath = path.join(__dirname, '..', 'dist', 'schema-clean.graphql');
  
  if (fs.existsSync(cleanSrcPath)) {
    fs.copyFileSync(cleanSrcPath, cleanDestPath);
    console.log('✅ Clean schema file copied successfully');
  } else {
    console.log('⚠️  Clean schema file not found, skipping...');
  }
  
} catch (error) {
  console.error('❌ Error copying schema files:', error);
  process.exit(1);
}

console.log('🎉 Build completed successfully!'); 