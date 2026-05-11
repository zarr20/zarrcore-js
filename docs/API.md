# API Client

## 📋 Fungsi Utama

### createApiClient(config?)

Buat Axios instance dengan konfigurasi default.

```typescript
const client = createApiClient({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});
```

**Default:**
- Base URL: `/api`
- Timeout: `15000`
- Content-Type: `application/json`
- unwrapData: `true` (return `res.data`)

---

### createApiFactory(client)

Wrapper untuk Axios instance dengan HTTP methods bertipe.

```typescript
const api = createApiFactory(client);
```

---

### useApiLoad(requestFn, options?)

Hook untuk fetch data otomatis (GET requests).

```typescript
const [refetch, { data, loading, error }] = useApiLoad(UserApi.list);
```

**Returns:**
- `refetch` - Fungsi untuk refresh data
- `data` - Data dari API
- `loading` - Loading state
- `error` - Error state

---

### useApiSend(requestFn, options?)

Hook untuk manual trigger (POST/PUT/DELETE).

```typescript
const [submit, { loading, error }] = useApiSend(UserApi.create, {
  onSuccess: (data) => console.log('Success!', data),
  onError: (err) => console.error('Error!', err)
});
```

**Returns:**
- `submit` - Fungsi trigger manual
- `loading` - Loading state  
- `error` - Error state
- `data` - Response data

---

## 💡 Contoh Lengkap

### API Service
```typescript
// src/api/users.ts
import { api } from './client';

export interface User {
  id: string;
  name: string;
  email: string;
}

export const UserApi = {
  list: () => api.get<User[]>('/users'),
  get: (id: string) => api.get<User>(`/users/${id}`),
  create: (data: Omit<User, 'id'>) => api.post<User>('/users', data),
  update: (id: string, data: Partial<User>) => api.put<User>(`/users/${id}`, data),
  delete: (id: string) => api.delete<void>(`/users/${id}`)
};
```

### Komponen dengan Data Fetching
```typescript
// src/components/UserList.tsx
import { useApiLoad } from 'zarrcore';
import { UserApi } from '../api/users';

export function UserList() {
  const [refresh, { data: users, loading, error }] = useApiLoad(UserApi.list);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Users ({users?.length})</h1>
      <button onClick={() => refresh()}>Refresh</button>
      <ul>
        {users?.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Komponen dengan Form
```typescript
// src/components/CreateUser.tsx
import { useForm } from 'zarrcore';
import { useApiSend } from 'zarrcore';
import { UserApi } from '../api/users';

export function CreateUser() {
  const { values, handleChange, reset } = useForm({
    name: '',
    email: ''
  });

  const [submit, { loading }] = useApiSend(UserApi.create, {
    onSuccess: () => {
      alert('User created!');
      reset();
    }
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      submit(values);
    }}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}
```

