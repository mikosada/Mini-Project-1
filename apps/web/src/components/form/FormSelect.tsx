import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { UseFormReturn } from 'react-hook-form';

interface FormSelectProps {
  form: UseFormReturn<any, any, undefined>;
}

export const FormSelect = ({ form }: FormSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder="Select a verified email to display"
                  className="w-full bg-slate-400 rounded-md"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="w-full">
              <SelectItem value="m@example.com">m@example.com</SelectItem>
              <SelectItem value="m@google.com">m@google.com</SelectItem>
              <SelectItem value="m@support.com">m@support.com</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
