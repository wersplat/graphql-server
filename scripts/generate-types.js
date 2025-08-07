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

    let typesContent = '';
    const processedTypes = new Set();
    const processedEnums = new Set();

    // Helper function to convert to valid TypeScript identifier
    function toValidIdentifier(name) {
      return name
        .replace(/[^a-zA-Z0-9_]/g, '_') // Replace non-alphanumeric chars with underscore
        .replace(/^[0-9]/, '_$&') // Prefix with underscore if starts with number
        .replace(/_+/g, '_') // Replace multiple underscores with single
        .replace(/^_|_$/g, '') // Remove leading/trailing underscores
        .toUpperCase(); // Convert to uppercase for enum convention
    }

    // Helper function to get proper TypeScript type
    function getTypeScriptType(type) {
      if (!type) return 'any';
      
      if (type.kind === 'NON_NULL') {
        return getTypeScriptType(type.ofType);
      }
      
      if (type.kind === 'LIST') {
        return `${getTypeScriptType(type.ofType)}[]`;
      }
      
      if (type.kind === 'SCALAR') {
        switch (type.name) {
          case 'String': return 'string';
          case 'Int': return 'number';
          case 'Float': return 'number';
          case 'Boolean': return 'boolean';
          case 'ID': return 'string';
          case 'UUID': return 'string';
          case 'DateTime': return 'Date';
          case 'Date': return 'Date';
          case 'BigInt': return 'string';
          case 'BigFloat': return 'string';
          case 'JSON': return 'any';
          default: return 'any';
        }
      }
      
      if (type.kind === 'ENUM') {
        return type.name;
      }
      
      return type.name || 'any';
    }

    // Helper function to get proper filter type for 'in' property
    function getFilterInType(baseType) {
      if (baseType.endsWith('[]')) {
        return baseType; // Already an array type
      }
      
      // For enum types, use the enum name
      if (['stage', 'player_position', 'salary_tier', 'app_role', 'event_tier', 'event_type', 'leagues', 'award_types'].includes(baseType)) {
        return `${baseType}[]`;
      }
      
      // For scalar types, use the appropriate array type
      switch (baseType) {
        case 'string': return 'string[]';
        case 'number': return 'number[]';
        case 'boolean': return 'boolean[]';
        case 'Date': return 'Date[]';
        default: return 'any[]';
      }
    }

    // Generate filter interfaces first
    const filterTypes = [];
    
    // Basic filter types
    const basicFilters = [
      { name: 'StringFilter', type: 'string' },
      { name: 'IntFilter', type: 'number' },
      { name: 'FloatFilter', type: 'number' },
      { name: 'BooleanFilter', type: 'boolean' },
      { name: 'UUIDFilter', type: 'string' },
      { name: 'DateTimeFilter', type: 'Date' },
      { name: 'DateFilter', type: 'Date' },
      { name: 'BigIntFilter', type: 'string' },
      { name: 'BigFloatFilter', type: 'string' },
      { name: 'IDFilter', type: 'string' }
    ];

    basicFilters.forEach(filter => {
      filterTypes.push(`export interface ${filter.name} {
  eq?: ${filter.type};
  neq?: ${filter.type};
  ${filter.name === 'StringFilter' || filter.name === 'IntFilter' || filter.name === 'FloatFilter' || filter.name === 'BigIntFilter' || filter.name === 'BigFloatFilter' ? `gt?: ${filter.type};
  gte?: ${filter.type};
  lt?: ${filter.type};
  lte?: ${filter.type};` : ''}
  in?: ${getFilterInType(filter.type)};
  ${filter.name === 'StringFilter' ? `like?: string;
  ilike?: string;` : ''}
  is?: FilterIs;
}`);
    });

    // Enum filter types
    const enumFilters = [
      { name: 'player_positionFilter', type: 'player_position' },
      { name: 'stageFilter', type: 'stage' },
      { name: 'salary_tierFilter', type: 'salary_tier' },
      { name: 'app_roleFilter', type: 'app_role' }
    ];

    enumFilters.forEach(filter => {
      filterTypes.push(`export interface ${filter.name} {
  eq?: ${filter.type};
  neq?: ${filter.type};
  in?: ${filter.type}[];
  is?: FilterIs;
}`);
    });

    // Add filter types to content
    typesContent += filterTypes.join('\n\n') + '\n\n';

    // Add Node interface
    typesContent += `export interface Node {
  id: string;
}

`;

    // Generate enums
    const enums = [];
    
    // FilterIs enum
    enums.push(`export enum FilterIs {
  NULL = 'NULL',
  NOT_NULL = 'NOT_NULL'
}`);

    // OrderByDirection enum
    enums.push(`export enum OrderByDirection {
  ASCNULLSFIRST = 'AscNullsFirst',
  ASCNULLSLAST = 'AscNullsLast',
  DESCNULLSFIRST = 'DescNullsFirst',
  DESCNULLSLAST = 'DescNullsLast'
}`);

    // Add other enums from schema (with deduplication and filtering)
    if (schema.types) {
      schema.types.forEach(type => {
        if (type.kind === 'ENUM' && 
            !processedEnums.has(type.name) && 
            type.name !== 'FilterIs' && 
            type.name !== 'OrderByDirection' &&
            !type.name.startsWith('__')) { // Skip introspection types
          processedEnums.add(type.name);
          
          const enumValues = type.enumValues?.map(enumValue => 
            `  ${toValidIdentifier(enumValue.name)} = '${enumValue.name}'`
          ).join(',\n') || '';
          
          if (enumValues) {
            enums.push(`export enum ${type.name} {
${enumValues}
}`);
          }
        }
      });
    }

    typesContent += enums.join('\n\n') + '\n\n';

    // Generate interfaces (with field deduplication)
    if (schema.types) {
      schema.types.forEach(type => {
        if (type.kind === 'OBJECT' && 
            !processedTypes.has(type.name) && 
            !type.name.startsWith('__')) { // Skip introspection types
          processedTypes.add(type.name);
          
          if (type.fields && type.fields.length > 0) {
            // Deduplicate fields by name
            const fieldMap = new Map();
            
            type.fields.forEach(field => {
              if (field.name && field.type) {
                const fieldType = getTypeScriptType(field.type);
                const optional = field.type?.kind !== 'NON_NULL' ? '?' : '';
                const fieldDefinition = `  ${field.name}${optional}: ${fieldType};`;
                
                // Only keep the first occurrence of each field name
                if (!fieldMap.has(field.name)) {
                  fieldMap.set(field.name, fieldDefinition);
                }
              }
            });
            
            const fields = Array.from(fieldMap.values()).join('\n');
            
            typesContent += `export interface ${type.name} {
${fields}
}

`;
          }
        }
      });
    }

    // Write the generated types to file
    fs.writeFileSync('src/types/generated.ts', typesContent);
    console.log('✅ TypeScript types generated successfully!');
    console.log('📁 File: src/types/generated.ts');

  } catch (error) {
    console.error('❌ Error generating TypeScript types:', error.message);
    process.exit(1);
  }
}

generateTypeScriptTypes();