# Setting up pg_graphql in Supabase

This guide will help you install and configure the pg_graphql extension in your Supabase database.

## Prerequisites

- Access to your Supabase project dashboard
- Admin access to your Supabase database

## Step 1: Install pg_graphql Extension

### Option A: Using Supabase Dashboard

1. **Open your Supabase project dashboard**
   - Go to [supabase.com](https://supabase.com)
   - Select your project

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the installation script**
   - Copy the contents of `scripts/install-pg-graphql.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute the script

### Option B: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Connect to your Supabase project
supabase link --project-ref YOUR_PROJECT_REF

# Run the installation script
supabase db push --file scripts/install-pg-graphql.sql
```

## Step 2: Verify Installation

After running the installation script, you should see:

1. **Extension created successfully**
   - No errors in the SQL execution
   - Extension appears in the list

2. **Test the integration**
   ```bash
   npm run test:pg-graphql
   ```

   You should see output like:
   ```
   ✅ pg_graphql extension is available
   ✅ Players query: Working
   ✅ Matches query: Working
   ✅ Teams query: Working
   ✅ Events query: Working
   ```

## Step 3: Configure Row Level Security (RLS)

If you have RLS enabled on your tables, you may need to configure policies for pg_graphql:

```sql
-- Example: Allow authenticated users to read players
CREATE POLICY "Allow authenticated users to read players" ON players
  FOR SELECT USING (auth.role() = 'authenticated');

-- Example: Allow authenticated users to read matches
CREATE POLICY "Allow authenticated users to read matches" ON matches
  FOR SELECT USING (auth.role() = 'authenticated');
```

## Step 4: Test Your GraphQL Server

Once pg_graphql is installed:

1. **Start your development server**
   ```bash
   npm run dev
   ```

2. **Visit the GraphQL playground**
   - Go to http://localhost:4000/graphql
   - Try running some queries

3. **Test with your frontend**
   - Update your frontend to use the new GraphQL server
   - Verify that data is being fetched correctly

## Troubleshooting

### Common Issues

1. **"pg_graphql extension not available"**
   - Make sure you ran the installation script
   - Check that you have admin access to your Supabase project
   - Verify the extension appears in the Extensions list in Supabase dashboard

2. **"Permission denied" errors**
   - Check your RLS policies
   - Ensure your service role has the necessary permissions
   - Verify your environment variables are correct

3. **"Table not found" errors**
   - Make sure your tables exist in the database
   - Check that table names match your schema
   - Verify table permissions

### Debugging

1. **Check extension status**
   ```sql
   SELECT * FROM pg_extension WHERE extname = 'pg_graphql';
   ```

2. **Test basic functionality**
   ```sql
   SELECT graphql.resolve('query { __schema { types { name } } }'::text, '{}'::jsonb);
   ```

3. **Check table visibility**
   ```sql
   SELECT graphql.resolve('
     query {
       __type(name: "Query") {
         fields {
           name
         }
       }
     }
   '::text, '{}'::jsonb);
   ```

## Next Steps

After successful installation:

1. **Test the integration**: `npm run test:pg-graphql`
2. **Start development**: `npm run dev`
3. **Deploy to production**: Follow your normal deployment process
4. **Monitor performance**: Check query performance in Supabase dashboard

## Resources

- [pg_graphql Documentation](https://supabase.github.io/pg_graphql/)
- [Supabase Extensions Guide](https://supabase.com/docs/guides/database/extensions)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**Note**: The pg_graphql extension is currently in beta. Make sure to test thoroughly in development before deploying to production.
