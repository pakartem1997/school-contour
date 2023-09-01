import React from 'react';
import ReactDOM from 'react-dom';
import { import as importYmaps3Module } from 'ymaps3';

/**
 * Функция получения инстанса класса Reactify для преобразования классов JS API Яндекс карт 3.0 в React компоненты
 */
export async function getReactify() {
  // O.o я сам хз что тут происходит, документации нормальной на это нет
  // только пример тут https://yandex.ru/dev/maps/jsapi/doc/3.0/ref/packages/clusterer/index.html#react-example
  const ymaps3React = await importYmaps3Module('@yandex/ymaps3-reactify');
  const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);

  return reactify;
}
