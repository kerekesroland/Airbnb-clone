"use client";

import { Flex, Text } from "@chakra-ui/react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import ImageSelectorHeader from "./ImageSelectorHeader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { IRentInputProps } from "@/inferfaces/IRentInputProps";
import { FieldErrors } from "react-hook-form";

declare global {
  var cloudinary: any;
}

interface IProps {
  value: string;
  onChange: (value: string) => void;
  errors: FieldErrors<IRentInputProps>;
}
const ImageSelector = ({ value, onChange, errors }: IProps) => {
  const handleUploadImage = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <>
      <ImageSelectorHeader
        title="How does your property look like?"
        subTitle="Share a photo of your property"
      />
      <br />

      <ErrorMessage error={errors.propertyImage?.message} />

      <br />

      <CldUploadWidget
        onUpload={handleUploadImage}
        uploadPreset="ysnphuf1"
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => {
          return (
            <Flex
              position="relative"
              cursor="pointer"
              _hover={{
                opacity: 0.7,
              }}
              border="2px dashed #eee"
              padding="100px 20px"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
              color="#404040"
              onClick={() => open?.()}
            >
              <TbPhotoPlus size={50} />
              <Text fontSize="1rem" fontWeight="600">
                Upload image
              </Text>
              {value && (
                <Flex position="absolute" inset="0" width="100%" height="100%">
                  <Image
                    src={value}
                    alt="uploaded image"
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </Flex>
              )}
            </Flex>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default ImageSelector;
