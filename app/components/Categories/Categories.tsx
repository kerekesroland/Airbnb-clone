import { Flex, Text } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { TbBeach, TbSailboat, TbCampfire } from "react-icons/tb";
import {
  GiTreehouse,
  GiSpookyHouse,
  GiDesert,
  GiIsland,
  GiElvenCastle,
} from "react-icons/gi";
import { BiBed } from "react-icons/bi";
import { BsSnow } from "react-icons/bs";
import {
  MdHouseSiding,
  MdOutlinePanorama,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { FaSwimmingPool } from "react-icons/fa";
import { RiFireLine } from "react-icons/ri";

import styles from "./Categories.module.scss";

type Props = {};

export const CATEGORIES = [
  {
    label: "Rooms",
    image: BiBed,
    desc: "Close to the beach",
    active: false,
  },
  {
    label: "Beachfront",
    image: TbBeach,
    desc: "Close to the beach",
    active: false,
  },
  {
    label: "Mansions",
    image: GiSpookyHouse,
    desc: "Close to the beach",
    active: false,
  },
  {
    label: "Treehouses",
    image: GiTreehouse,
    desc: "Close to the beach",
    active: false,
  },
  {
    label: "Cabins",
    image: MdHouseSiding,
    desc: "Close to the beach",
    active: false,
  },
  {
    label: "Pool",
    image: FaSwimmingPool,
    desc: "Close to the beach",
    active: false,
  },
  {
    label: "Desert",
    image: GiDesert,
    desc: "Close to the beach",
    active: false,
  },
  {
    label: "Islands",
    image: GiIsland,
    desc: "Close to the beach",
    active: false,
  },
  {
    label: "Arctics",
    image: BsSnow,
    desc: "Close to the beach",
    active: false,
  },
  {
    label: "Boats",
    image: TbSailboat,
    desc: "Close to the beach",
    active: false,
  },
  {
    label: "Amazing views",
    image: MdOutlinePanorama,
    desc: "Close to the beach",
    active: false,
  },
  {
    label: "Castle",
    image: GiElvenCastle,
    desc: "Close to the beach",
    active: false,
  },
  {
    label: "Fire",
    image: RiFireLine,
    desc: "Close to the beach",
    active: false,
  },
  {
    label: "Camping",
    image: TbCampfire,
    desc: "Close to the beach",
    active: false,
  },
];

const Categories = (props: Props) => {
  const [active, setActive] = useState<string>();
  const containerRef: any = useRef(null);
  const scrollDistance = containerRef.current?.clientWidth || 62;
  const handleActiveTab = (label: string) => {
    setActive((prevActive) => (prevActive === label ? undefined : label));
  };

  const classes = (label: string) => {
    return label === active
      ? styles.category_container.concat(" ").concat(styles.active)
      : styles.category_container;
  };

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
          <Flex
            cursor="pointer"
            onClick={() => handleActiveTab(label)}
            className={classes(label)}
            key={label}
          >
            <Icon className={styles.icon} size={24} />
            <Text className={styles.label}>{label}</Text>
          </Flex>
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
