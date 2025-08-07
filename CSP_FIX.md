# Content Security Policy (CSP) Fix for GraphQL Playground

## 🚨 Problem

The Apollo GraphQL playground was being blocked by Content Security Policy headers, causing these errors:

### Initial Issues
```
Refused to load the stylesheet 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap' because it violates the following Content Security Policy directive: "style-src 'self' 'unsafe-inline'".

Refused to load the script 'https://embeddable-sandbox.cdn.apollographql.com/v2/embeddable-sandbox.umd.production.min.js' because it violates the following Content Security Policy directive: "script-src 'self' 'unsafe-inline'".

Uncaught TypeError: window.EmbeddedSandbox is not a constructor
```

### Additional Issues
```
Refused to frame 'https://sandbox.embed.apollographql.com/' because it violates the following Content Security Policy directive: "default-src 'self'".

favicon.ico:1 Failed to load resource: the server responded with a status of 404 (Not Found)
```

```
Refused to load the stylesheet 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap' because it violates the following Content Security Policy directive: "style-src 'self' 'unsafe-inline'".

Refused to load the script 'https://embeddable-sandbox.cdn.apollographql.com/v2/embeddable-sandbox.umd.production.min.js' because it violates the following Content Security Policy directive: "script-src 'self' 'unsafe-inline'".

Uncaught TypeError: window.EmbeddedSandbox is not a constructor
```

## ✅ Solution

Updated the CSP configuration in both `src/index.ts` and `src/clean-server.ts` to allow the necessary external resources:

### Additional Fixes
- Added `frameSrc` directive to allow Apollo's sandbox iframe
- Added static file serving for favicon and other assets
- Copied favicon.ico from frontend to prevent 404 errors

### Before (Too Restrictive)
```javascript
app.use(helmet({
  contentSecurityPolicy: false, // Disabled CSP entirely
  crossOriginEmbedderPolicy: false
}));
```

### After (Properly Configured)
```javascript
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'", 
        "'unsafe-inline'", 
        "'unsafe-eval'",
        "https://embeddable-sandbox.cdn.apollographql.com",
        "https://apollo-server-landing-page.cdn.apollographql.com"
      ],
      styleSrc: [
        "'self'", 
        "'unsafe-inline'",
        "https://fonts.googleapis.com",
        "https://apollo-server-landing-page.cdn.apollographql.com"
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com"
      ],
      imgSrc: [
        "'self'", 
        "data:", 
        "https:",
        "https://apollo-server-landing-page.cdn.apollographql.com"
      ],
              connectSrc: [
          "'self'",
          "https://apollo-server-landing-page.cdn.apollographql.com",
          "https://sandbox.embed.apollographql.com"
        ],
        frameSrc: [
          "'self'",
          "https://sandbox.embed.apollographql.com"
        ],
        manifestSrc: [
          "'self'",
          "https://apollo-server-landing-page.cdn.apollographql.com"
        ],
    },
  },
}));
```

## 🔧 What Each Directive Allows

- **`scriptSrc`**: Allows scripts from Apollo's CDN for the GraphQL playground
- **`styleSrc`**: Allows Google Fonts and Apollo's CSS
- **`fontSrc`**: Allows Google Fonts to load
- **`imgSrc`**: Allows images from Apollo's CDN
- **`connectSrc`**: Allows connections to Apollo's CDN and sandbox
- **`frameSrc`**: Allows iframes from Apollo's sandbox domain
- **`manifestSrc`**: Allows loading of Apollo's manifest file

## 🧪 Testing

Both servers now work correctly:

```bash
# Test the clean server
npm run test:clean-server

# Start both servers for comparison
npm run start:both
```

## 🎯 Result

- ✅ GraphQL playground loads without errors
- ✅ Google Fonts load properly
- ✅ Apollo's embedded sandbox works
- ✅ Iframe loading is allowed for Apollo's sandbox
- ✅ Favicon loads without 404 errors
- ✅ Static files are served properly
- ✅ Security is maintained while allowing necessary resources
- ✅ Both original and clean servers work identically

## 📚 Related Files

- `src/index.ts` - Original server with updated CSP
- `src/clean-server.ts` - Clean server with updated CSP
- `scripts/test-clean-server.js` - Test script
- `scripts/start-servers.js` - Comparison script

The CSP configuration now properly balances security with functionality, allowing the GraphQL playground to work while maintaining protection against other potential threats.
