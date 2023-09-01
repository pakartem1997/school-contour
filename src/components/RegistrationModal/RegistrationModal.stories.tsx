import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RegistrationModal } from './RegistrationModal';

export default {
  title: 'компоненты/модалки',
  component: RegistrationModal,
} as ComponentMeta<typeof RegistrationModal>;

const Template: ComponentStory<typeof RegistrationModal> = (args) => <RegistrationModal {...args} />;

export const RegistrationModalDefault = Template.bind({});
RegistrationModalDefault.args = {};
