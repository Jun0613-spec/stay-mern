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

export const dummyAccommodations = [
  {
    id: "1",
    userId: "user1",
    name: "Luxury Beachfront Villa",
    city: "Miami",
    country: "USA",
    description:
      "Stunning 3-bedroom villa with private pool and direct beach access. Perfect for family vacations with breathtaking ocean views.",
    type: "Villa",
    adultCount: 6,
    childCount: 2,
    facilities: [
      "Swimming Pool",
      "WiFi",
      "Air Conditioning",
      "Beach Access",
      "Kitchen"
    ],
    pricePerNight: 350,
    imageUrls: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    lastUpdated: "2025-03-31T12:00:00Z"
  },
  {
    id: "2",
    userId: "user2",
    name: "Downtown Modern Loft",
    city: "New York",
    country: "USA",
    description:
      "Chic urban loft in the heart of the city with floor-to-ceiling windows and rooftop terrace.",
    type: "Apartment",
    adultCount: 4,
    childCount: 0,
    facilities: ["WiFi", "Gym", "Parking", "Workspace"],
    pricePerNight: 120,
    imageUrls: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    lastUpdated: "2025-03-30T12:00:00Z"
  },
  {
    id: "3",
    userId: "user3",
    name: "Mountain View Cabin",
    city: "Aspen",
    country: "USA",
    description:
      "Cozy wooden cabin with fireplace and panoramic mountain views. Ideal for nature lovers.",
    type: "Cabin",
    adultCount: 4,
    childCount: 2,
    facilities: ["Fireplace", "Hot Tub", "Hiking Trails", "Kitchen"],
    pricePerNight: 180,
    imageUrls: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    lastUpdated: "2025-03-29T12:00:00Z"
  },
  {
    id: "4",
    userId: "user4",
    name: "Historic City Center Studio",
    city: "Berlin",
    country: "Germany",
    description:
      "Charming studio in a historic building with modern amenities and easy access to all attractions.",
    type: "Studio",
    adultCount: 2,
    childCount: 1,
    facilities: ["WiFi", "Washer", "Central Location", "Elevator"],
    pricePerNight: 90,
    imageUrls: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    lastUpdated: "2025-03-28T12:00:00Z"
  },
  {
    id: "5",
    userId: "user5",
    name: "Lakeside Cottage Retreat",
    city: "Lake Tahoe",
    country: "USA",
    description:
      "Peaceful cottage on the lake with private dock and canoe. Perfect for fishing and relaxation.",
    type: "Cottage",
    adultCount: 4,
    childCount: 2,
    facilities: ["Lake Access", "Canoe", "Fire Pit", "BBQ Grill"],
    pricePerNight: 150,
    imageUrls: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    lastUpdated: "2025-03-27T12:00:00Z"
  },
  {
    id: "6",
    userId: "user6",
    name: "Penthouse with City Views",
    city: "Los Angeles",
    country: "USA",
    description:
      "Luxurious penthouse with 360-degree city views, private terrace and high-end finishes.",
    type: "Penthouse",
    adultCount: 2,
    childCount: 0,
    facilities: ["Terrace", "Concierge", "Gym", "Parking", "Hot Tub"],
    pricePerNight: 450,
    imageUrls: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    lastUpdated: "2025-03-26T12:00:00Z"
  },
  {
    id: "7",
    userId: "user7",
    name: "Rustic Farmhouse Stay",
    city: "Napa Valley",
    country: "USA",
    description:
      "Authentic farmhouse experience with organic breakfast included and farm animals on site.",
    type: "Farmhouse",
    adultCount: 6,
    childCount: 3,
    facilities: ["Breakfast", "Garden", "Animals", "Countryside"],
    pricePerNight: 110,
    imageUrls: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    lastUpdated: "2025-03-25T12:00:00Z"
  },
  {
    id: "8",
    userId: "user8",
    name: "Ski-in/Ski-out Chalet",
    city: "Whistler",
    country: "Canada",
    description:
      "Direct access to ski slopes with cozy fireplace and mountain views. Includes ski storage.",
    type: "Chalet",
    adultCount: 6,
    childCount: 2,
    facilities: ["Ski Access", "Fireplace", "Hot Tub", "Mountain View"],
    pricePerNight: 280,
    imageUrls: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    lastUpdated: "2025-03-24T12:00:00Z"
  },
  {
    id: "9",
    userId: "user9",
    name: "Minimalist Designer Apartment",
    city: "San Francisco",
    country: "USA",
    description:
      "Sleek, modern apartment with designer furniture and smart home features in trendy neighborhood.",
    type: "Apartment",
    adultCount: 2,
    childCount: 1,
    facilities: ["Smart Home", "Workspace", "Gym", "Balcony"],
    pricePerNight: 160,
    imageUrls: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    lastUpdated: "2025-03-23T12:00:00Z"
  },
  {
    id: "10",
    userId: "user10",
    name: "Romantic Treehouse Escape",
    city: "Vancouver",
    country: "Canada",
    description:
      "Unique elevated treehouse with panoramic forest views, perfect for a romantic getaway.",
    type: "Treehouse",
    adultCount: 2,
    childCount: 0,
    facilities: ["Nature Views", "Private Deck", "Hammock", "BBQ"],
    pricePerNight: 210,
    imageUrls: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    lastUpdated: "2025-03-22T12:00:00Z"
  },
  {
    id: "11",
    userId: "user11",
    name: "Luxury Desert Glamping",
    city: "Dubai",
    country: "UAE",
    description:
      "Experience the desert in style with this luxury glamping tent.",
    type: "Glamping",
    adultCount: 2,
    childCount: 1,
    facilities: ["Air Conditioning", "Desert Tours", "Private Chef"],
    pricePerNight: 300,
    imageUrls: [
      "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?q=80&w=1567&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    lastUpdated: "2025-03-21T12:00:00Z"
  },
  {
    id: "12",
    userId: "user12",
    name: "Seaside Cliff House",
    city: "Santorini",
    country: "Greece",
    description: "Breathtaking cliffside house with stunning ocean views.",
    type: "Villa",
    adultCount: 4,
    childCount: 1,
    facilities: ["Infinity Pool", "WiFi", "Private Balcony"],
    pricePerNight: 500,
    imageUrls: [
      "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?q=80&w=1567&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    lastUpdated: "2025-03-20T12:00:00Z"
  },
  {
    id: "13",
    userId: "user13",
    name: "Forest Hideaway Cabin",
    city: "Vancouver",
    country: "Canada",
    description: "Cozy and private cabin in the heart of the forest.",
    type: "Cabin",
    adultCount: 3,
    childCount: 2,
    facilities: ["Fireplace", "Hiking Trails", "Wood Stove"],
    pricePerNight: 130,
    imageUrls: [
      "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?q=80&w=1567&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    lastUpdated: "2025-03-19T12:00:00Z"
  },
  {
    id: "14",
    userId: "user14",
    name: "Skyline View Apartment",
    city: "Tokyo",
    country: "Japan",
    description:
      "Modern high-rise apartment with breathtaking city skyline views.",
    type: "Apartment",
    adultCount: 2,
    childCount: 0,
    facilities: ["Smart TV", "WiFi", "Rooftop Lounge"],
    pricePerNight: 220,
    imageUrls: [
      "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?q=80&w=1567&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    lastUpdated: "2025-03-18T12:00:00Z"
  },
  {
    id: "15",
    userId: "user15",
    name: "Traditional Ryokan Experience",
    city: "Kyoto",
    country: "Japan",
    description: "Authentic Japanese ryokan with tatami mats and onsen access.",
    type: "Ryokan",
    adultCount: 2,
    childCount: 0,
    facilities: ["Hot Spring", "Tatami Rooms", "Tea Ceremony"],
    pricePerNight: 250,
    imageUrls: [
      "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?q=80&w=1567&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    lastUpdated: "2025-03-17T12:00:00Z"
  }
];
