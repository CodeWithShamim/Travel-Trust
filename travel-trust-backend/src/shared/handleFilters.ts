/* eslint-disable @typescript-eslint/no-explicit-any */
const handleFilters = (filters: any, searchFields: string[]) => {
  const { searchTerm, ...filtersData } = filters;
  const andConditons = [];

  // search
  if (searchTerm) {
    andConditons.push({
      OR: searchFields.map((field: string) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  delete filtersData.minPrice;
  delete filtersData.maxPrice;

  // filters
  if (Object.keys(filtersData).length > 0) {
    andConditons.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions = andConditons.length > 0 ? { AND: andConditons } : {};

  return whereConditions;
};

export default handleFilters;
