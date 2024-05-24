"use client";

import useCountries from "@/app/hooks/useCountries";
import { FormControl, FormField, FormItem } from "@/components/ui/form";

import Select from "react-select";

export type CountrySelectValue = {
  flag: string;
  label: string;
  region: string;
  value: string;
  latlng: number[];
};

interface CountrySelectProps {
  form: any;
  setLocationValue: (value: CountrySelectValue) => void;
}

export function CountrySelect({ form, setLocationValue }: CountrySelectProps) {
  const { getAll } = useCountries();

  return (
    <div className="mb-4">
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <>
            <FormItem>
              <FormControl>
                <Select
                  className="my-react-select-container"
                  classNamePrefix="my-react-select"
                  placeholder="Choose a country"
                  isClearable
                  isSearchable
                  options={getAll()}
                  value={field.value}
                  onChange={(value) => {
                    form.setValue("location", value as CountrySelectValue);
                    setLocationValue(value as CountrySelectValue);
                  }}
                  formatOptionLabel={(option: any) => {
                    return (
                      <div className="flex items-center gap-3 text-primary">
                        <div>{option.flag}</div>
                        <div>
                          {option.label},
                          <span className="text-muted-foreground ml-1">
                            {option.region}
                          </span>
                        </div>
                      </div>
                    );
                  }}
                />
              </FormControl>
            </FormItem>
          </>
        )}
      />
    </div>
  );
}
