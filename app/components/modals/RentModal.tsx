"use client";

import React, { useCallback, useMemo, useState } from "react";
import PopupModal from "./PopupModal";
import useRentModal from "@/hooks/useRentModal";
import { Box } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthSchemas } from "@/hooks/useAuthSchemas";
import CategorySelector from "../RentModalSteps/CategorySelector";
import CountrySelector from "../RentModalSteps/CountrySelector";
import { ICountryValue } from "@/inferfaces/ICountryValue";
import { IRentInputProps } from "@/inferfaces/IRentInputProps";
import Location from "../Location/Location";
import PropertyDetails from "../RentModalSteps/PropertyDetails";
import ImageSelector from "../ImageSelector/ImageSelector";
import PropertyDescription from "../PropertyDescription/PropertyDescription";
import PropertyPrice from "../PropertyPrice/PropertyPrice";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const onCountryChange = (value: ICountryValue) => {
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
      2;
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
    formState: { errors },
  } = useForm<IRentInputProps>({
    resolver: yupResolver(rentSchema),
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      propertyDetails: {
        bathrooms: 1,
        rooms: 1,
        guests: 1,
      },
      propertyPrice: 0,
    },
  });

  // console.log(getValues());

  const propertyImage = watch("propertyImage");
  const propertyGuests = watch("propertyDetails.guests");
  const property = watch("propertyDetails");
  const propertyRooms = watch("propertyDetails.rooms");
  const propertyBathrooms = watch("propertyDetails.bathrooms");
  const propertyTitle = watch("propertyTitle");
  const propertyDescription = watch("propertyDescription");
  const propertyPrice = watch("propertyPrice");

  const validateStep = async () => {
    const propertyTypeTrigger = () => [trigger?.("propertyType")];
    const countryTrigger = () => [trigger?.("country")];
    const propertyDetailsTrigger = () => [
      trigger?.("propertyDetails.guests"),
      trigger?.("propertyDetails.rooms"),
      trigger?.("propertyDetails.bathrooms"),
    ];
    const propertyImageTrigger = () => [trigger?.("propertyImage")];

    const propertyDescriptionTrigger = () => [
      trigger?.("propertyTitle"),
      trigger?.("propertyDescription"),
    ];

    const priceTrigger = () => [trigger?.("propertyPrice")];

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

      case 2:
        const propertyDetailsValidationTrigger = await Promise.all(
          propertyDetailsTrigger()
        );
        if (propertyDetailsValidationTrigger.every((item) => item === true)) {
          handleNextStep();
        }
        break;

      case 3:
        const propertyImageValidationTrigger = await Promise.all(
          propertyImageTrigger()
        );
        if (propertyImageValidationTrigger.every((item) => item === true)) {
          handleNextStep();
        }
        break;

      case 4:
        const propertyDescriptionValidationTrigger = await Promise.all(
          propertyDescriptionTrigger()
        );
        if (
          propertyDescriptionValidationTrigger.every((item) => item === true)
        ) {
          handleNextStep();
        }
        break;

      case 5:
        const priceValidationTrigger = await Promise.all(priceTrigger());

        if (priceValidationTrigger.every((item) => item === true)) {
          await handleSubmit?.(onSubmit as SubmitHandler<IRentInputProps>)();
        }
        break;

      default:
        break;
    }
  };

  const onSubmit = async (data: IRentInputProps) => {
    const coordinates = countryValue?.latlong?.map((el) => String(el));
    try {
      setLoading(true);
      await axios.post("/api/rentairbnb", {
        ...data,
        country: countryValue?.region
          ?.concat(", ")
          .concat(countryValue?.label as string),
        coordinates: coordinates,
      });
      toast?.success("Successfully added your airbnb!");
      router.refresh();
      reset();
      setStep(steps.CATEGORY);
      onClose();
    } catch (error) {
      toast?.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // console.log(getValues());

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
        return (
          <PropertyDetails
            propertyGuests={propertyGuests}
            propertyRooms={propertyRooms}
            propertyBathrooms={propertyBathrooms}
            setValue={setValue}
          />
        );

      case 3:
        return (
          <ImageSelector
            errors={errors}
            value={propertyImage}
            onChange={(value) => handleSetValue("propertyImage", value)}
          />
        );

      case 4:
        return (
          <PropertyDescription
            propertyTitle={propertyTitle}
            propertyDescription={propertyDescription}
            register={register}
            errors={errors}
            key="propertyDescription"
          />
        );

      case 5:
        return (
          <PropertyPrice
            register={register}
            errors={errors}
            value={propertyPrice}
          />
        );
      default:
        return null;
    }
  };

  const modalBody = <form>{renderStep()}</form>;

  return (
    <PopupModal
      actionLabel={primaryLabel}
      noOverflow={step === 1 || (step === 0 && true)}
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
