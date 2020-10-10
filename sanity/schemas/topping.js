import { FaPepperHot as icon } from 'react-icons/fa';

export default {
  // Table
  name: 'topping',
  title: 'Toppings',
  type: 'document',
  icon,
  // Columns
  fields: [
    {
      name: 'name',
      title: 'Topping Name',
      type: 'string',
      description: 'What is the name of the topping',
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'is it vegeterian?',
      options: { layout: 'checkbox' },
    },
  ],
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian',
    },
    prepare: (fields) => ({
      title: `${fields.name} ${fields.vegetarian ? '(Veg)' : ''}`,
    }),
  },
};
