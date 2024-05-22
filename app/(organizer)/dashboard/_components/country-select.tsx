"use client";

import useCountries from "@/app/hooks/useCountries";

import Select from "react-select";

export type CountrySelectValue = {
  flag: string;
  label: string;
  region: string;
  value: string;
  latlng: number[];
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

export function CountrySelect({ value, onChange }: CountrySelectProps) {
  const { getAll } = useCountries();

  return (
    <div className="mb-4">
      <Select
        className="my-react-select-container"
        classNamePrefix="my-react-select"
        placeholder="Choose a country"
        isClearable
        isSearchable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
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
    </div>
  );
}
