import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";

import { useSearch } from "@/contexts/search-context";

import DateRangePicker from "../search/date-range-picker";
import GuestSelector from "../search/guest-selector";
import DirectionSection from "../search/direction-section";

import Button from "../button";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearch();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<string>(
    search.checkIn.toISOString().split("T")[0]
  );
  const [checkOut, setCheckOut] = useState<string>(
    search.checkOut.toISOString().split("T")[0]
  );
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      new Date(checkIn),
      new Date(checkOut),
      adultCount,
      childCount
    );

    navigate("/search");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-8xl mt-8">
      <div className="flex flex-col md:flex-row gap-2 bg-white dark:bg-neutral-800 rounded-md shadow-sm p-4 border border-neutral-100 dark:border-neutral-700">
        <DirectionSection
          destination={destination}
          setDestination={setDestination}
          focusedField={focusedField}
          setFocusedField={setFocusedField}
        />

        <DateRangePicker
          checkIn={checkIn}
          checkOut={checkOut}
          onCheckInChange={setCheckIn}
          onCheckOutChange={setCheckOut}
        />

        <GuestSelector
          adultCount={adultCount}
          childCount={childCount}
          onAdultCountChange={setAdultCount}
          onChildCountChange={setChildCount}
        />

        <div className="w-full md:w-auto">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="py-3 gap-2 w-full"
          >
            <LuSearch />
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
