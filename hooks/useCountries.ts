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

  const getCountry = (value: Array<string>) =>
    formattedCountries().find(
      (country) =>
        country.latlong[0].toString() === value[0] &&
        country.latlong[1].toString() === value[1]
    );

  return {
    getCountries,
    getCountry,
  };
};

export default useCountries;
