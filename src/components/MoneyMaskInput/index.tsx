import React from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { TextInput } from 'react-native-paper';

interface MoneyMaskInputProps {
   label: string;
   error?: boolean;
   value: string | undefined;
   onChangeText: (text: string) => void;
}

export function MoneyMaskInput({
   label,
   error,
   value,
   onChangeText,
}: MoneyMaskInputProps) {
   const formatMoney = (text: string) => {
      let cleanedText = text.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
      if (cleanedText.length <= 2) {
         cleanedText = cleanedText.replace(/(\d{1,2})$/, '$1'); // Formata centavos
      } else {
         cleanedText = cleanedText.replace(/(\d{1,2})$/, ',$1'); // Adiciona vírgula para centavos
         cleanedText = cleanedText.replace(/(\d)(?=(\d{3})+(\D))/g, '$1.'); // Adiciona ponto para milhar
      }
      return `R$ ${cleanedText}`;
   };

   const handleChangeText = (text: string) => {
      onChangeText(formatMoney(text)); // Atualiza o texto formatado
   };

   return (
      <TextInput
         label={label}
         placeholder='Digite um valor'
         value={value}
         error={error}
         onChangeText={handleChangeText}
         keyboardType='numeric'
         keyboardAppearance='light'
         style={{ flex: 1 }}
      />
   );
}
