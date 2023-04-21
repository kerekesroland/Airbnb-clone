"use client";

import { IInputController } from "@/inferfaces/IInputController";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export function InputController({
  label,
  type = "text",
  isTouched,
  error,
  register,
  placeholder,
  labelWeight = "bold",
}: IInputController) {
  return (
    <FormControl
      className="form-controller"
      id={placeholder}
      marginBottom={"2rem"}
    >
      {label ? <FormLabel fontWeight={labelWeight}>{label}</FormLabel> : null}
      <div className="form-controller">
        {type === "number" ? (
          <Box className="number-icon-wrapper" display="flex">
            <NumberInput
              variant="withIcon"
              defaultValue={1}
              min={1}
              display="flex"
            >
              <NumberInputField {...register} />
            </NumberInput>
          </Box>
        ) : (
          <Input
            w="100%"
            backgroundColor="#FFF"
            padding="10px 14px"
            height="initial"
            border="1px solid #b0b0b0"
            borderRadius="6px"
            color="#505050"
            _placeholder={{
              color: "#A0AEC0",
            }}
            fontSize="lg"
            placeholder={placeholder}
            type={type}
            autoComplete="off"
            {...register}
          />
        )}
      </div>
      <ErrorMessage isTouched={isTouched} error={error} />
    </FormControl>
  );
}
