"use client";

import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import { Flex } from "@chakra-ui/react";

import CategoryItem from "../CategoryItem/CategoryItem";
import styles from "./Categories.module.scss";
import { CATEGORIES } from "@/constants/categories";

type Props = {};

const Categories = (props: Props) => {
  const path = usePathname();
  const mainPage = path === "/";

  const [active, setActive] = useState<string>();
  const containerRef: any = useRef(null);
  const scrollDistance = containerRef.current?.clientWidth || 62;

  const scrollToNext = () => {
    if (containerRef?.current?.scrollLeft !== undefined) {
      containerRef.current.scrollLeft += scrollDistance;
    }
  };
  const scrollToPrev = () => {
    if (containerRef?.current?.scrollLeft !== undefined) {
      containerRef.current.scrollLeft -= scrollDistance;
    }
  };

  if (!mainPage) {
    return null;
  }

  return (
    <Flex className={styles.container}>
      <Flex
        onClick={scrollToPrev}
        className={styles.arrow}
        cursor="pointer"
        padding="2.5px"
        borderRadius="50%"
        backgroundColor="#fff"
        outline="1px solid #eeeeee"
      >
        <MdOutlineKeyboardArrowLeft size="28px" />
      </Flex>
      <Flex ref={containerRef} className={styles.categories_container}>
        {CATEGORIES.map(({ label, image: Icon, desc }) => (
          <CategoryItem
            active={active as string}
            setActive={setActive}
            key={label}
            label={label}
            icon={Icon}
            desc={desc}
          />
        ))}
      </Flex>
      <Flex
        onClick={scrollToNext}
        className={styles.arrow}
        cursor="pointer"
        padding="2.5px"
        borderRadius="50%"
        backgroundColor="#fff"
        outline="1px solid #eeeeee"
      >
        <MdOutlineKeyboardArrowRight size="28px" />
      </Flex>
    </Flex>
  );
};

export default Categories;
