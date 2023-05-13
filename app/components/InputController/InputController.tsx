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
import { useState } from "react";
import { AnimatedInputLabel } from "../InputLabel/InputLabel";

export function InputController({
  label,
  type = "text",
  isTouched,
  error,
  register,
  placeholder,
  labelWeight = "bold",
  value = "",
  noMargin = false,
}: IInputController) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FormControl
      className="form-controller"
      id={placeholder}
      marginBottom={noMargin ? "0rem" : "2rem"}
    >
      <Box position="relative" minHeight="40px">
        {label ? (
          <AnimatedInputLabel
            fontWeight={labelWeight}
            isFocused={isFocused || register.value}
            value={value}
          >
            {label}
          </AnimatedInputLabel>
        ) : null}
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
              padding="15px 14px"
              minHeight="40px"
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
              value={value}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          )}
        </div>
      </Box>
      <ErrorMessage isTouched={isTouched} error={error} />
    </FormControl>
  );
}
