'use client';

import styles from './Categories.module.css';

import Container from '../Container';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

export const categories = [
  {
    label: 'categoryBeach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'categoryWindmills',
    icon: GiWindmill,
    description: 'This property has windmills!',
  },
  {
    label: 'categoryModern',
    icon: MdOutlineVilla,
    description: 'This property is modern!',
  },
  {
    label: 'categoryCountryside',
    icon: TbMountain,
    description: 'This property is in the countryside!',
  },
  {
    label: 'categoryPools',
    icon: TbPool,
    description: 'This is property has a beautiful pool!',
  },
  {
    label: 'categoryIslands',
    icon: GiIsland,
    description: 'This property is on an island!',
  },
  {
    label: 'categoryLake',
    icon: GiBoatFishing,
    description: 'This property is near a lake!',
  },
  {
    label: 'categorySkiing',
    icon: FaSkiing,
    description: 'This property has skiing activies!',
  },
  {
    label: 'categoryCastles',
    icon: GiCastle,
    description: 'This property is an ancient castle!',
  },
  {
    label: 'categoryCaves',
    icon: GiCaveEntrance,
    description: 'This property is in a spooky cave!',
  },
  {
    label: 'categoryCamping',
    icon: GiForestCamp,
    description: 'This property offers camping activities!',
  },
  {
    label: 'categoryArctic',
    icon: BsSnow,
    description: 'This property is in arctic environment!',
  },
  {
    label: 'categoryDesert',
    icon: GiCactus,
    description: 'This property is in the desert!',
  },
  {
    label: 'categoryBarns',
    icon: GiBarn,
    description: 'This property is in a barn!',
  },
  {
    label: 'categoryLux',
    icon: IoDiamond,
    description: 'This property is brand new and luxurious!',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const { t } = useTranslation();

  const category = params?.get('category');
  const pathname = usePathname();

  const mainPaths = ['/', '/en', '/ko'];
  const isMainPage = mainPaths.includes(pathname);
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className={styles.container}>
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={t(item.label)}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
