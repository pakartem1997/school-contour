import React, { useRef, useState } from 'react';
import { Modal } from '../Modal';
import { Row } from '../Form';
import { Label } from '../Label';
import { Button } from '../Button';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { validateEmail, validatePassword } from '../../helpers/validators';
import { Input } from '@skbkontur/react-ui';

export interface LoginFormData {
  email: string;
  password: string;
}

interface Props {
  onLogin: (data: LoginFormData) => void;
  onClose: () => void;
  onRegistrClick: () => void;
}

export const LoginModal = ({ onLogin, onClose, onRegistrClick }: Props) => {
  const validationContainerRef = useRef<ValidationContainer>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = async () => {
    const isValid = validationContainerRef.current && (await validationContainerRef.current.validate());

    if (!isValid) {
      return;
    }

    onLogin({ email, password });
  };

  const handleRegisterClick = () => {
    onClose();
    onRegistrClick();
  };

  return (
    <Modal width={400} title={'Вход'} onClose={onClose}>
      <ValidationContainer ref={validationContainerRef}>
        <Row>
          <Label htmlFor="login-email">Email</Label>
          <ValidationWrapper validationInfo={validateEmail(email)}>
            <Input width="100%" size="medium" id="login-email" value={email} onValueChange={setEmail} />
          </ValidationWrapper>
        </Row>
        <Row>
          <Label htmlFor="login-password">Пароль</Label>
          <ValidationWrapper validationInfo={validatePassword(password)}>
            <Input
              width="100%"
              size="medium"
              id="login-password"
              type={'password'}
              value={password}
              onValueChange={setPassword}
            />
          </ValidationWrapper>
        </Row>
        <Row>
          <Button wide large onClick={handleLoginClick}>
            Войти
          </Button>
        </Row>
        <Row center>
          <Button link onClick={handleRegisterClick}>
            Зарегистрироваться
          </Button>
        </Row>
      </ValidationContainer>
    </Modal>
  );
};
