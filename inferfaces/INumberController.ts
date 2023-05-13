import { ResponsiveValue } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";
import { IRentInputProps } from "./IRentInputProps";

type TextAlign = "center" | "left" | "right";

export interface IErrorMessage {
  isTouched?: boolean | undefined | boolean[];
  error?: string;
  textAlign?: ResponsiveValue<TextAlign> | undefined;
}

export interface INumberInputProps {
  label?: string;
  name: string;
  register: any;
  placeholder?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  isTouched?: boolean;
  labelWeight?: "normal" | "bold" | "semibold" | "medium" | "light";
  noMargin?: boolean;
  value: number;
}
