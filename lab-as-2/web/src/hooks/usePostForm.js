import { useState, useEffect, useCallback } from "react";

/// <summary>Custom hook for managing form state with lifecycle hooks</summary>
export function usePostForm(initialData = { title: "", content: "" }) {
  const [formData, setFormData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);

  /// <summary>Update form data when initialData changes - demonstrates Virtual DOM updates</summary>
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  /// <summary>Handle form input changes with Virtual DOM re-render</summary>
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  /// <summary>Reset form to initial state</summary>
  const resetForm = useCallback(() => {
    setFormData(initialData);
    setEditingId(null);
  }, [initialData]);

  /// <summary>Set editing mode with pre-filled data</summary>
  const setEditMode = useCallback((post) => {
    setFormData({
      title: post.title,
      content: post.content,
    });
    setEditingId(post._id);
  }, []);

  return {
    formData,
    editingId,
    handleInputChange,
    setEditMode,
    resetForm,
    setFormData,
    setEditingId,
  };
}
