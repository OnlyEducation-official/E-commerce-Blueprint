import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FormPasswordProps {
  name: string;
  label: string;
  placeholder?: string;
}

export const FormPassword = ({ name, label, placeholder }: FormPasswordProps) => {
  const [show, setShow] = useState(false);
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={show ? 'text' : 'password'}
                placeholder={placeholder}
                className="pr-10"
                data-testid={`input-${name}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShow(!show)}
                className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                data-testid={`btn-toggle-${name}`}
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
