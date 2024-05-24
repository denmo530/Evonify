import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function TextInfo({ form }: { form: any }) {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <>
            <FormItem>
              <FormControl>
                <>
                  <FormLabel htmlFor="name">Event Name</FormLabel>
                  <Input id="name" type="text" {...field} />
                </>
              </FormControl>
            </FormItem>
            <FormMessage />
          </>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <>
            <FormItem>
              <FormControl>
                <>
                  <FormLabel htmlFor="description">Event Description</FormLabel>
                  <Input id="description" type="text" {...field} />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          </>
        )}
      />
    </>
  );
}
