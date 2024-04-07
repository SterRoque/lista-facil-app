export const numberToBRL = (value: number) =>
   value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
