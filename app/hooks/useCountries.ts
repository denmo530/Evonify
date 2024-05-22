import countries from "world-countries";

const fomrattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  region: country.region,
  latlng: country.latlng,
}));

const useCountries = () => {
  const getAll = () => fomrattedCountries;

  const getByValue = (value: string) =>
    fomrattedCountries.find((country) => country.value === value);

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
