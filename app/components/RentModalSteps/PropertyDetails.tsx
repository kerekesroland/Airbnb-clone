"use client";

import React, { useEffect, useReducer } from "react";
import PropertyDetailsHeader from "../PropertyDetailsHeader/PropertyDetailsHeader";
import { Flex } from "@chakra-ui/react";
import IncrementController from "../IncrementController/IncrementController";
import { IRentInputProps } from "@/inferfaces/IRentInputProps";
import { UseFormSetValue } from "react-hook-form";

interface State {
  guests: number;
  rooms: number;
  bathrooms: number;
}

type Action =
  | { type: "INCREMENT_GUESTS" }
  | { type: "DECREMENT_GUESTS" }
  | { type: "INCREMENT_ROOMS" }
  | { type: "DECREMENT_ROOMS" }
  | { type: "INCREMENT_BATHROOMS" }
  | { type: "DECREMENT_BATHROOMS" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INCREMENT_GUESTS":
      return {
        ...state,
        guests: state.guests + 1 > 10 ? 10 : state.guests + 1,
      };
    case "DECREMENT_GUESTS":
      return {
        ...state,
        guests: state.guests - 1 < 1 ? 1 : state.guests - 1,
      };
    case "INCREMENT_ROOMS":
      return {
        ...state,
        rooms: state.rooms + 1 > 10 ? 10 : state.rooms + 1,
      };
    case "DECREMENT_ROOMS":
      return {
        ...state,
        rooms: state.rooms - 1 < 1 ? 1 : state.rooms - 1,
      };
    case "INCREMENT_BATHROOMS":
      return {
        ...state,
        bathrooms: state.bathrooms + 1 > 10 ? 10 : state.bathrooms + 1,
      };
    case "DECREMENT_BATHROOMS":
      return {
        ...state,
        bathrooms: state.bathrooms - 1 < 1 ? 1 : state.bathrooms - 1,
      };
    default:
      return state;
  }
};

interface IProps {
  setValue: UseFormSetValue<IRentInputProps>;
  propertyRooms: number;
  propertyGuests: number;
  propertyBathrooms: number;
}

const PropertyDetails = ({
  setValue,
  propertyRooms,
  propertyGuests,
  propertyBathrooms,
}: IProps) => {
  const initialState: State = {
    guests: propertyGuests,
    rooms: propertyRooms,
    bathrooms: propertyBathrooms,
  };
  const [propertyStates, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setValue("propertyDetails.guests", propertyStates.guests);
    setValue("propertyDetails.rooms", propertyStates.rooms);
    setValue("propertyDetails.bathrooms", propertyStates.bathrooms);
  }, [
    propertyStates.guests,
    propertyStates.rooms,
    propertyStates.bathrooms,
    setValue,
  ]);

  const handleSetGuests = (value: number) => {
    setValue("propertyDetails.guests", value);
  };
  const handleSetRooms = (value: number) => {
    setValue("propertyDetails.rooms", value);
  };
  const handleSetBathrooms = (value: number) => {
    setValue("propertyDetails.bathrooms", value);
  };

  return (
    <>
      <PropertyDetailsHeader
        title="More info about your place"
        subTitle="What amenities do you have?"
      />
      <Flex mt="40px" flexDirection="column" gap="2rem">
        <IncrementController
          title="Guests"
          subTitle="How many guests can you host?"
          value={propertyGuests}
          onIncrement={() => {
            dispatch({ type: "INCREMENT_GUESTS" });
            handleSetGuests(propertyStates.guests);
          }}
          onDecrement={() => {
            dispatch({ type: "DECREMENT_GUESTS" });
            handleSetGuests(propertyStates.guests);
          }}
        />
        <IncrementController
          title="Rooms"
          subTitle="How many rooms does the property have?"
          value={propertyRooms}
          onIncrement={() => {
            dispatch({ type: "INCREMENT_ROOMS" });
            handleSetRooms(propertyStates.rooms);
          }}
          onDecrement={() => {
            dispatch({ type: "DECREMENT_ROOMS" });
            handleSetRooms(propertyStates.rooms);
          }}
        />
        <IncrementController
          title="Bathrooms"
          subTitle="How many bathrooms does the property have?"
          value={propertyBathrooms}
          onIncrement={() => {
            dispatch({ type: "INCREMENT_BATHROOMS" });
            handleSetBathrooms(propertyStates.bathrooms);
          }}
          onDecrement={() => {
            dispatch({ type: "DECREMENT_BATHROOMS" });
            handleSetBathrooms(propertyStates.bathrooms);
          }}
        />
      </Flex>
    </>
  );
};

export default PropertyDetails;
