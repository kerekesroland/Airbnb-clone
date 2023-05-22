import { Listing, Reservation, User } from "@prisma/client";

export type IUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type IListing = Omit<Listing, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type IReservation = Omit<
  Reservation,
  "createdAt" | "updatedAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
  listing: IListing;
};
