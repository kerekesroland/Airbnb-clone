import { ResponsiveValue } from "@chakra-ui/react";

type TextAlign = "center" | "left" | "right";

export interface IErrorMessage {
  isTouched?: boolean | undefined | boolean[];
  error?: string;
  textAlign?: ResponsiveValue<TextAlign> | undefined;
}

export interface IInputController {
  label?: string;
  isTouched?: boolean | undefined;
  error?: string;
  type?: "text" | "email" | "number" | "date";
  register?: any;
  placeholder?: string;
  mb?: number;
  labelWeight?: "normal" | "bold";
  value?: string;
}

export interface IPasswordController {
  label?: string;
  eyeVisible?: boolean;
  isTouched: boolean | undefined;
  error?: string;
  register: any;
  cy_data?: string;
  placeholder?: string;
  labelWeight?: "normal" | "bold";
  value?: string;
}
