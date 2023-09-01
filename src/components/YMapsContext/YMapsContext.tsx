import React from 'react';
import { ready, import as importYmaps3Module } from 'ymaps3';
import { Reactify } from '@yandex/ymaps3-types/reactify';
import { getReactify } from './utils';

/** NOTE from ppecheguzov:
 *  если кто-то придумает способ работать с яндекс картами проще, чем я написал,
 *  то пожму тому руку. Меня хватило только на это.
 */

const YMapsContextDefaultValue: YMapsContextType = { isAPILoaded: false };

export const YMapsContext = React.createContext<YMapsContextType | undefined>(undefined);

export function YMapsContextProvider({ children }: { children: React.ReactNode }) {
  const [contextValue, setContextValue] = React.useState<YMapsContextType>(YMapsContextDefaultValue);

  React.useEffect(() => {
    const initYMaps3 = async () => {
      try {
        // не функция, а уже сам Promise, ждём когда он будет fullfiled
        await ready;
        const reactify = await getReactify();
        const ymaps3MarkersModule = await importYmaps3Module('@yandex/ymaps3-markers@0.0.1');

        // Сейчас я в контекст кладу инстанс класса Reactify, и отдельно дополнительные модули, но наверно
        // TODO: стоит класть уже React компоненты всех модулей, вообще хз законно ли так делать, но чего-то лучше не придумал
        setContextValue({ isAPILoaded: true, reactify, ymaps3MarkersModule });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    initYMaps3();
  }, []);

  return <YMapsContext.Provider value={contextValue}>{children}</YMapsContext.Provider>;
}

// кастомный хук, обёртка над React.useContext с нужными значениями и проверками
export function useYMapsContext() {
  const context = React.useContext(YMapsContext);
  if (context === undefined) {
    throw new Error('useYMapsContext должен быть использован внутри YmapsContextProvider');
  }

  return context;
}

type YMapsContextType = {
  isAPILoaded: boolean;
  /**
   * инстанс класса Reactify.\
   * Имеет 2 метода преобразования JS API в React компоненты:
   *
   * 1) `.module()`, который преобразует модули целиком (`ymaps3`, или другие полученные через `ymaps3.import()`)\
   * Возвращает объект со всеми React компонентами модуля\
   * Пример использования:
   * ```ts
   * const { YMap, YMapDefaultSchemeLayer, YMapMarker, _etc_ } = reactify.module(ymaps3);
   * ```
   *
   * 2) `.entity()`, который преобразует точечно конкретный класс модуля JS API в React компонент\
   * Пример использования:
   * ```ts
   * const YMap = reactify.entity(ymaps3.YMap);
   * ```
   *
   * Тип пропов полученного React компонента ищи ручками в `node_modules/@yandex/ymaps3-types/imperative/<ComponentName> -> <ComponentName>Props`
   */
  reactify?: Reactify;
  /**
   * Модуль JS API с настроенными маркерами (точнее одним маркером)
   */
  ymaps3MarkersModule?: typeof import('../../../node_modules/@yandex/ymaps3-types/packages/markers/index');
  // Я уже не очень люблю разработчиков яндекс карт... Сделать тип лучше я тупо не смог
};
