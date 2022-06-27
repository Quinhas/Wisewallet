import { getHours } from "date-fns";

export default function getGreeting(): string {
  const hour = getHours(new Date());
  if (hour > 18) {
    return "Boa noite";
  }

  if (hour > 11) {
    return "Boa tarde";
  }

  if (hour > 5) {
    return "Bom dia";
  }

  if (hour >= 0) {
    return "Boa noite";
  }
  return 'Hello';
}
