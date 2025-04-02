import { createContext, ReactNode, useContext, useState } from "react";

type SearchContextType = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  accommodationId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    accommodationId?: string
  ) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [destination, setDestination] = useState(
    () => sessionStorage.getItem("destination") || ""
  );
  const [checkIn, setCheckIn] = useState(
    () =>
      new Date(sessionStorage.getItem("checkIn") || new Date().toISOString())
  );
  const [checkOut, setCheckOut] = useState(
    () =>
      new Date(sessionStorage.getItem("checkOut") || new Date().toISOString())
  );
  const [adultCount, setAdultCount] = useState(() =>
    parseInt(sessionStorage.getItem("adultCount") || "1", 10)
  );
  const [childCount, setChildCount] = useState(() =>
    parseInt(sessionStorage.getItem("childCount") || "1", 10)
  );
  const [accommodationId, setAccommodationId] = useState(
    () => sessionStorage.getItem("accommodationId") || ""
  );

  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    accommodationId?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (accommodationId) setAccommodationId(accommodationId);

    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());
    if (accommodationId)
      sessionStorage.setItem("accommodationId", accommodationId);
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        accommodationId,
        saveSearchValues
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used within a SearchContextProvider");
  }

  return context;
};
