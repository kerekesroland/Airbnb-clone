import countries from "world-countries";

const formattedCountries = () => {
  return countries.map((country) => {
    return {
      value: country.cca2,
      label: country.name.common,
      flag: country.flag,
      latlong: country.latlng,
      region: country.region,
    };
  });
};

const useCountries = () => {
  const getCountries = () => formattedCountries();

  const getCountry = (value: string) =>
    formattedCountries().find((country) => country.value === value);

  return {
    getCountries,
    getCountry,
  };
};

export default useCountries;
