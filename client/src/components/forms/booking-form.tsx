import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useSearch } from "@/contexts/search-context";

import { BookingFormData, PaymentIntentResponse, User } from "@/types";

import { useCreateBooking } from "@/hooks/accommodations/use-create-booking";

import Button from "../button";
import Spinner from "../spinner";

import toast from "react-hot-toast";

interface BookingFormProps {
  currentUser: User;
  paymentIntent: PaymentIntentResponse;
}

const BookingForm = ({ currentUser, paymentIntent }: BookingFormProps) => {
  const { accommodationId } = useParams();
  const stripe = useStripe();
  const elements = useElements();

  const search = useSearch();

  const { mutate: createBooking, isPending } = useCreateBooking();

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      accommodationId: accommodationId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId
    }
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement
      }
    });

    if (result.error) {
      toast.error(`Payment failed: ${result.error.message}`);
      return;
    }

    if (result.paymentIntent?.status === "succeeded") {
      createBooking({
        ...formData,
        paymentIntentId: result.paymentIntent.id
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 rounded-lg border border-neutral-300 dark:border-neutral-600 p-6 shadow-lg bg-white dark:bg-neutral-800"
    >
      <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
        Confirm Your Details
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <label className="text-neutral-600 dark:text-neutral-300 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border border-neutral-300 dark:border-neutral-600 rounded w-full py-2 px-3 text-neutral-700 dark:text-neutral-400 bg-neutral-200 dark:bg-neutral-800 font-normal"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-neutral-600 dark:text-neutral-300 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border border-neutral-300 dark:border-neutral-600 rounded w-full py-2 px-3 text-neutral-700 dark:text-neutral-400 bg-neutral-200 dark:bg-neutral-800 font-normal"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-neutral-600 dark:text-neutral-300 text-sm font-bold flex-1 w-full">
          Email
          <input
            className="mt-1 border border-neutral-300 dark:border-neutral-600 rounded w-full py-2 px-3 text-neutral-700 dark:text-neutral-400 bg-neutral-200 dark:bg-neutral-800 font-normal"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Your Price Summary</h2>

        <div className="bg-indigo-50 dark:bg-indigo-900 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: £{paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold"> Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border border-neutral-300 dark:border-neutral-600 rounded-md p-2 text-sm"
          options={{
            hidePostalCode: true
          }}
        />
      </div>

      <div className="flex justify-end">
        <Button variant="primary" size="sm" disabled={isPending} type="submit">
          {isPending ? <Spinner /> : "Confirm"}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
