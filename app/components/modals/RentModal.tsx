"use client";

import React, { useCallback, useMemo, useState } from "react";
import PopupModal from "./PopupModal";
import useRentModal from "@/hooks/useRentModal";
import { Box, Flex } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuthSchemas } from "@/hooks/useAuthSchemas";
import RentModalHeader from "../RentModalHeader/RentModalHeader";
import { CATEGORIES } from "@/constants/categories";
import CategoryPick from "../CategoryPick/CategoryPick";
import { motion } from "framer-motion";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

interface IRentInputProps {
  propertyType: string;
}

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

    switch (step) {
      case 0:
        const propertyValidation = await Promise.all(propertyTypeTrigger());
        if (propertyValidation.every((item) => item === true)) {
          handleNextStep();
        }
      case 1:
    }
  };

  const onSubmit = (data: IRentInputProps) => {
    console.log(data);
  };

  const handleSetValue = (id: keyof IRentInputProps, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  console.log(errors);
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <RentModalHeader
              title="Which of these best describe your property?"
              subTitle="Pick a category"
            />
            <ErrorMessage error={errors.propertyType?.message} />
            <Flex
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
            >
              {CATEGORIES?.map((category, index) => {
                return (
                  <motion.div
                    key={category?.label}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <CategoryPick
                      {...category}
                      active={activeCategory}
                      setActive={setActiveCategory}
                      onChange={handleSetValue}
                    />
                  </motion.div>
                );
              })}
            </Flex>
          </>
        );
      default:
        return <></>;
    }
  };

  const modalBody = <form>{renderStep()}</form>;

  return (
    <PopupModal
      actionLabel={primaryLabel}
      body={modalBody}
      footer={<Box paddingBottom="40px" />}
      secondaryActionLabel={secondaryLabel}
      secondaryAction={step === steps.CATEGORY ? undefined : handlePrevStep}
      title="Airbnb your home!"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setActiveCategory("");
      }}
      onSubmit={validateStep}
      reset={reset}
      disabled={loading}
    />
  );
};

export default RentModal;
