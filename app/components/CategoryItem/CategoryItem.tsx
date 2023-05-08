"use client";

import { Flex, Text } from "@chakra-ui/react";
import React, { useCallback } from "react";
import styles from "./CategoryItem.module.scss";
import { IconType } from "react-icons";
import queryString from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  label: string;
  desc: string;
  icon: IconType;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const CategoryItem = ({
  label,
  icon: Icon,
  active,
  setActive,
  desc,
}: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const classes = (label: string) => {
    return label === active
      ? styles.category_container.concat(" ").concat(styles.active)
      : styles.category_container;
  };

  const handleQueryParams = useCallback(() => {
    setActive((prevActive) => (prevActive === label ? undefined : label));
    let query = {};

    if (params) {
      query = queryString.parse(params.toString());
    }

    const newQuery: any = {
      ...query,
      category: label,
    };

    if (params?.get("category") === label) {
      delete newQuery?.category;
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: newQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [params, label, router, setActive]);

  return (
    <Flex
      cursor="pointer"
      onClick={handleQueryParams}
      className={classes(label)}
      key={label}
    >
      <Icon className={styles.icon} size={24} />
      <Text className={styles.label}>{label}</Text>
    </Flex>
  );
};

export default CategoryItem;
