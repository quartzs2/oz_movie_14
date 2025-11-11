import { cn } from "@utils";

function FormField({
  autoComplete,
  error,
  id,
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        autoComplete={autoComplete}
        className={cn(
          "px-4 py-2.5 rounded-lg border transition-colors",
          "bg-white dark:bg-gray-800",
          "text-gray-900 dark:text-gray-100",
          "placeholder:text-gray-400 dark:placeholder:text-gray-500",
          "focus:outline-none focus:ring-2",
          error
            ? "border-red-500 dark:border-red-400 focus:ring-red-500/20"
            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400",
        )}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

export default FormField;
