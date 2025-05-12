import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale"; // Importamos la localización en español

type FormatOption = "default" | "date" | "long" | "longer" | "relative";

const dateFormats: Record<FormatOption, string> = {
  default: "HH:mm - dd/MM/yyyy", // Ejemplo: 16:14 - 12/05/2025
  date: "dd/MM/yyyy", // Ejemplo: 12/05/2025
  long: "dd 'de' MMMM, yyyy", // Ejemplo: 12 de mayo, 2025
  longer: "dd 'de' MMMM 'de' yyyy", // Ejemplo: 12 de mayo de 2025
  relative: "", // Este campo no tiene formato porque usaremos `formatDistanceToNow`
};

export const formatDate = (
  date: string | number | Date,
  formatType: FormatOption = "default"
): string => {
  // Verifica si la fecha es válida
  const dateInstance = new Date(date);
  if (isNaN(dateInstance.getTime())) {
    return "Fecha inválida"; // Fallback si la fecha es inválida
  }

  // Si el formato es 'relative', usamos formatDistanceToNow para calcular el tiempo relativo
  if (formatType === "relative") {
    return formatDistanceToNow(dateInstance, { addSuffix: true, locale: es });
  }

  // Si no es formato relativo, usamos `format` con los formatos tradicionales
  return format(dateInstance, dateFormats[formatType], { locale: es });
};
