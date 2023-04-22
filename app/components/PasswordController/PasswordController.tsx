import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { IPasswordController } from "@/inferfaces/IInputController";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { AnimatedInputLabel } from "../InputLabel/InputLabel";

export function PasswordController({
  label,
  isTouched,
  error,
  register,
  eyeVisible = true,
  placeholder,
  labelWeight = "bold",
  value = "",
}: IPasswordController) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <FormControl id={placeholder} marginBottom="2rem">
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
        <InputGroup>
          <Box width="inherit" className="form-controller">
            <Input
              w="100%"
              backgroundColor="#FFF"
              padding="15px 45px 15px 14px" // Adjusted padding to make space for the right icon
              minHeight="40px"
              border="1px solid #b0b0b0"
              borderRadius="6px"
              color="#505050"
              _placeholder={{
                color: "#A0AEC0",
              }}
              fontSize="lg"
              placeholder={placeholder}
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              {...register}
              value={value}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </Box>
          <InputRightElement
            display={eyeVisible ? "block" : "none"}
            position="absolute"
            right="14px"
            top="50%"
            transform="translateY(-50%)"
          >
            <Button
              variant="inputIcon"
              backgroundColor="transparent"
              color={"#000"}
              height="100%"
              onClick={handlePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
      <ErrorMessage isTouched={isTouched} error={error} />
    </FormControl>
  );
}
