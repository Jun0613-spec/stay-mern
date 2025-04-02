import { useState, useEffect } from "react";
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";

import { useSearch } from "@/contexts/search-context";

import { useSearchAccommodations } from "@/hooks/accommodations/use-search-accommodations";

import PriceFilter from "@/components/search/price-filter";
import AccommodationTypesFilter from "@/components/search/accommodation-types-filter";
import FacilitiesFilter from "@/components/search/facilities-filter";
import Pagination from "@/components/pagination";
import SearchResultCard from "@/components/search/search-result-card";

const Search = () => {
  const search = useSearch();
  const [page, setPage] = useState<number>(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedAccommodationTypes, setSelectedAccommodationTypes] = useState<
    string[]
  >([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [
    selectedAccommodationTypes,
    selectedFacilities,
    selectedPrice,
    sortOption
  ]);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    types: selectedAccommodationTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption
  };

  const { data: accommodationData } = useSearchAccommodations(searchParams);

  const handleAccommodationTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const accommodationType = event.target.value;
    setSelectedAccommodationTypes((prev) =>
      event.target.checked
        ? [...prev, accommodationType]
        : prev.filter((a) => a !== accommodationType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;
    setSelectedFacilities((prev) =>
      event.target.checked
        ? [...prev, facility]
        : prev.filter((f) => f !== facility)
    );
  };

  const clearAllFilters = () => {
    setSelectedAccommodationTypes([]);
    setSelectedFacilities([]);
    setSelectedPrice(undefined);
    setSortOption("");
  };

  const activeFilterCount = [
    selectedAccommodationTypes.length,
    selectedFacilities.length,
    selectedPrice ? 1 : 0,
    sortOption ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="relative">
      {/* Mobile filter button */}
      <div className="lg:hidden sticky top-0 z-10 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 p-3">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center justify-between w-full px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <FiFilter />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </div>
          <FiChevronDown />
        </button>
      </div>

      {/* Mobile filter overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden l">
          <div className="absolute left-0 top-0 h-full w-4/5 max-w-2xl bg-white dark:bg-neutral-900 shadow-lg overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="cursor-pointer hover:opacity-70"
                >
                  <FiX className="w-5 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <AccommodationTypesFilter
                  selectedAccommodationTypes={selectedAccommodationTypes}
                  onChange={handleAccommodationTypeChange}
                />
                <FacilitiesFilter
                  selectedFacilities={selectedFacilities}
                  onChange={handleFacilityChange}
                />
                <PriceFilter
                  selectedPrice={selectedPrice}
                  onChange={(value?: number) => setSelectedPrice(value)}
                />
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md text-sm font-medium"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium flex-1"
                >
                  Show results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 lg:gap-6">
          {/* Desktop filters */}
          <div className="hidden lg:block rounded-lg border border-neutral-200 dark:border-neutral-700 p-5 h-fit sticky top-6">
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold">Filters</h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <AccommodationTypesFilter
                selectedAccommodationTypes={selectedAccommodationTypes}
                onChange={handleAccommodationTypeChange}
              />
              <FacilitiesFilter
                selectedFacilities={selectedFacilities}
                onChange={handleFacilityChange}
              />
              <PriceFilter
                selectedPrice={selectedPrice}
                onChange={(value?: number) => setSelectedPrice(value)}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h1 className="text-xl sm:text-2xl font-bold">
                {accommodationData?.pagination.total} Accommodations found{" "}
                {search.destination && (
                  <span className="text-indigo-600 dark:text-indigo-400">
                    in {search.destination}
                  </span>
                )}
              </h1>

              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full sm:w-48 p-2 pl-3 pr-8 border border-neutral-200 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 appearance-none"
                >
                  <option value="">Sort By</option>
                  <option value="pricePerNightAsc">Price (Low to High)</option>
                  <option value="pricePerNightDesc">Price (High to Low)</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* Active filters (mobile) */}
            {activeFilterCount > 0 && (
              <div className="lg:hidden bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {activeFilterCount} active filter
                    {activeFilterCount !== 1 ? "s" : ""}
                  </span>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}

            {/* Results grid */}
            {accommodationData && accommodationData.pagination.total === 0 ? (
              <div className="text-center py-6">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                  No accommodations found for your search.
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Try adjusting your search criteria or clear all filters to
                  view results.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4">
                  {accommodationData?.data.map((accommodation) => (
                    <SearchResultCard
                      key={accommodation.id}
                      accommodation={accommodation}
                    />
                  ))}
                </div>
                {/* Pagination */}
                {accommodationData?.pagination.pages &&
                  accommodationData.pagination.pages > 1 && (
                    <div className="flex justify-center mt-4">
                      <Pagination
                        page={accommodationData.pagination.page}
                        pages={accommodationData.pagination.pages}
                        onPageChange={(page) => {
                          setPage(page);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        maxVisiblePages={5}
                      />
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
