import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";

import { useGetAccommodationById } from "@/hooks/accommodations/use-get-accommodation-by-id";

import { useSearch } from "@/contexts/search-context";
import { useAuth } from "@/contexts/auth-context";

import BookingDetailsSummary from "@/components/bookings/booking-details-summary";
import BookingForm from "@/components/forms/booking-form";

import { stripePromise } from "@/lib/stripe";
import { useCreatePaymentIntent } from "@/hooks/accommodations/use-create-payment-intent";

const Bookings = () => {
  const search = useSearch();
  const { currentUser } = useAuth();

  const { accommodationId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: accommodation } = useGetAccommodationById(accommodationId!);
  const { mutateAsync: createPaymentIntent, data: paymentIntentData } =
    useCreatePaymentIntent();

  useEffect(() => {
    if (accommodationId && numberOfNights > 0) {
      createPaymentIntent({
        accommodationId,
        numberOfNights: numberOfNights.toString()
      });
    }
  }, [accommodationId, numberOfNights, createPaymentIntent]);

  if (!accommodation) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-2">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        accommodation={accommodation}
      />

      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Bookings;
