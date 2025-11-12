import { useState } from "react";

function useAuthForm({ initialData, onSubmit, schema }) {
  const initialErrors = Object.keys(initialData).reduce(
    (acc, key) => ({ ...acc, [key]: "" }),
    {},
  );

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = ({ data }) => {
    try {
      schema.parse(data);
      setErrors(initialErrors);
      return true;
    } catch (error) {
      const fieldErrors = { ...initialErrors };

      if (error.issues) {
        error.issues.forEach((err) => {
          const fieldName = err.path[0];
          if (fieldName in fieldErrors) {
            fieldErrors[fieldName] = err.message;
          }
        });
      }

      setErrors(fieldErrors);
      return false;
    }
  };

  const handleChange =
    ({ field }) =>
    (e) => {
      const value = e.target.value;
      const updatedData = { ...formData, [field]: value };
      setFormData(updatedData);

      validateForm({ data: updatedData });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm({ data: formData })) {
      alert("입력 정보를 확인해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      alert(error.message || "오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    errors,
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
  };
}

export default useAuthForm;
