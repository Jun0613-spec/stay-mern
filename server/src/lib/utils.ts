export const constructSearchQuery = (queryParams: any) => {
  let query: any = {};

  if (queryParams.destination) {
    query.OR = [
      { city: { contains: queryParams.destination, mode: "insensitive" } },
      { country: { contains: queryParams.destination, mode: "insensitive" } }
    ];
  }

  if (queryParams.adultCount) {
    query.adultCount = { gte: Number(queryParams.adultCount) };
  }

  if (queryParams.childCount) {
    query.childCount = { gte: Number(queryParams.childCount) };
  }

  if (queryParams.maxPrice) {
    query.pricePerNight = { lte: Number(queryParams.maxPrice) };
  }

  if (queryParams.types && Array.isArray(queryParams.types)) {
    query.type = { in: queryParams.types };
  }

  if (queryParams.facilities && Array.isArray(queryParams.facilities)) {
    query.facilities = { hasSome: queryParams.facilities };
  }

  return query;
};
