import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Label } from '../ui/label';
import { FormErrors } from './FormErrors';

interface FormSelectProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  defaultValue?: string;
  form: UseFormReturn<any, any, undefined>;
}

export const FormSelect = ({
  id,
  label,
  placeholder,
  required,
  disabled,
  error,
  className,
  defaultValue = '',
  form,
}: FormSelectProps) => {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              {label ? (
                <div className="flex items-center gap-x-1">
                  <Label className="text-xs font-semibold text-neutral-700">
                    {label}
                  </Label>
                  {required ? <span className="text-red-500"> *</span> : null}
                </div>
              ) : null}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select a type of event"
                      className="w-full bg-slate-400 rounded-md"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full">
                  <SelectItem value="FREE">FREE</SelectItem>
                  <SelectItem value="PAID">PAID</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
      <FormErrors error={error} />
    </div>
  );
};
