# zarrcore-js - Complete Guide

![npm version](https://badge.fury.io/js/zarrcore-js.svg)
![license](https://img.shields.io/npm/l/zarrcore-js.svg)
![typescript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)
![npm downloads](https://img.shields.io/npm/dm/zarrcore-js.svg)

Shared core utilities for modern TypeScript applications. Released under the MIT License.

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Features](#features)
- [Modules](#modules)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Installation

```bash
# Install from npm registry
npm install zarrcore-js

# Install from local build
npm install ./main

# Install with yarn
yarn add zarrcore-js

# Install with pnpm
pnpm add zarrcore-js
```

## ⚡ Quick Start

### Form Module

```typescript
import { Form } from 'zarrcore-js';

// Define your form data
interface UserForm {
  name: string;
  email: string;
  age: number;
  active: boolean;
}

// Initialize form with default values
const initialValues: UserForm = {
  name: '',
  email: '',
  age: 0,
  active: false
};

// Define validation rules
const validationRules = {
  name: { required: true, minLength: 2 },
  email: { required: true, email: true },
  age: { required: true, min: 18 }
};

function UserFormComponent() {
  return (
    <Form 
      initialValues={initialValues}
      validationRules={validationRules}
      onSubmit={(values) => console.log('Form submitted:', values)}
    >
      {(form) => (
        <form onSubmit={form.handleSubmit}>
          <input
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
            placeholder="Name"
          />
          {form.errors.name && <span>{form.errors.name}</span>}
          
          <input
            name="email"
            type="email"
            value={form.values.email}
            onChange={form.handleChange}
            placeholder="Email"
          />
          {form.errors.email && <span>{form.errors.email}</span>}
          
          <button type="submit" disabled={!form.canSubmit}>
            Submit
          </button>
        </form>
      )}
    </Form>
  );
}
```

### API Module

```typescript
import { useApi, useApiSend, useApiLoad } from 'zarrcore-js/api';

function ApiComponent() {
  const api = useApi();
  
  // Send data with automatic loading states
  const { send, loading, error } = useApiSend(
    api.post('/users', {
      onSuccess: (data) => console.log('User created:', data),
      onError: (error) => console.error('Error:', error)
    })
  );
  
  // Load data with automatic retry
  const { data, loading, error, refetch } = useApiLoad(
    api.get('/users'),
    {
      retry: 3,
      cache: true
    }
  );
  
  return (
    <div>
      <button onClick={() => send({ name: 'John', email: 'john@example.com' })}>
        Create User
      </button>
      
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
```

## ✨ Features

- 🎯 **Form Management**: Advanced form handling with validation
- 🌐 **API Utilities**: Complete API utilities with loading states
- 🛠️ **TypeScript Ready**: Full TypeScript support with comprehensive types
- 🧩 **Modular Architecture**: Import only what you need
- 📦 **Tree Shakable**: Optimized bundles for better performance
- 🔄 **React Hooks**: Modern React hooks for state management
- 🏗️ **Scalable**: Built for modern application development
- ✨ **Developer Experience**: Clean and intuitive API design
- 📄 **MIT Licensed**: Open source with permissive license

## 📦 Modules

### Form Module (`zarrcore-js/form`)

Advanced form handling with validation, field tracking, and state management.

```typescript
import { Form, useForm } from 'zarrcore-js/form';
```

**Features:**
- Field validation with custom rules
- Form state management (dirty, touched, valid)
- Async validation support
- Cross-field validation
- Field registration and tracking

### API Module (`zarrcore-js/api`)

Complete API utilities for modern applications.

```typescript
import { useApi, useApiSend, useApiLoad } from 'zarrcore-js/api';
```

**Features:**
- Automatic loading states
- Error handling and retry logic
- Request/response interceptors
- Caching support
- TypeScript integration

### Node Module (`zarrcore-js/node`)

Node.js utilities and router system.

```typescript
import { Router } from 'zarrcore-js/node';
```

**Features:**
- File system utilities
- Path manipulation
- Router system
- Node.js specific helpers

### Router Module (`zarrcore-js/router`)

Advanced routing system for applications.

```typescript
import { Router, Route } from 'zarrcore-js/router';
```

**Features:**
- Dynamic routing
- Route parameters
- Middleware support
- Route guards

## 📖 API Reference

### Form Hook

```typescript
const form = useForm<T>(
  initialValues: T,
  validationRules?: PartialValidationRules<T>,
  validationLifecycle?: ValidationLifecycleConfig,
  formLevelValidation?: FormLevelValidation<T>,
  submitLifecycle?: SubmitLifecycle<T>
);
```

**Returns:**
- `values`: Current form values
- `errors`: Validation errors
- `touched`: Field touched state
- `dirty`: Form dirty state
- `handleChange`: Input change handler
- `handleSubmit`: Form submit handler
- `canSubmit`: Whether form can be submitted
- `isValid`: Form validation state

### API Hook

```typescript
const api = useApi(config?: ApiConfig);
```

**Methods:**
- `get(url, config?)`: GET request
- `post(url, data?, config?)`: POST request
- `put(url, data?, config?)`: PUT request
- `delete(url, config?)`: DELETE request
- `patch(url, data?, config?)`: PATCH request

## 🎯 Examples

### Complete Form Example

```typescript
import { Form } from 'zarrcore-js';

interface ContactForm {
  name: string;
  email: string;
  message: string;
  subscribe: boolean;
}

export function ContactForm() {
  const initialValues: ContactForm = {
    name: '',
    email: '',
    message: '',
    subscribe: false
  };

  const validationRules = {
    name: { 
      required: true, 
      minLength: 2,
      maxLength: 50
    },
    email: { 
      required: true, 
      email: true 
    },
    message: { 
      required: true, 
      minLength: 10 
    }
  };

  return (
    <Form
      initialValues={initialValues}
      validationRules={validationRules}
      onSubmit={async (values) => {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        });
      }}
    >
      {(form) => (
        <div>
          <input
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
            placeholder="Your Name"
          />
          {form.errors.name && <span className="error">{form.errors.name}</span>}
          
          <input
            name="email"
            type="email"
            value={form.values.email}
            onChange={form.handleChange}
            placeholder="Your Email"
          />
          {form.errors.email && <span className="error">{form.errors.email}</span>}
          
          <textarea
            name="message"
            value={form.values.message}
            onChange={form.handleChange}
            placeholder="Your Message"
          />
          {form.errors.message && <span className="error">{form.errors.message}</span>}
          
          <label>
            <input
              type="checkbox"
              name="subscribe"
              checked={form.values.subscribe}
              onChange={form.handleChange}
            />
            Subscribe to newsletter
          </label>
          
          <button 
            type="button" 
            onClick={form.handleSubmit}
            disabled={!form.canSubmit || form.isSubmitting}
          >
            {form.isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      )}
    </Form>
  );
}
```

### API Usage Example

```typescript
import { useApi, useApiSend, useApiLoad } from 'zarrcore-js/api';

function UserManagement() {
  const api = useApi({
    baseURL: 'https://api.example.com',
    headers: {
      'Authorization': 'Bearer token'
    }
  });

  // Load users
  const { 
    data: users, 
    loading: loadingUsers, 
    error: usersError,
    refetch 
  } = useApiLoad(api.get('/users'));

  // Create user
  const { 
    send: createUser, 
    loading: creatingUser,
    error: createError 
  } = useApiSend(
    api.post('/users'),
    {
      onSuccess: (newUser) => {
        console.log('User created:', newUser);
        refetch(); // Refresh user list
      }
    }
  );

  return (
    <div>
      <h2>Users</h2>
      
      {loadingUsers && <p>Loading users...</p>}
      {usersError && <p>Error: {usersError}</p>}
      
      {users && (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))}
        </ul>
      )}
      
      <button 
        onClick={() => createUser({ 
          name: 'New User', 
          email: 'new@example.com' 
        })}
        disabled={creatingUser}
      >
        {creatingUser ? 'Creating...' : 'Create User'}
      </button>
      
      {createError && <p>Error creating user: {createError}</p>}
    </div>
  );
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/zarr20/zarrcore-js.git

# Install dependencies
npm install

# Run development
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## 📄 License

This project is [licensed](LICENSE) under the MIT License.

## 🙏 Author

Created and maintained by **Dzarr al ghifari**.

## 🔗 Links

- **Repository**: https://github.com/zarr20/zarrcore-js.git
- **Issues**: https://github.com/zarr20/zarrcore-js/issues
- **Documentation**: https://github.com/zarr20/zarrcore-js#readme
- **NPM Package**: https://www.npmjs.com/package/zarrcore-js

## 📊 Changelog

### v2.1.3
- Added form validation improvements
- Enhanced API utilities with better error handling
- Improved TypeScript definitions
- Added comprehensive documentation

### v2.1.0
- Initial release with core form and API utilities
- TypeScript support
- React hooks integration
- MIT licensed distribution
