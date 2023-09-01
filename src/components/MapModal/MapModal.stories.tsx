import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MapModal } from './MapModal';

export default {
  title: 'компоненты/модалки',
  component: MapModal,
} as ComponentMeta<typeof MapModal>;

const Template: ComponentStory<typeof MapModal> = (args) => <MapModal {...args} />;

export const MapModalDefault = Template.bind({});
MapModalDefault.args = {};
