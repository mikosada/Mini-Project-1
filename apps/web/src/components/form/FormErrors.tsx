import { XCircle } from 'lucide-react';

interface FormErrorsProps {
  error: string | undefined;
}

export const FormErrors = ({ error }: FormErrorsProps) => {
  if (!error) {
    return null;
  }

  return (
    <div aria-live="polite" className="mt-2 text-xs text-rose-500">
      <div
        key={error}
        className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
      >
        <XCircle className="w-4 h-4 mr-2" />
        {error}
      </div>
    </div>
  );
};
