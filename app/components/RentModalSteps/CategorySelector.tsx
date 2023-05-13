import { CATEGORIES } from "@/constants/categories";
import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import CategoryPick from "../CategoryPick/CategoryPick";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import RentModalHeader from "../RentModalHeader/RentModalHeader";
import { FieldErrors } from "react-hook-form";
import { IRentInputProps } from "@/inferfaces/IRentInputProps";

interface IProps {
  errors: FieldErrors<IRentInputProps>;
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  handleSetValue: (id: keyof IRentInputProps, value: any) => void;
}

const CategorySelector = ({
  errors,
  activeCategory,
  setActiveCategory,
  handleSetValue,
}: IProps) => {
  return (
    <>
      <RentModalHeader
        title="Which of these best describe your property?"
        subTitle="Pick a category"
      />
      <ErrorMessage error={errors.propertyType?.message} />
      <Flex
        width="100%"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        gap="1rem"
        overflowY="scroll"
        height="500px"
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
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
              style={{
                flex: "1 1 260px",
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
};

export default CategorySelector;
