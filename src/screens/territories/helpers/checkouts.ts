import { ICheckout, ITerritory } from "../../../contexts/interfaces";

export const getCheckoutsForServiceYear = (
  territory: ITerritory,
  serviceYear: number,
  limit = 4
) => {
 const entries: any[] = [];

  // 🔥 2. historia z danego roku służbowego
  const history = (territory.history || [])
    .filter(h => h.serviceYear === serviceYear)
    .sort(
      (a, b) =>
        new Date(b.takenDate).getTime() -
        new Date(a.takenDate).getTime()
    );

  entries.push(...history.reverse());

    // 🔥 1. aktualny przydział (jeśli jest)
  if (territory.preacher) {
    entries.push({
      preacher: territory.preacher,
      takenDate: territory.taken,
      passedBackDate: null, // brak opracowania
      isActive: true
    });
  }

  // 🔥 3. limit 4
  const result = entries.slice(0, limit);

  while (result.length < limit) {
    result.push(null as any);
  }

  console.log(result)

  return result;
};

export const formatDate = (date?: Date | string) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("pl-PL");
};

export const getLastWorkedDate = (t: ITerritory, serviceYear: number) => {
  const currentYear = t.history
    .filter(h => h.serviceYear === serviceYear && h.passedBackDate);

  if (currentYear.length > 0) {
    return formatDate(
      currentYear.sort(
        (a, b) =>
          new Date(b.passedBackDate).getTime() -
          new Date(a.passedBackDate).getTime()
      )[0].passedBackDate
    );
  }

  // 🔥 fallback na poprzedni rok
  const previousYear = t.history
    .filter(h => h.serviceYear < serviceYear && h.passedBackDate)
    .sort(
      (a, b) =>
        new Date(b.passedBackDate).getTime() -
        new Date(a.passedBackDate).getTime()
    );

  return previousYear.length
    ? formatDate(previousYear[0].passedBackDate)
    : "";
};