"use client";

import React, { useCallback, useMemo, useState } from "react";
import PopupModal from "./PopupModal";
import useRentModal from "@/hooks/useRentModal";
import { Box } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuthSchemas } from "@/hooks/useAuthSchemas";
import CategorySelector from "../RentModalSteps/CategorySelector";
import CountrySelector from "../RentModalSteps/CountrySelector";
import { ICountryValue } from "@/inferfaces/ICountryValue";
import { IRentInputProps } from "@/inferfaces/IRentInputProps";
import Location from "../Location/Location";
import PropertyDetails from "../RentModalSteps/PropertyDetails";

enum steps {
  CATEGORY = 0,

  LOCATION = 1,

  INFO = 2,

  IMAGES = 3,

  DESCRIPTION = 4,

  PRICE = 5,
}

const RentModal = () => {
  const { rentSchema } = useAuthSchemas();
  const { onClose, onOpen, isOpen } = useRentModal();
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState(steps.CATEGORY);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [countryValue, setCountryValue] = useState<ICountryValue | undefined>(
    undefined
  );
  const [countryValidation, setCountryValidation] = useState<boolean>(false);

  const onCountryChange = (value: ICountryValue) => {
    console.log(value?.latlong);
    setCountryValue(value);
    handleSetValue("country", value?.label || undefined);
  };

  const handlePrevStep = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const handleNextStep = useCallback(() => {
    setStep((next) => next + 1);
  }, []);

  const primaryLabel = useMemo(() => {
    if (step === steps.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryLabel = useMemo(() => {
    if (step === steps.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    setValue,
    getValues,
    formState: { errors, touchedFields },
  } = useForm<IRentInputProps>({
    resolver: yupResolver(rentSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  // console.log(getValues());

  const validateStep = async () => {
    const propertyTypeTrigger = () => [trigger?.("propertyType")];
    const countryTrigger = () => [trigger?.("country")];

    switch (step) {
      case 0:
        const propertyValidation = await Promise.all(propertyTypeTrigger());
        if (propertyValidation.every((item) => item === true)) {
          handleNextStep();
        }
        break;
      case 1:
        setCountryValidation(true);
        const countryValidationTrigger = await Promise.all(countryTrigger());
        if (countryValidationTrigger.every((item) => item === true)) {
          handleNextStep();
        }
        break;

      default:
        break;
    }
  };

  const onSubmit = (data: IRentInputProps) => {
    console.log(data);
  };

  console.log(errors);

  const handleSetValue = (id: keyof IRentInputProps, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <CategorySelector
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            errors={errors}
            handleSetValue={handleSetValue}
          />
        );
      case 1:
        return (
          <>
            <CountrySelector
              errors={errors}
              countryValidation={countryValidation}
              value={countryValue}
              onChange={onCountryChange}
            />
            <Location center={countryValue?.latlong} />
          </>
        );
      case 2:
        return <PropertyDetails />;

      default:
        return <></>;
    }
  };

  const modalBody = <form>{renderStep()}</form>;

  return (
    <PopupModal
      actionLabel={primaryLabel}
      noOverflow={step === 1 && true}
      body={modalBody}
      footer={<Box paddingBottom="40px" />}
      secondaryActionLabel={secondaryLabel}
      secondaryAction={step === steps.CATEGORY ? undefined : handlePrevStep}
      title="Airbnb your home!"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setActiveCategory("");
        setCountryValue(undefined);
      }}
      onSubmit={validateStep}
      reset={reset}
      disabled={loading}
    />
  );
};

export default RentModal;
