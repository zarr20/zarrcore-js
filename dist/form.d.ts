import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

type BaseValidationRule<T, F = T> = {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: any, formValues?: any) => string | undefined;
    async?: (value: any, formValues?: any) => Promise<string | undefined>;
    crossField?: (value: any, formValues: any) => string | undefined;
    message?: string;
};
type StringValidationRule = BaseValidationRule<string> & {
    min?: number;
    max?: number;
    pattern?: RegExp;
};
type NumberValidationRule = BaseValidationRule<number> & {
    min?: number;
    max?: number;
};
type BooleanValidationRule = BaseValidationRule<boolean>;
type ValidationRule<T> = T extends string ? StringValidationRule : T extends number ? NumberValidationRule : T extends boolean ? BooleanValidationRule : BaseValidationRule<T>;
type CommonValidationRule = {
    required?: boolean;
    custom?: (value: any) => string | undefined;
    message?: string;
};
type ValidationRules<T extends Record<string, any>> = {
    [K in keyof T]: ValidationRule<T[K]>;
};
type PartialValidationRules<T extends Record<string, any>> = {
    [K in keyof T]?: ValidationRule<T[K]>;
};
interface ValidationLifecycleConfig {
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
    validateOnSubmit?: boolean;
    showErrorsAfterTouched?: boolean;
    showErrorsAfterSubmit?: boolean;
}
interface FormLevelValidation<T extends Record<string, any>> {
    validate?: (values: T) => string | undefined;
    async?: (values: T) => Promise<string | undefined>;
}
interface SubmitLifecycle<T extends Record<string, any>> {
    onSubmitStart?: (values: T) => void | Promise<void>;
    onSubmitSuccess?: (values: T) => void | Promise<void>;
    onSubmitError?: (error: Error, values: T) => void | Promise<void>;
    onSubmitComplete?: (values: T, success: boolean) => void | Promise<void>;
}
interface ValidationState {
    validating: boolean;
    validatedFields: Set<string>;
    asyncErrors: Record<string, string | undefined>;
}
interface FormState<T extends Record<string, any>> {
    submitCount: number;
    isValid: boolean;
    canSubmit: boolean;
    isDirty: boolean;
    isComplete: boolean;
    values: T;
    errors: Partial<Record<keyof T, string>>;
    touched: Partial<Record<keyof T, boolean>>;
    dirty: Partial<Record<keyof T, boolean>>;
    isSubmitting: boolean;
    submitError?: string;
    validationState: ValidationState;
    formError?: string;
}
interface SubmitContext<T extends Record<string, any>> {
    values: T;
    form: {
        reset: () => void;
        setErrors: (errors: Partial<Record<keyof T, string>>) => void;
        setSubmitting: (submitting: boolean) => void;
        setSubmitError: (error?: string) => void;
        validateAll: () => Promise<boolean>;
        setField: <K extends keyof T>(field: K, value: T[K]) => void;
        setFieldError: <K extends keyof T>(field: K, error?: string) => void;
    };
}
interface FormActionsType<T extends Record<string, any>> {
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    setField: <K extends keyof T>(field: K, value: T[K]) => void;
    setFieldError: <K extends keyof T>(field: K, error?: string) => void;
    setErrors: (errors: Partial<Record<keyof T, string>>) => void;
    setSubmitting: (submitting: boolean) => void;
    setSubmitError: (error?: string) => void;
    reset: () => void;
    validateAll: () => Promise<boolean>;
    validateFieldAsync: <K extends keyof T>(field: K, value: T[K]) => Promise<string | undefined>;
    validateAllAsync: () => Promise<boolean>;
    handleSubmit: (onSubmit: (context: SubmitContext<T>) => void | Promise<void>) => (e: React.FormEvent) => Promise<void>;
}
type UseFormReturn<T extends Record<string, any>> = FormState<T> & FormActionsType<T>;
interface FormProps<T extends Record<string, any>> {
    initialValues: T;
    validationRules?: ValidationRules<T>;
    validationLifecycle?: ValidationLifecycleConfig;
    formLevelValidation?: FormLevelValidation<T>;
    submitLifecycle?: SubmitLifecycle<T>;
    onSubmit: (context: SubmitContext<T>) => void | Promise<void>;
    children: (form: UseFormReturn<T>) => ReactNode;
    className?: string;
    id?: string;
}
interface FormErrorProps {
    errors: Record<string, string>;
    className?: string;
}
interface FormActionsProps {
    onCancel?: () => void;
    cancelText?: string;
    submitText?: string;
    isSubmitting?: boolean;
    disabled?: boolean;
    className?: string;
    children?: ReactNode;
}
type ValidationSchema<T extends Record<string, any>> = {
    [K in keyof T]: ValidationRule<T[K]>;
};
interface FieldMeta {
    touched: boolean;
    dirty: boolean;
    valid: boolean;
    validating: boolean;
}

declare function Form<T extends Record<string, any>>({ initialValues, validationRules, validationLifecycle, formLevelValidation, submitLifecycle, onSubmit, children, className, id }: FormProps<T>): react_jsx_runtime.JSX.Element;

declare function FormErrors({ errors, className }: FormErrorProps): react_jsx_runtime.JSX.Element | null;

declare function useForm<T extends Record<string, any>>(initialValues: T, validationRules?: PartialValidationRules<T>, validationLifecycle?: ValidationLifecycleConfig, formLevelValidation?: FormLevelValidation<T>, submitLifecycle?: SubmitLifecycle<T>): {
    values: T;
    errors: Partial<Record<keyof T, string>>;
    touched: Partial<Record<keyof T, boolean>>;
    dirty: Partial<Record<keyof T, boolean>>;
    isSubmitting: boolean;
    submitError: string | undefined;
    validationState: ValidationState;
    formError: string | undefined;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    setField: <K extends keyof T>(field: K, value: T[K]) => void;
    setFieldError: <K extends keyof T>(field: K, error?: string) => void;
    setErrors: (newErrors: Partial<Record<keyof T, string>>) => void;
    setSubmitting: (submitting: boolean) => void;
    setSubmitError: (error?: string) => void;
    reset: () => void;
    validateAll: () => Promise<boolean>;
    validateFieldAsync: <K extends keyof T>(field: K, value: T[K]) => Promise<string | undefined>;
    validateAllAsync: () => Promise<boolean>;
    handleSubmit: (onSubmit: (context: SubmitContext<T>) => void | Promise<void>) => (e: React.FormEvent) => Promise<void>;
    isValid: boolean;
    canSubmit: boolean;
    isDirty: boolean;
    isComplete: boolean;
    submitCount: number;
};

/**
 * Provider component for form context
 */
declare function FormProvider<T extends Record<string, any>>({ children, value, }: {
    children: ReactNode;
    value: UseFormReturn<T>;
}): react_jsx_runtime.JSX.Element;
/**
 * Hook to use form context
 */
declare function useFormContext<T extends Record<string, any>>(): UseFormReturn<T>;

declare const DEFAULT_MESSAGES: {
    readonly required: (field: string) => string;
    readonly minLength: (field: string, min: number) => string;
    readonly maxLength: (field: string, max: number) => string;
    readonly min: (field: string, min: number) => string;
    readonly max: (field: string, max: number) => string;
    readonly pattern: (field: string) => string;
    readonly email: () => string;
    readonly url: () => string;
    readonly number: () => string;
};

declare const PATTERNS: {
    readonly EMAIL: RegExp;
    readonly URL: RegExp;
    readonly PHONE: RegExp;
    readonly ALPHANUMERIC: RegExp;
    readonly LETTERS_ONLY: RegExp;
    readonly NUMBERS_ONLY: RegExp;
    readonly STRONG_PASSWORD: RegExp;
};

/**
 * Get nested value from object by path
 */
declare function getNestedValue(obj: Record<string, any>, path: string): any;
/**
 * Set nested value in object by path
 */
declare function setNestedValue<T extends Record<string, any>>(obj: T, path: string, value: any): T;
/**
 * Check if value is empty (null, undefined, '', [], {})
 */
declare function isEmpty(value: any): boolean;
/**
 * Format field name for display (camelCase/PascalCase to Title Case)
 */
declare function formatFieldName(name: string): string;

/**
 * Predefined validation rules with strict typing
 */
declare const RULES: {
    readonly required: <T>(message?: string) => ValidationRule<T>;
    readonly email: (message?: string) => StringValidationRule;
    readonly url: (message?: string) => StringValidationRule;
    readonly minLength: (min: number, message?: string) => StringValidationRule;
    readonly maxLength: (max: number, message?: string) => StringValidationRule;
    readonly min: (min: number, message?: string) => NumberValidationRule;
    readonly max: (max: number, message?: string) => NumberValidationRule;
    readonly pattern: (pattern: RegExp, message?: string) => StringValidationRule;
    readonly phone: (message?: string) => StringValidationRule;
    readonly alphanumeric: (message?: string) => StringValidationRule;
    readonly strongPassword: (message?: string) => StringValidationRule;
    readonly boolean: (message?: string) => BooleanValidationRule;
};
/**
 * Combine multiple rules with union type inference
 * Implements sequential/short-circuit validation with priority order:
 * 1. Required validation
 * 2. Type-specific validation (min/max/pattern)
 * 3. Custom validation
 * 4. Cross-field validation
 * 5. Async validation (handled separately)
 */
declare function combineRules<T>(...rules: ValidationRule<T>[]): ValidationRule<T>;
/**
 * Type-safe rule combiner for specific field types
 */
declare function combineStringRules(...rules: StringValidationRule[]): StringValidationRule;
declare function combineNumberRules(...rules: NumberValidationRule[]): NumberValidationRule;
declare function combineBooleanRules(...rules: BooleanValidationRule[]): BooleanValidationRule;
/**
 * Create a custom rule with type inference
 */
declare function createRule<T>(rule: ValidationRule<T>): ValidationRule<T>;
/**
 * Conditional rule builder
 */
declare function when<T>(condition: boolean, rule: ValidationRule<T>): ValidationRule<T>;

type SchemaValidator<T> = {
    validate: (data: unknown) => {
        success: true;
        data: T;
    } | {
        success: false;
        errors: Record<string, string>;
    };
};

export { type BooleanValidationRule, type CommonValidationRule, DEFAULT_MESSAGES, type FieldMeta, Form, type FormActionsProps, type FormActionsType, type FormErrorProps, FormErrors, type FormLevelValidation, type FormProps, FormProvider, type FormState, type NumberValidationRule, PATTERNS, type PartialValidationRules, RULES, type SchemaValidator, type StringValidationRule, type SubmitContext, type SubmitLifecycle, type UseFormReturn, type ValidationLifecycleConfig, type ValidationRule, type ValidationRules, type ValidationSchema, type ValidationState, combineBooleanRules, combineNumberRules, combineRules, combineStringRules, createRule, formatFieldName, getNestedValue, isEmpty, setNestedValue, useForm, useFormContext, when };
