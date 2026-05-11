# zarrcore-js

![npm version](https://badge.fury.io/js/zarrcore-js.svg)
![license](https://img.shields.io/npm/l/zarrcore-js.svg)
![typescript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)
![npm downloads](https://img.shields.io/npm/dm/zarrcore-js.svg)

Shared core utilities for modern TypeScript applications. Released under the MIT License.

## Installation

```bash
# Install from local build
npm install ./main

# Or install from npm registry (when published)
npm install zarrcore-js
```

## Features

- ⚡ **Obfuscated Build**: Code is minified and obfuscated for production
- 🌐 **API Handling**: Complete API utilities for modern applications
- 📝 **Form Support**: Advanced form handling with field tracking
- 🛠️ **TypeScript Ready**: Full TypeScript support with comprehensive types
- 🧩 **Modular Architecture**: Reusable and maintainable code structure
- 📦 **Tree Shakable**: Optimized bundles for better performance
- 🔄 **Dual Format**: ESM and CommonJS compatibility
- 🏗️ **Scalable**: Built for modern application development
- ✨ **Developer Experience**: Clean and intuitive API design
- 📄 **MIT Licensed**: Open source with permissive license

## Usage

### Form Module (with improved field tracking)
```typescript
import { Form } from 'zarrcore-js';

// Form now knows all fields from initialValues before render
const initialValues = {
  name: '',
  email: '',
  age: 0,
  active: false
};

<Form initialValues={initialValues} validationRules={validationRules} onSubmit={handleSubmit}>
  {(form) => (
    <input name="name" value={form.values.name} onChange={form.handleChange} />
    <input name="email" value={form.values.email} onChange={form.handleChange} />
    // ... other fields
  )}
</Form>
```

### API Module
```typescript
import { useApi, useApiSend, useApiLoad } from 'zarrcore-js/api';

const api = useApi();
```

### CLI Tool
```bash
npx zarrcore-js --help
```

## Development

Clone the repository:
```bash
git clone https://github.com/zarr20/zarrcore-js.git
```

Install dependencies:
```bash
npm install
```

Run development:
```bash
npm run dev
```

Build package:
```bash
npm run build
```

## License

This project is [licensed](https://github.com/zarr20/zarrcore-js/blob/main/LICENSE) under the MIT License.

## Author

Created and maintained by Dzarr al ghifari.

## Links

- **Repository**: https://github.com/zarr20/zarrcore-js.git
- **Issues**: https://github.com/zarr20/zarrcore-js/issues
- **Documentation**: https://github.com/zarr20/zarrcore-js#readme
