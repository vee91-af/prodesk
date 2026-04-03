import { MyButton, MyInput, ProductCard } from './MyLibrary';

export default {
  title: 'Level 3/Design System',
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

// Button Story with Controls
export const Button = {
  render: (args) => <MyButton {...args} />,
  args: {
    primary: true,
    label: 'Interactive Button',
    disabled: false,
  },
};

// Input Story
export const TextInput = {
  render: (args) => <MyInput {...args} />,
  args: {
    label: 'Username',
    placeholder: 'Enter your name...',
  },
};

// Card Story
export const Card = {
  render: (args) => <ProductCard {...args} />,
  args: {
    title: 'Modern Headphones',
    price: '99.99',
  },
};