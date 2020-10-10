import { MdPerson as icon } from 'react-icons/md';

export default {
  // Table
  name: 'person',
  title: 'SliceMasters',
  type: 'document',
  icon,
  // Columns
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'topping' }],
        },
      ],
    },
  ],
  //   preview: {
  //     select: {
  //       title: 'name',
  //       media: 'image',
  //       topping0: 'toppings.0.name',
  //       topping1: 'toppings.1.name',
  //       topping2: 'toppings.2.name',
  //       topping3: 'toppings.3.name',
  //     },
  //     prepare: ({ title, media, ...toppings }) => {
  //       console.log('stay');
  //       const tops = Object.values(toppings).filter((topping) => topping);
  //       return {
  //         title,
  //         media,
  //         subtitle: tops.join(', '),
  //       };
  //     },
  //   },
};
