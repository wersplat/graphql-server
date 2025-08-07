#!/usr/bin/env node

/**
 * Script to generate TypeScript types from GraphQL introspection results
 */

const fs = require('fs');

function generateTypeScriptTypes() {
  console.log('🔧 Generating TypeScript types from introspection...\n');

  try {
    // Read the introspection results
    const introspectionData = JSON.parse(fs.readFileSync('complete-schema-introspection.json', 'utf8'));
    const schema = introspectionData.schema;

    if (!schema) {
      console.error('❌ No schema data found in introspection results');
      return;
    }

    let typesCode = '';
    let enumsCode = '';
    let inputsCode = '';

    // Process each type
    schema.types.forEach(type => {
      if (type.name && type.name.startsWith('__')) return; // Skip introspection types

      if (type.kind === 'ENUM' && type.enumValues) {
        // Generate enum
        enumsCode += `export enum ${type.name} {\n`;
        type.enumValues.forEach(enumValue => {
          if (enumValue.name) {
            enumsCode += `  ${enumValue.name.toUpperCase()} = '${enumValue.name}',\n`;
          }
        });
        enumsCode += `}\n\n`;
      } else if (type.kind === 'INPUT_OBJECT' && type.inputFields) {
        // Generate input type
        inputsCode += `export interface ${type.name}Input {\n`;
        type.inputFields.forEach(field => {
          if (field.name && field.type) {
            const fieldType = getTypeScriptType(field.type);
            const optional = field.type.kind === 'NON_NULL' ? '' : '?';
            inputsCode += `  ${field.name}${optional}: ${fieldType};\n`;
          }
        });
        inputsCode += `}\n\n`;
      } else if (type.kind === 'OBJECT' && type.fields) {
        // Generate object type
        typesCode += `export interface ${type.name} {\n`;
        type.fields.forEach(field => {
          if (field.name && field.type) {
            const fieldType = getTypeScriptType(field.type);
            const optional = field.type.kind === 'NON_NULL' ? '' : '?';
            typesCode += `  ${field.name}${optional}: ${fieldType};\n`;
          }
        });
        typesCode += `}\n\n`;
      }
    });

    // Write the generated types
    const outputPath = 'src/types/generated.ts';
    const fullCode = `// Auto-generated TypeScript types from GraphQL introspection
// Generated on: ${new Date().toISOString()}

${enumsCode}
${typesCode}
${inputsCode}
`;

    fs.writeFileSync(outputPath, fullCode);
    console.log(`✅ Generated types saved to ${outputPath}`);

    // Generate a summary
    const objectTypes = schema.types.filter(t => t.kind === 'OBJECT' && t.name && !t.name.startsWith('__'));
    const enumTypes = schema.types.filter(t => t.kind === 'ENUM' && t.name);
    const inputTypes = schema.types.filter(t => t.kind === 'INPUT_OBJECT' && t.name);

    console.log('\n📊 Generated:');
    console.log(`  - Object types: ${objectTypes.length}`);
    console.log(`  - Enum types: ${enumTypes.length}`);
    console.log(`  - Input types: ${inputTypes.length}`);

  } catch (error) {
    console.error('❌ Error generating types:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

function getTypeScriptType(graphqlType) {
  if (!graphqlType) return 'any';
  
  if (graphqlType.kind === 'NON_NULL') {
    return getTypeScriptType(graphqlType.ofType);
  } else if (graphqlType.kind === 'LIST') {
    return `${getTypeScriptType(graphqlType.ofType)}[]`;
  } else if (graphqlType.kind === 'SCALAR') {
    switch (graphqlType.name) {
      case 'String': return 'string';
      case 'Int': return 'number';
      case 'Float': return 'number';
      case 'Boolean': return 'boolean';
      case 'ID': return 'string';
      case 'DateTime': return 'Date';
      case 'UUID': return 'string';
      case 'BigFloat': return 'string';
      case 'BigInt': return 'string';
      case 'Date': return 'Date';
      case 'JSON': return 'any';
      case 'JSONObject': return 'any';
      case 'Time': return 'string';
      case 'Timestamptz': return 'Date';
      case 'UUID': return 'string';
      default: return 'any';
    }
  } else if (graphqlType.name) {
    return graphqlType.name;
  } else {
    return 'any';
  }
}

generateTypeScriptTypes();
