# Form System Documentation

A comprehensive, type-safe form management system for React applications with built-in validation and error handling.

## Overview

The form system consists of:
- **`useForm` hook**: Core form state management with validation
- **`Form` component**: Parent form component
- **`FormErrors` component**: Display all form errors
- **`FormActions` component**: Form action buttons

## Basic Usage

### Simple Form

```tsx
import { Form } from '../src/core/forms';

function SimpleForm() {
  const handleSubmit = async (values) => {
    console.log('Form submitted:', values);
  };

  return (
    <Form
      initialValues={{ name: '', email: '' }}
      onSubmit={handleSubmit}
    >
      {(form) => (
        <>
          <div className="field-container">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              placeholder="Enter your name"
            />
            {form.errors.name && (
              <span className="field-error">{form.errors.name}</span>
            )}
          </div>
          
          <div className="field-container">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              placeholder="Enter your email"
            />
            {form.errors.email && (
              <span className="field-error">{form.errors.email}</span>
            )}
          </div>
          
          <button type="submit" disabled={form.isSubmitting}>
            {form.isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </>
      )}
    </Form>
  );
}
```

## Validation

### Validation Rules

```tsx
import { Form, ValidationRules } from '../src/core/forms';

type LoginForm = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const validationRules: ValidationRules<LoginForm> = {
  email: {
    required: true,
    pattern: /^\S+@\S+\.\S+$/,
    message: 'Please enter a valid email address'
  },
  password: {
    required: true,
    min: 8,
    message: 'Password must be at least 8 characters'
  },
  rememberMe: {
    required: false
  }
};

function LoginForm() {
  const handleSubmit = async (values: LoginForm) => {
    // Handle login
    console.log('Login:', values);
  };

  return (
    <Form<LoginForm>
      initialValues={{ email: '', password: '', rememberMe: false }}
      validationRules={validationRules}
      onSubmit={handleSubmit}
    >
      {(form) => (
        <>
          <div className="field-container">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.errors.email && (
              <span className="field-error">{form.errors.email}</span>
            )}
          </div>
          
          <div className="field-container">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.errors.password && (
              <span className="field-error">{form.errors.password}</span>
            )}
          </div>
          
          <div className="field-container">
            <label>
              <input
                name="rememberMe"
                type="checkbox"
                checked={form.values.rememberMe}
                onChange={form.handleChange}
              />
              Remember me
            </label>
          </div>
          
          <button type="submit" disabled={form.isSubmitting}>
            {form.isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </>
      )}
    </Form>
  );
}
```

### Custom Validation

```tsx
const validationRules: ValidationRules<UserForm> = {
  password: {
    required: true,
    min: 8,
    custom: (value: string) => {
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return 'Password must contain uppercase, lowercase, and number';
      }
      return undefined;
    }
  },
  confirmPassword: {
    required: true,
    custom: (value: string, allValues) => {
      if (value !== allValues.password) {
        return 'Passwords do not match';
      }
      return undefined;
    }
  }
};
```

## Input Types

### Text Input
```tsx
<input
  name="firstName"
  value={form.values.firstName}
  onChange={form.handleChange}
  onBlur={form.handleBlur}
  placeholder="John"
/>
```

### Email Input
```tsx
<input
  name="email"
  type="email"
  value={form.values.email}
  onChange={form.handleChange}
  onBlur={form.handleBlur}
  placeholder="john@example.com"
/>
```

### Number Input
```tsx
<input
  name="age"
  type="number"
  value={form.values.age}
  onChange={form.handleChange}
  onBlur={form.handleBlur}
  placeholder="25"
/>
```

### Textarea
```tsx
<textarea
  name="message"
  value={form.values.message}
  onChange={form.handleChange}
  onBlur={form.handleBlur}
  rows={4}
  placeholder="Type your message here..."
/>
```

### Select Dropdown
```tsx
<select
  name="country"
  value={form.values.country}
  onChange={form.handleChange}
  onBlur={form.handleBlur}
>
  <option value="">Select a country</option>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
  <option value="uk">United Kingdom</option>
</select>
```

### Checkbox
```tsx
<label>
  <input
    name="agreeToTerms"
    type="checkbox"
    checked={form.values.agreeToTerms}
    onChange={form.handleChange}
  />
  I agree to terms and conditions
</label>
```

## Advanced Usage

### Form with Actions
```tsx
import { Form, FormActions } from '../src/core/forms';

function UserForm() {
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (values) => {
    // Save user data
    console.log('Saving:', values);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Form
      initialValues={{ name: '', email: '', role: 'user' }}
      onSubmit={handleSubmit}
    >
      {(form) => (
        <>
          <div className="field-container">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.errors.name && (
              <span className="field-error">{form.errors.name}</span>
            )}
          </div>
          
          <div className="field-container">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.errors.email && (
              <span className="field-error">{form.errors.email}</span>
            )}
          </div>
          
          <div className="field-container">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={form.values.role}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {form.errors.role && (
              <span className="field-error">{form.errors.role}</span>
            )}
          </div>
          
          <FormActions
            onCancel={handleCancel}
            submitText="Save User"
            isSubmitting={form.isSubmitting}
          />
        </>
      )}
    </Form>
  );
}
```

### Form with Error Display
```tsx
import { Form, FormErrors } from '../src/core/forms';

function RegistrationForm() {
  const handleSubmit = async (values) => {
    try {
      await registerUser(values);
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Form
      initialValues={{ username: '', email: '', password: '' }}
      validationRules={{
        username: { required: true, min: 3 },
        email: { required: true, pattern: /^\S+@\S+\.\S+$/ },
        password: { required: true, min: 8 }
      }}
      onSubmit={handleSubmit}
    >
      {(form) => (
        <>
          <FormErrors errors={form.errors} />
          
          <div className="field-container">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              value={form.values.username}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.errors.username && (
              <span className="field-error">{form.errors.username}</span>
            )}
          </div>
          
          <div className="field-container">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.errors.email && (
              <span className="field-error">{form.errors.email}</span>
            )}
          </div>
          
          <div className="field-container">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.errors.password && (
              <span className="field-error">{form.errors.password}</span>
            )}
          </div>
          
          <button type="submit" disabled={form.isSubmitting}>
            {form.isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </>
      )}
    </Form>
  );
}
```

## useForm Hook Direct Usage

If you need more control, you can use the `useForm` hook directly:

```tsx
import { useForm } from '../src/core/forms';

function CustomForm() {
  const validationRules = {
    name: { required: true, min: 2 },
    email: { required: true, pattern: /^\S+@\S+\.\S+$/ }
  };

  const form = useForm(
    { name: '', email: '' },
    validationRules
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = form.validateAll();
    
    if (isValid) {
      try {
        await submitData(form.values);
        form.reset();
      } catch (error) {
        console.error('Submit error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.values.name}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        placeholder="Name"
      />
      {form.errors.name && (
        <span className="error">{form.errors.name}</span>
      )}
      
      <input
        name="email"
        value={form.values.email}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        type="email"
        placeholder="Email"
      />
      {form.errors.email && (
        <span className="error">{form.errors.email}</span>
      )}
      
      <button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

## API Reference

### useForm Hook

```tsx
const form = useForm(initialValues, validationRules);
```

**Returns:**
- `values`: Current form values
- `errors`: Field validation errors
- `touched`: Fields that have been focused
- `isSubmitting`: Form submission state
- `handleChange`: Input change handler
- `handleBlur`: Input blur handler
- `setField`: Set field value programmatically
- `setFieldError`: Set field error programmatically
- `reset`: Reset form to initial values
- `validateAll`: Validate all fields
- `handleSubmit`: Form submission handler

### ValidationRule

```tsx
interface ValidationRule<T> {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: T) => string | undefined;
  message?: string;
}
```


## Best Practices

1. **Always provide validation rules** for required fields
2. **Use TypeScript generics** for better type safety
3. **Handle async operations** properly in onSubmit
4. **Show loading states** during form submission
5. **Provide clear error messages** for validation failures
6. **Use proper input types** for better UX and validation
7. **Reset form** after successful submission when appropriate

## Styling

The form components use CSS classes that you can style:

- `.field-container`: Container for each field
- `.field-label`: Field label
- `.field-error`: Error message display
- `.form-errors`: Container for all form errors
- `.form-error-item`: Individual form error
- `.form-actions`: Container for action buttons
- `.btn-submit`: Submit button
- `.btn-cancel`: Cancel button

Example CSS:

```css
.field-container {
  margin-bottom: 1rem;
}

.field-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.field-error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-errors {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 0.25rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
}

.btn-submit {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn-submit:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
```

