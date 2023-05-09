"use client";

import React, { useMemo, useState } from "react";
import PopupModal from "./PopupModal";
import useRentModal from "@/hooks/useRentModal";
import { Flex } from "@chakra-ui/react";

type Props = {};

enum steps {
  CATEGORY = 0,

  LOCATION = 1,

  INFO = 2,

  IMAGES = 3,

  DESCRIPTION = 4,

  PRICE = 5,
}

const RentModal = (props: Props) => {
  const { onClose, onOpen, isOpen } = useRentModal();
  const [step, setStep] = useState(steps.CATEGORY);

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleNextStep = () => {
    setStep((next) => next + 1);
  };

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

  //Todo make a switch statement

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Flex>asd</Flex>;
      default:
        return <></>;
    }
  };

  return (
    <PopupModal
      actionLabel={primaryLabel}
      body={renderStep()}
      secondaryActionLabel={secondaryLabel}
      secondaryAction={step === steps.CATEGORY ? undefined : handlePrevStep}
      title="Airbnb your home!"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onClose}
    />
  );
};

export default RentModal;
