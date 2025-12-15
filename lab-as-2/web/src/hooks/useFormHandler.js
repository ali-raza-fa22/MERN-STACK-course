import { useRef, useState, useCallback } from "react";

/// <summary>
/// Custom hook demonstrating both Controlled and Uncontrolled component patterns
/// Provides utilities for form handling with refs and state management
/// </summary>
export function useFormHandler(initialData = {}) {
  // Controlled component state
  const [formData, setFormData] = useState(initialData);

  // Uncontrolled component refs
  const formRef = useRef(null);
  const fieldRefs = useRef({});

  /// <summary>Register a ref for uncontrolled access - call this from inputs/textareas</summary>
  const registerRef = useCallback(
    (name) => (el) => {
      if (el) {
        fieldRefs.current[name] = el;
      }
    },
    []
  );

  /// <summary>Handle controlled input changes - updates state</summary>
  const handleControlledChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  /// <summary>Get uncontrolled values from refs - access DOM directly</summary>
  const getUncontrolledValues = useCallback(() => {
    const values = {};
    Object.entries(fieldRefs.current).forEach(([name, ref]) => {
      values[name] = ref?.value || "";
    });
    return values;
  }, []);

  /// <summary>Reset form - works with both controlled and uncontrolled</summary>
  const resetForm = useCallback(() => {
    setFormData(initialData);
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [initialData]);

  /// <summary>Get form values - works with both patterns</summary>
  const getFormValues = useCallback(
    (useUncontrolled = false) => {
      if (useUncontrolled) {
        return getUncontrolledValues();
      }
      return formData;
    },
    [formData, getUncontrolledValues]
  );

  /// <summary>Validate form fields</summary>
  const validateForm = useCallback((values, rules = {}) => {
    const errors = {};

    Object.entries(rules).forEach(([field, rule]) => {
      const value = values[field];

      if (rule.required && (!value || !value.trim())) {
        errors[field] = `${field} is required`;
      }

      if (rule.minLength && value && value.length < rule.minLength) {
        errors[
          field
        ] = `${field} must be at least ${rule.minLength} characters`;
      }

      if (rule.maxLength && value && value.length > rule.maxLength) {
        errors[field] = `${field} must be at most ${rule.maxLength} characters`;
      }

      if (rule.custom && !rule.custom(value)) {
        errors[field] = rule.message || "Invalid value";
      }
    });

    return errors;
  }, []);

  return {
    // State and refs
    formData,
    setFormData,
    formRef,
    registerRef,

    // Handlers
    handleControlledChange,
    resetForm,

    // Utilities
    getFormValues,
    getUncontrolledValues,
    validateForm,
  };
}
