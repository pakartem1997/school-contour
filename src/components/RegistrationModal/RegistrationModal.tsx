import React, { useRef, useState } from 'react';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';

import { Modal } from '../Modal';
import { Form, Row } from '../Form';
import { Label } from '../Label';
import { Button } from '../Button';
import { validateEmail, validatePassword, vatidateRepeatedPassword } from '../../helpers/validators';
import { Input } from '@skbkontur/react-ui';

interface RegistrationFormState {
  email: string;
  password1: string;
  password2: string;
}

export interface RegistrationFormData {
  email: string;
  password: string;
}

interface Props {
  onClose: () => void;
  onLoginClick: () => void;
  onRegister: (data: RegistrationFormData) => void;
}

export const RegistrationModal = ({ onClose, onRegister, onLoginClick }: Props) => {
  const [state, setState] = useState<RegistrationFormState>({
    email: '',
    password1: '',
    password2: '',
  });
  const validationContainerRef = useRef<ValidationContainer>(null);

  const getFieldSetter = (field: keyof RegistrationFormState) => {
    return (value: string) => {
      setState({ ...state, [field]: value });
    };
  };

  const handleRegisterClick = async () => {
    const isValid = validationContainerRef.current && (await validationContainerRef.current.validate());

    if (!isValid) {
      return;
    }

    onRegister({
      email: state.email,
      password: state.password1,
    });
  };

  const handleLoginClick = () => {
    onClose();
    onLoginClick();
  };

  return (
    <Modal width={400} title={'Регистрация'} onClose={onClose}>
      <ValidationContainer ref={validationContainerRef}>
        <Form>
          <Row>
            <Label htmlFor="reg-email">Email</Label>
            <ValidationWrapper validationInfo={validateEmail(state.email)}>
              <Input
                width="100%"
                size="medium"
                id="reg-email"
                value={state.email}
                onValueChange={getFieldSetter('email')}
              />
            </ValidationWrapper>
          </Row>
          <Row>
            <Label htmlFor="reg-password1">Пароль</Label>
            <ValidationWrapper validationInfo={validatePassword(state.password1)}>
              <Input
                width="100%"
                size="medium"
                id="reg-password1"
                type="password"
                value={state.password1}
                onValueChange={getFieldSetter('password1')}
              />
            </ValidationWrapper>
          </Row>
          <Row>
            <Label htmlFor="reg-password2">Пароль</Label>
            <ValidationWrapper validationInfo={vatidateRepeatedPassword(state.password2, state.password1)}>
              <Input
                width="100%"
                size="medium"
                id="reg-password2"
                type="password"
                value={state.password2}
                onValueChange={getFieldSetter('password2')}
              />
            </ValidationWrapper>
          </Row>
          <Row>
            <Button wide large onClick={handleRegisterClick}>
              Зарегистрироваться
            </Button>
          </Row>
          <Row center>
            <Button link onClick={handleLoginClick}>
              Войти
            </Button>
          </Row>
        </Form>
      </ValidationContainer>
    </Modal>
  );
};
