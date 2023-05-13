import React from "react";
import GeneralHeader from "../GeneralHeader/GeneralHeader";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IRentInputProps } from "@/inferfaces/IRentInputProps";
import NumberInputSelector from "../NumberController/NumberController";

interface IProps {
  register: UseFormRegister<IRentInputProps>;
  errors: FieldErrors<IRentInputProps>;
  value: number;
}

const PropertyPrice = ({ register, errors, value }: IProps) => {
  return (
    <>
      <GeneralHeader
        title="Set a price for your property"
        subTitle="How much would you charge per night?"
      />

      <NumberInputSelector
        value={value}
        name="propertyPrice"
        error={errors.propertyPrice?.message}
        register={register("propertyPrice")}
      />
    </>
  );
};

export default PropertyPrice;
