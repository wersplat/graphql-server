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

    // Track generated types to avoid duplicates
    const generatedTypes = new Map();
    const generatedEnums = new Map();
    const generatedInputs = new Map();

    // First pass: collect all type names to handle references
    const allTypeNames = new Set();
    schema.types.forEach(type => {
      if (type.name && !type.name.startsWith('__')) {
        allTypeNames.add(type.name);
      }
    });

    // Process each type
    schema.types.forEach(type => {
      if (type.name && type.name.startsWith('__')) return; // Skip introspection types

      if (type.kind === 'ENUM' && type.enumValues && !generatedEnums.has(type.name)) {
        // Generate enum
        const enumValues = type.enumValues.map(enumValue => {
          if (enumValue.name) {
            const validEnumName = convertToValidIdentifier(enumValue.name);
            return `  ${validEnumName} = '${enumValue.name}'`;
          }
          return null;
        }).filter(Boolean);
        
        generatedEnums.set(type.name, enumValues);
      } else if (type.kind === 'INPUT_OBJECT' && type.inputFields && !generatedInputs.has(type.name)) {
        // Generate input type
        const fields = type.inputFields.map(field => {
          if (field.name && field.type) {
            const fieldType = getTypeScriptType(field.type, allTypeNames);
            const optional = field.type.kind === 'NON_NULL' ? '' : '?';
            return `  ${field.name}${optional}: ${fieldType};`;
          }
          return null;
        }).filter(Boolean);
        
        generatedInputs.set(type.name, fields);
      } else if (type.kind === 'OBJECT' && type.fields && !generatedTypes.has(type.name)) {
        // Generate object type
        const fields = type.fields.map(field => {
          if (field.name && field.type) {
            const fieldType = getTypeScriptType(field.type, allTypeNames);
            const optional = field.type.kind === 'NON_NULL' ? '' : '?';
            return `  ${field.name}${optional}: ${fieldType};`;
          }
          return null;
        }).filter(Boolean);
        
        generatedTypes.set(type.name, fields);
      }
    });

    // Generate the code
    let enumsCode = '';
    let typesCode = '';
    let inputsCode = '';

    // Generate enums
    generatedEnums.forEach((enumValues, enumName) => {
      enumsCode += `export enum ${enumName} {\n${enumValues.join(',\n')}\n}\n\n`;
    });

    // Generate object types
    generatedTypes.forEach((fields, typeName) => {
      typesCode += `export interface ${typeName} {\n${fields.join('\n')}\n}\n\n`;
    });

    // Generate input types
    generatedInputs.forEach((fields, inputName) => {
      inputsCode += `export interface ${inputName} {\n${fields.join('\n')}\n}\n\n`;
    });

    // Generate common filter types
    const filtersCode = `// Common filter types used by pg_graphql
export interface StringFilter {
  eq?: string;
  neq?: string;
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
  in?: string[];
  like?: string;
  ilike?: string;
  is?: FilterIs;
}

export interface IntFilter {
  eq?: number;
  neq?: number;
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
  in?: number[];
  is?: FilterIs;
}

export interface FloatFilter {
  eq?: number;
  neq?: number;
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
  in?: number[];
  is?: FilterIs;
}

export interface BooleanFilter {
  eq?: boolean;
  neq?: boolean;
  is?: FilterIs;
}

export interface UUIDFilter {
  eq?: string;
  neq?: string;
  in?: string[];
  is?: FilterIs;
}

export interface DateTimeFilter {
  eq?: Date;
  neq?: Date;
  gt?: Date;
  gte?: Date;
  lt?: Date;
  lte?: Date;
  in?: Date[];
  is?: FilterIs;
}

export interface DateFilter {
  eq?: Date;
  neq?: Date;
  gt?: Date;
  gte?: Date;
  lt?: Date;
  lte?: Date;
  in?: Date[];
  is?: FilterIs;
}

export interface BigIntFilter {
  eq?: string;
  neq?: string;
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
  in?: string[];
  is?: FilterIs;
}

export interface BigFloatFilter {
  eq?: string;
  neq?: string;
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
  in?: string[];
  is?: FilterIs;
}

export interface IDFilter {
  eq?: string;
  neq?: string;
  in?: string[];
  is?: FilterIs;
}

export enum FilterIs {
  NULL = 'null',
  NOT_NULL = 'not_null'
}

// Common enum filters
export interface player_positionFilter {
  eq?: player_position;
  neq?: player_position;
  in?: player_position[];
  is?: FilterIs;
}

export interface stageFilter {
  eq?: stage;
  neq?: stage;
  in?: stage[];
  is?: FilterIs;
}

export interface salary_tierFilter {
  eq?: salary_tier;
  neq?: salary_tier;
  in?: salary_tier[];
  is?: FilterIs;
}

export interface app_roleFilter {
  eq?: app_role;
  neq?: app_role;
  in?: app_role[];
  is?: FilterIs;
}

// Common interface for Node types
export interface Node {
  id: string;
}

`;

    // Write the generated types
    const outputPath = 'src/types/generated.ts';
    const fullCode = `// Auto-generated TypeScript types from GraphQL introspection
// Generated on: ${new Date().toISOString()}

${filtersCode}
${enumsCode}
${typesCode}
${inputsCode}
`;

    fs.writeFileSync(outputPath, fullCode);
    console.log(`✅ Generated types saved to ${outputPath}`);

    // Generate a summary
    console.log('\n📊 Generated:');
    console.log(`  - Object types: ${generatedTypes.size}`);
    console.log(`  - Enum types: ${generatedEnums.size}`);
    console.log(`  - Input types: ${generatedInputs.size}`);
    console.log(`  - Filter types: Added common filter types`);

  } catch (error) {
    console.error('❌ Error generating types:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

function convertToValidIdentifier(name) {
  // Convert spaces and special characters to valid TypeScript identifier
  return name
    .replace(/[^a-zA-Z0-9_]/g, '_') // Replace non-alphanumeric chars with underscore
    .replace(/^[0-9]/, '_$&') // Prefix with underscore if starts with number
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .replace(/^_|_$/g, '') // Remove leading/trailing underscores
    .toUpperCase(); // Convert to uppercase for enum convention
}

function getTypeScriptType(graphqlType, allTypeNames) {
  if (!graphqlType) return 'any';
  
  if (graphqlType.kind === 'NON_NULL') {
    return getTypeScriptType(graphqlType.ofType, allTypeNames);
  } else if (graphqlType.kind === 'LIST') {
    return `${getTypeScriptType(graphqlType.ofType, allTypeNames)}[]`;
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
    // Check if the type name exists in our schema
    if (allTypeNames.has(graphqlType.name)) {
      return graphqlType.name;
    } else {
      // If it's a filter type that doesn't exist, use a generic approach
      if (graphqlType.name.endsWith('Filter')) {
        return 'any'; // We'll handle these with the common filter types above
      }
      return 'any';
    }
  } else {
    return 'any';
  }
}

generateTypeScriptTypes();
