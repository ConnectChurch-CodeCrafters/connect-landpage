export function formatPrice(valor: number): string {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/[()\s-]/g, "");
}