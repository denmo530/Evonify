"use client";

import { CategoryItem } from "./category-item";

import { usePathname, useSearchParams } from "next/navigation";

import { BiDrink, BiBeer } from "react-icons/bi";
import {
  MdOutlineForest,
  MdSportsBasketball,
  MdOutlineMusicNote,
  MdOutlineTheaterComedy,
} from "react-icons/md";
import {
  FaRegLaughBeam,
  FaChalkboardTeacher,
  FaPaintBrush,
  FaUtensils,
  FaFilm,
} from "react-icons/fa";
import { IoIosFitness, IoMdPeople } from "react-icons/io";

export const categories = [
  {
    label: "Nightclub",
    icon: <BiDrink className="w-4 h-4" />,
    description: "This event is at a nightclub",
  },
  {
    label: "Bar",
    icon: <BiBeer className="w-4 h-4" />,
    description: "This event is at a bar",
  },
  {
    label: "Outdoors",
    icon: <MdOutlineForest className="w-4 h-4" />,
    description: "This event is an outdoors activity",
  },
  {
    label: "Concert",
    icon: <MdOutlineMusicNote className="w-4 h-4" />,
    description: "This event is a music concert",
  },
  {
    label: "Theater",
    icon: <MdOutlineTheaterComedy className="w-4 h-4" />,
    description: "This event is a theater performance",
  },
  {
    label: "Comedy",
    icon: <FaRegLaughBeam className="w-4 h-4" />,
    description: "This event is a comedy show",
  },
  {
    label: "Workshop",
    icon: <FaChalkboardTeacher className="w-4 h-4" />,
    description: "This event is a workshop",
  },
  {
    label: "Art",
    icon: <FaPaintBrush className="w-4 h-4" />,
    description: "This event is an art exhibition or activity",
  },
  {
    label: "Food & Drink",
    icon: <FaUtensils className="w-4 h-4" />,
    description: "This event is a food and drink tasting",
  },
  {
    label: "Movie",
    icon: <FaFilm className="w-4 h-4" />,
    description: "This event is a movie screening",
  },
  {
    label: "Fitness",
    icon: <IoIosFitness className="w-4 h-4" />,
    description: "This event is a fitness activity",
  },
  {
    label: "Sports",
    icon: <MdSportsBasketball className="w-4 h-4" />,
    description: "This event is a sports activity or game",
  },
  {
    label: "Social",
    icon: <IoMdPeople className="w-4 h-4" />,
    description: "This event is a social gathering",
  },
];

export function Categories() {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();

  const isMainPage = pathName === "/explore/events";

  if (!isMainPage) return null;

  return (
    <section className="container">
      <div className="pt-4 flex items-center justify-between overflow-x-auto">
        {categories.map((item, index) => (
          <CategoryItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={item.label === category}
          />
        ))}
      </div>
    </section>
  );
}
