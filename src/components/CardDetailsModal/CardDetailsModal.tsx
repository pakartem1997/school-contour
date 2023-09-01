import React, { useRef, useState } from 'react';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { Modal } from '../Modal';
import { Form, Row, RowCol } from '../Form';
import { Label } from '../Label';
import { Button } from '../Button';
import { validateCardNumber, validateCardDate, validateCardCVV } from '../../helpers/validators';
import { Input } from '@skbkontur/react-ui';

interface Props {
  onClose: () => void;
}

export const CardDetailsModal = ({ onClose }: Props) => {
  const [numberCard, setNumberCard] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  const validationContainerRef = useRef<ValidationContainer>(null);

  const handleLinkCardClick = async () => {
    const isValid = validationContainerRef.current && (await validationContainerRef.current.validate());

    if (!isValid) {
      return;
    }

    onClose();
  };

  return (
    <Modal width={456} title={'Реквизиты карты'} onClose={onClose}>
      <ValidationContainer ref={validationContainerRef}>
        <Form>
          <Row>
            <Label htmlFor="reg-cardNumber">Номер карты</Label>
            <ValidationWrapper validationInfo={validateCardNumber(numberCard)}>
              <Input
                width="100%"
                size="medium"
                id="reg-cardNumber"
                value={numberCard}
                onValueChange={(value: string) => {
                  setNumberCard(value);
                }}
                placeholder="0000 0000 0000 0000"
              />
            </ValidationWrapper>
          </Row>

          <Row>
            <RowCol>
              <Row col>
                <Label htmlFor="reg-cardDate">Срок</Label>
                <ValidationWrapper validationInfo={validateCardDate(cardDate)}>
                  <Input
                    width="100%"
                    size="medium"
                    id="reg-cardDate"
                    value={cardDate}
                    onValueChange={(value: string) => {
                      setCardDate(value);
                    }}
                    placeholder="ММ/ГГ"
                  />
                </ValidationWrapper>
              </Row>

              <Row col>
                <Label htmlFor="reg-cardCVV">CVV</Label>
                <ValidationWrapper validationInfo={validateCardCVV(cardCVV)}>
                  <Input
                    width="100%"
                    size="medium"
                    id="reg-cardCVV"
                    value={cardCVV}
                    onValueChange={(value: string) => {
                      setCardCVV(value);
                    }}
                    placeholder="•••"
                  />
                </ValidationWrapper>
              </Row>
            </RowCol>
          </Row>

          <Row>
            <Button wide large disabled onClick={handleLinkCardClick}>
              Привязать карту
            </Button>
          </Row>

          <Row center>
            <Button link onClick={onClose}>
              Привязать потом
            </Button>
          </Row>
        </Form>
      </ValidationContainer>
    </Modal>
  );
};
