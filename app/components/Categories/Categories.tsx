"use client";

import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import { BiBed } from "react-icons/bi";
import { BsSnow } from "react-icons/bs";
import { FaSwimmingPool } from "react-icons/fa";
import {
  GiDesert,
  GiElvenCastle,
  GiIsland,
  GiSpookyHouse,
  GiTreehouse,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import {
  MdHouseSiding,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlinePanorama,
} from "react-icons/md";
import { RiFireLine } from "react-icons/ri";
import { TbBeach, TbCampfire, TbMountain, TbSailboat } from "react-icons/tb";

import { Flex } from "@chakra-ui/react";

import CategoryItem from "../CategoryItem/CategoryItem";
import styles from "./Categories.module.scss";

type Props = {};

export const CATEGORIES = [
  {
    label: "Rooms",
    image: BiBed,
    desc: "Just a room",
    active: false,
  },
  {
    label: "Beachfront",
    image: TbBeach,
    desc: "Close to the beach",
    active: false,
  },
  {
    label: "Countryside",
    image: TbMountain,
    desc: "This is in the countryside",
    active: false,
  },
  {
    label: "Mansions",
    image: GiSpookyHouse,
    desc: "This is a huge mansion",
    active: false,
  },
  {
    label: "Treehouses",
    image: GiTreehouse,
    desc: "A tree house",
    active: false,
  },
  {
    label: "Cabins",
    image: MdHouseSiding,
    desc: "This is a cabin",
    active: false,
  },
  {
    label: "Pool",
    image: FaSwimmingPool,
    desc: "It has pools",
    active: false,
  },
  {
    label: "Luxury",
    image: IoDiamond,
    desc: "Luxury apartments",
    active: false,
  },
  {
    label: "Desert",
    image: GiDesert,
    desc: "This property is in the deset",
    active: false,
  },
  {
    label: "Islands",
    image: GiIsland,
    desc: "This is on an island",
    active: false,
  },
  {
    label: "Arctics",
    image: BsSnow,
    desc: "This property is on the Arctics",
    active: false,
  },
  {
    label: "Boats",
    image: TbSailboat,
    desc: "This property is on a boat",
    active: false,
  },
  {
    label: "Amazing views",
    image: MdOutlinePanorama,
    desc: "This property has amazing views",
    active: false,
  },
  {
    label: "Castle",
    image: GiElvenCastle,
    desc: "This property is inside a castle",
    active: false,
  },
  {
    label: "Fire",
    image: RiFireLine,
    desc: "This is one of the most popular properties",
    active: false,
  },
  {
    label: "Camping",
    image: TbCampfire,
    desc: "This property is on a campsite",
    active: false,
  },
];

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
