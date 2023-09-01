import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CardDetailsModal } from './CardDetailsModal';

export default {
  title: 'компоненты/модалки',
  component: CardDetailsModal,
} as ComponentMeta<typeof CardDetailsModal>;

const Template: ComponentStory<typeof CardDetailsModal> = (args) => <CardDetailsModal {...args} />;

export const CardDetailsModalDefault = Template.bind({});
CardDetailsModalDefault.args = {};
