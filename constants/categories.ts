import { RiFireLine } from "react-icons/ri";
import { TbBeach, TbCampfire, TbMountain, TbSailboat } from "react-icons/tb";
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
import { MdOutlinePanorama, MdHouseSiding } from "react-icons/md";

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
