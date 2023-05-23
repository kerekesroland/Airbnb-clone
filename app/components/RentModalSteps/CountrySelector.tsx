import useCountries from "@/hooks/useCountries";
import { ICountryValue } from "@/inferfaces/ICountryValue";
import { Box, Flex, Text } from "@chakra-ui/react";
import Select from "react-select";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import RentModalHeader from "../RentModalHeader/RentModalHeader";
import { FieldErrors } from "react-hook-form";
import { IRentInputProps } from "@/inferfaces/IRentInputProps";

interface IProps {
  value: ICountryValue | undefined;
  onChange: (value: ICountryValue) => void;
  errors?: FieldErrors<IRentInputProps>;
  countryValidation?: boolean;
  headerTitle?: string;
  headerSubtitle?: string;
}

const CountrySelector = ({
  value,
  onChange,
  errors,
  countryValidation,
  headerSubtitle,
  headerTitle,
}: IProps) => {
  const { getCountries } = useCountries();
  return (
    <>
      <RentModalHeader
        title={headerTitle || "Where is your place located?"}
        subTitle={headerSubtitle || "Help us find your property!"}
      />

      {countryValidation && <ErrorMessage error={errors?.country?.message} />}
      <Flex w="100%" my="1rem">
        <Select
          placeholder="Anywhere"
          options={getCountries()}
          isClearable
          styles={{
            container: (baseStyles) => ({
              ...baseStyles,
              width: "100%",
              height: "50px",
            }),
            control: (baseStyles) => ({
              ...baseStyles,
              height: "100%",
              cursor: "pointer",
            }),
          }}
          value={value}
          onChange={(value) => onChange(value as ICountryValue)}
          formatOptionLabel={(option: ICountryValue) => (
            <Flex flexDirection="row" alignItems="center" gap=".75rem">
              <Box>{option.flag}</Box>
              <Flex cursor="pointer" alignItems="center">
                {option.label},
                <Text color="#202020" ml=".25rem">
                  {option.region}
                </Text>
              </Flex>
            </Flex>
          )}
        />
      </Flex>
    </>
  );
};

export default CountrySelector;
