export interface IListing {
  id: string;
  userId: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  numberOfRooms: number;
  numberOfBathrooms: number;
  numberOfGuests: number;
  locationValue: string;
  createdAt: string;
  updatedAt: string;
  coordinates: Array<string>;
}
