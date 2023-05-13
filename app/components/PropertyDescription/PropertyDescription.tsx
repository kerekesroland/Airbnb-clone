import React from "react";
import GeneralHeader from "../GeneralHeader/GeneralHeader";
import { InputController } from "../InputController/InputController";
import { IRentInputProps } from "@/inferfaces/IRentInputProps";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Box } from "@chakra-ui/react";

interface IProps {
  register: UseFormRegister<IRentInputProps>;
  errors: FieldErrors<IRentInputProps>;
  propertyTitle: string;
  propertyDescription: string;
}

const PropertyDescription = ({
  register,
  errors,
  propertyTitle,
  propertyDescription,
}: IProps) => {
  return (
    <>
      <GeneralHeader
        title="Can you provide a description of your place?"
        subTitle="A brief and concise statement is often most effective."
      />

      <Box mt="40px" />
      <InputController
        register={register("propertyTitle")}
        error={errors["propertyTitle"]?.message}
        label="Title"
        value={propertyTitle}
      />
      <InputController
        register={register("propertyDescription")}
        error={errors["propertyDescription"]?.message}
        label="Description"
        value={propertyDescription}
        noMargin
      />
    </>
  );
};

export default PropertyDescription;
