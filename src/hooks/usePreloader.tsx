import { PreloaderContext } from 'contexts/PreloaderContext';
import { useContext } from 'react';

export function usePreloader() {
   const { isOpenPreloader, setIsOpenPreloader } = useContext(PreloaderContext);

   function openPreloader() {
      setIsOpenPreloader(true);
   }

   function closePreloader() {
      setIsOpenPreloader(false);
   }

   return {
      openPreloader,
      closePreloader,
      isLoading: isOpenPreloader,
   };
}
