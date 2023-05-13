import { INumberInputProps } from "@/inferfaces/INumberController";
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { FaDollarSign } from "react-icons/fa";

const NumberInputSelector = ({
  name,
  label,
  error,
  register,
  value,
}: INumberInputProps) => {
  return (
    <FormControl mt="33px">
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <NumberInput w="100%" defaultValue={0} min={0}>
        <InputGroup
          size="lg"
          height="100%"
          left="10px"
          display="flex"
          alignItems="center"
        >
          <InputLeftElement top="20px" pointerEvents="none">
            <FaDollarSign color="#303030" />
          </InputLeftElement>
        </InputGroup>
        <NumberInputField
          value={value}
          w="100%"
          backgroundColor="#FFF"
          padding="15px 32px"
          minHeight="40px"
          border="1px solid #b0b0b0"
          borderRadius="6px"
          color="#505050"
          _placeholder={{
            color: "#A0AEC0",
          }}
          fontSize="lg"
          {...register}
        />
      </NumberInput>
      <ErrorMessage error={error} />
    </FormControl>
  );
};

export default NumberInputSelector;
