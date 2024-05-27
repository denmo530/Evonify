import React, { useState } from "react";
import {
  CountrySelect,
  CountrySelectValue,
} from "../../../_components/country-select";
import dynamic from "next/dynamic";
import { FormLabel, FormMessage } from "@/components/ui/form";

export function Location({ form }: { form: any }) {
  const location = form.getValues().location as CountrySelectValue;
  const [locationValue, setLocationValue] = useState<
    CountrySelectValue | undefined
  >(undefined);

  const Map = React.useMemo(
    () =>
      dynamic(() => import("../../../_components/Map"), {
        ssr: false,
        loading: () => <div>Loading...</div>,
      }),
    [locationValue]
  );

  return (
    <div className="flex flex-col gap-8">
      <FormLabel className="text-muted-foreground text-sm font-base">
        Location
      </FormLabel>
      <div className="p-0 m-0">
        <CountrySelect form={form} setLocationValue={setLocationValue} />
      </div>
      <Map center={location?.latlng} key={location?.value} />
      <FormMessage>
        {form.formState.errors.location &&
          form.formState.errors.location.message}
      </FormMessage>
    </div>
  );
}
