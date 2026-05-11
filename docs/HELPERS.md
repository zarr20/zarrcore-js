# Helper Functions

## 📋 Fungsi Utama

### normalizeImportPath(filePath)

Normalisasi path file ke format POSIX untuk import.

```typescript
import { normalizeImportPath } from 'zarrcore/node';

// Windows → Unix
normalizeImportPath('src\\pages\\index.tsx')
// → 'src/pages/index'

// Hapus extension
normalizeImportPath('components/Button.tsx')
// → 'components/Button'
```

---

### toRoutePath(filePath, baseDir?)

Konversi file path ke route path.

```typescript
import { toRoutePath } from 'zarrcore/node';

// Basic
toRoutePath('index.tsx')              // → '/'
toRoutePath('about.tsx')              // → '/about'
toRoutePath('products/[id].tsx')     // → '/products/:id'

// With base directory
toRoutePath('pages/about.tsx', 'pages')  // → '/about'
```

---

## 💡 Contoh Penggunaan

### Custom Route Generator
```typescript
import { scanPages, normalizeImportPath, toRoutePath } from 'zarrcore/node';

function generateCustomRouter(pagesDir: string) {
  const files = scanPages(pagesDir, ['.tsx']);
  
  return files.map(file => ({
    path: toRoutePath(file, pagesDir),
    component: normalizeImportPath(file),
    file
  }));
}

const routes = generateCustomRouter('src/pages');
console.log(routes);
```

### Sitemap Generator
```typescript
import { scanPages, toRoutePath } from 'zarrcore/node';

function generateSitemap(pagesDir: string, baseUrl: string) {
  const files = scanPages(pagesDir, ['.tsx']);
  const routes = files.map(file => toRoutePath(file, pagesDir));
  
  // Filter static routes only
  const staticRoutes = routes.filter(path => !path.includes(':'));
  
  return staticRoutes.map(route => `${baseUrl}${route}`);
}

const urls = generateSitemap('src/pages', 'https://example.com');
```

