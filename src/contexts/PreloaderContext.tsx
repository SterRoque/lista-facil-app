import {
   Dispatch,
   ReactElement,
   SetStateAction,
   createContext,
   useState,
} from 'react';
import { Preloader } from 'components/Preloader';

type PreloaderContextProps = {
   isOpenPreloader: boolean;
   setIsOpenPreloader: Dispatch<SetStateAction<boolean>>;
};

type PreloaderContextProviderProps = {
   children: ReactElement;
};

export const PreloaderContext = createContext({} as PreloaderContextProps);

export function PreloaderContextProvider({
   children,
}: PreloaderContextProviderProps) {
   const [isOpenPreloader, setIsOpenPreloader] = useState<boolean>(false);

   return (
      <PreloaderContext.Provider
         value={{
            isOpenPreloader,
            setIsOpenPreloader,
         }}>
         {children}
         {isOpenPreloader && <Preloader />}
      </PreloaderContext.Provider>
   );
}
