import { ICountryValue } from "./ICountryValue";

interface IPropertyDetails {
  guests: number;
  rooms: number;
  bathrooms: number;
}
export interface IRentInputProps {
  propertyType: string;
  propertyDetails: IPropertyDetails;
  propertyImage: string;
  country: ICountryValue;
  propertyTitle: string;
  propertyDescription: string;
  propertyPrice: number;
}
