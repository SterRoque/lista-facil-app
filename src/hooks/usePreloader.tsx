import { PreloaderContext } from 'contexts/PreloaderContext';
import { useContext } from 'react';

export function usePreloader() {
   const { isOpenPreloader, setIsOpenPreloader } = useContext(PreloaderContext);

   function openPreloader() {
      if (!isOpenPreloader) {
         setIsOpenPreloader(true);
      }
   }

   function closePreloader() {
      if (isOpenPreloader) {
         setIsOpenPreloader(false);
      }
   }

   return {
      openPreloader,
      closePreloader,
      isLoading: isOpenPreloader,
   };
}
