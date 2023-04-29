"use client";
import styles from "./PopupModal.module.scss";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import CustomButton from "../Button/Button";

interface IPopupModalProps {
  isOpen?: boolean;
  reset: () => void;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const PopupModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  reset,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: IPopupModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleCloseModal = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(() => {
      onClose();
      reset();
    }, 200);
  }, [disabled, onClose, reset]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    handleSecondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Flex onClick={handleCloseModal} className={styles.overlay}>
      <Flex
        onClick={handleContentClick}
        zIndex={320}
        className={styles.modal__content}
      >
        <Box
          h="full"
          transitionDuration={"300ms"}
          className={`${showModal ? styles.modal_opened : styles.modal_closed}`}
        >
          <Box className={styles.content}>
            <Box className={styles.header}>
              <Button
                onClick={handleCloseModal}
                padding="4px"
                border="none"
                _hover={{
                  opacity: 70,
                }}
                position="absolute"
                left="2.25rem"
              >
                <IoMdClose size="18" />
              </Button>
              <Box className={styles.header_title__container}>
                <Text className={styles.header_title}>{title}</Text>
              </Box>
            </Box>
            <Box flex="1 1 auto" position="relative" className={styles.body}>
              {body}
            </Box>
            <Flex className={styles.button__container}>
              {secondaryAction && secondaryActionLabel && (
                <CustomButton
                  outline
                  disabled={disabled}
                  label={secondaryActionLabel}
                  onClick={handleSecondaryAction}
                />
              )}

              <CustomButton
                disabled={disabled}
                label={actionLabel}
                onClick={handleSubmit}
              />
            </Flex>
            {footer}
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default PopupModal;
