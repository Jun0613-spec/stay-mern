import { FaSwimmingPool } from "react-icons/fa";
import {
  FaWifi,
  FaUmbrellaBeach,
  FaBicycle,
  FaSquareParking,
  FaKitchenSet,
  FaMountainCity
} from "react-icons/fa6";
import {
  MdOutlineBalcony,
  MdOutlineKitchen,
  MdOutlineYard,
  MdSmokeFree,
  MdOutlineOutdoorGrill,
  MdOutlineToys,
  MdTv,
  MdFitnessCenter,
  MdOutlineVilla,
  MdOutlineHouse,
  MdOutlineApartment,
  MdOutlineCottage,
  MdOutlineCabin,
  MdOutlineBungalow,
  MdOutlineDirectionsBoat,
  MdOutlineCastle,
  MdOutlineFireplace,
  MdSpa,
  MdOutlineBeachAccess,
  MdOutlinePets,
  MdOutlineElevator,
  MdWineBar,
  MdOutlineRestaurantMenu,
  MdOutlineFreeBreakfast,
  MdOutlineLuggage,
  MdOutlineAirportShuttle,
  MdOutlineHotTub,
  MdOutlineBathtub,
  MdOutlineElectricalServices,
  MdOutlineTheaterComedy,
  MdOutlineSportsTennis
} from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import {
  TbAirConditioning,
  TbBeach,
  TbBuildings,
  TbKayak
} from "react-icons/tb";
import {
  PiHairDryer,
  PiPersonSimpleSki,
  PiSecurityCamera
} from "react-icons/pi";
import { LuWashingMachine } from "react-icons/lu";
import { GiKnifeFork } from "react-icons/gi";

export const accommodationTypes = [
  { label: "Apartment", icon: MdOutlineApartment },
  { label: "Beachfront", icon: FaUmbrellaBeach },
  { label: "Boat", icon: MdOutlineDirectionsBoat },
  { label: "Bungalow", icon: MdOutlineBungalow },
  { label: "Cabin", icon: MdOutlineCabin },
  { label: "Cottage", icon: MdOutlineCottage },
  { label: "Flat", icon: TbBuildings },
  { label: "House", icon: MdOutlineHouse },
  { label: "Mansion", icon: MdOutlineCastle },
  { label: "Resort", icon: RiHotelLine },
  { label: "Ski Resort", icon: FaMountainCity },
  { label: "Villa", icon: MdOutlineVilla }
];

export const accommodationFacilities = [
  { label: "24/7 Security", icon: PiSecurityCamera },
  { label: "Air Conditioning", icon: TbAirConditioning },
  { label: "Balcony", icon: MdOutlineBalcony },
  { label: "Bar", icon: MdWineBar },
  { label: "Bath Tub", icon: MdOutlineBathtub },
  { label: "BBQ Area", icon: MdOutlineOutdoorGrill },
  { label: "Beach Access", icon: MdOutlineBeachAccess },
  { label: "Bicycle Rental", icon: FaBicycle },
  { label: "Breakfast", icon: GiKnifeFork },
  { label: "EV Charging", icon: MdOutlineElectricalServices },
  { label: "Free Breakfast", icon: MdOutlineFreeBreakfast },
  { label: "Free WiFi", icon: FaWifi },
  { label: "Fridge", icon: MdOutlineKitchen },
  { label: "Garden", icon: MdOutlineYard },
  { label: "Gym", icon: MdFitnessCenter },
  { label: "Hair Dryer", icon: PiHairDryer },
  { label: "Indoor Fireplace", icon: MdOutlineFireplace },
  { label: "Jacuzzi", icon: MdOutlineHotTub },
  { label: "Kayak Rental", icon: TbKayak },
  { label: "Kitchen", icon: FaKitchenSet },
  { label: "Lift", icon: MdOutlineElevator },
  { label: "Luggage Storage", icon: MdOutlineLuggage },
  { label: "Non-Smoking", icon: MdSmokeFree },
  { label: "Parking", icon: FaSquareParking },
  { label: "Pet-Friendly", icon: MdOutlinePets },
  { label: "Playground", icon: MdOutlineToys },
  { label: "Private Beach", icon: TbBeach },
  { label: "Restaurant", icon: MdOutlineRestaurantMenu },
  { label: "Shuttle Service", icon: MdOutlineAirportShuttle },
  { label: "Ski Access", icon: PiPersonSimpleSki },
  { label: "Spa", icon: MdSpa },
  { label: "Swimming Pool", icon: FaSwimmingPool },
  { label: "Tennis Court", icon: MdOutlineSportsTennis },
  { label: "Theatre", icon: MdOutlineTheaterComedy },
  { label: "TV", icon: MdTv },
  { label: "Washing Machine", icon: LuWashingMachine }
];

export const features = [
  {
    title: "Damage payments",
    description: "Our damage programme covers your property in case of damages."
  },
  {
    title: "Guaranteed Payments",
    description:
      "Receive secure and timely payouts for every booking with our trusted payment system."
  },
  {
    title: "Your own house rules",
    description:
      "Set your own policies and requirements for guests before they book your property."
  },
  {
    title: "Seamless Earnings & Security",
    description:
      "Get automated payouts with fraud protection, ensuring your earnings are always safe."
  },
  {
    title: "Verified Guest Profiles",
    description:
      "We authenticate guest identities to ensure safer and more reliable stays."
  },
  {
    title: "24/7 Host Support",
    description:
      "Access dedicated support at any time to assist with bookings, guests, and troubleshooting."
  }
];
