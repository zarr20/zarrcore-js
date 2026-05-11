# Auto Routing

## 📋 Fungsi Utama

### routerMapper(config)

Generate routes otomatis dari folder pages.

```typescript
// scripts/generate-routes.ts
import { routerMapper, reactRouterWriter } from 'zarrcore/node';

routerMapper({
  pages: { dir: './src/pages' },
  output: { dir: './src/generated' },
  writer: reactRouterWriter()
});
```

**Package.json:**
```json
{
  "scripts": {
    "generate:routes": "tsx scripts/generate-routes.ts",
    "dev": "npm run generate:routes && vite",
    "build": "npm run generate:routes && tsc"
  }
}
```

---

## 🗂️ Struktur Folder

```
src/
├── pages/
│   ├── index.tsx              → /
│   ├── about.tsx              → /about
│   ├── products/
│   │   ├── index.tsx          → /products
│   │   └── [id].tsx           → /products/:id
│   └── admin/
│       └── dashboard.tsx      → /admin/dashboard
├── generated/
│   └── routes.tsx             (auto-generated)
└── App.tsx
```

## 💡 Contoh Penggunaan

### Build Script
```typescript
// scripts/generate-routes.ts
import { routerMapper, reactRouterWriter } from 'zarrcore/node';
import path from 'path';

routerMapper({
  pages: {
    dir: path.resolve(__dirname, '../src/pages'),
    extensions: ['.tsx']
  },
  output: {
    dir: path.resolve(__dirname, '../src/generated'),
    fileName: 'routes'
  },
  writer: reactRouterWriter(),
  importBase: '../pages'
});

console.log('✅ Routes generated');
```

### App Component
```typescript
// App.tsx
import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import router from './generated/routes';

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {router.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={<Component />}
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Page Examples
```typescript
// pages/index.tsx
export default function Home() {
  return <h1>Home</h1>;
}

// pages/about.tsx
export default function About() {
  return <h1>About</h1>;
}

// pages/products/index.tsx
export default function Products() {
  return <h1>Products</h1>;
}

// pages/products/[id].tsx
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  return <h1>Product {id}</h1>;
}
```

## 🎯 Konversi Path

| File Path | Route Path |
|-----------|------------|
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `products/index.tsx` | `/products` |
| `products/[id].tsx` | `/products/:id` |
| `admin/dashboard.tsx` | `/admin/dashboard` |
| `users/[userId]/posts/[postId].tsx` | `/users/:userId/posts/:postId` |

