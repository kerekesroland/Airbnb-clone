"use client";

import React, { useReducer } from "react";
import PropertyDetailsHeader from "../PropertyDetailsHeader/PropertyDetailsHeader";
import { Flex } from "@chakra-ui/react";
import IncrementController from "../IncrementController/IncrementController";

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

const initialState: State = {
  guests: 1,
  rooms: 1,
  bathrooms: 1,
};

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

const PropertyDetails = () => {
  const [propertyStates, dispatch] = useReducer(reducer, initialState);

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
          value={propertyStates.guests}
          onIncrement={() => dispatch({ type: "INCREMENT_GUESTS" })}
          onDecrement={() => dispatch({ type: "DECREMENT_GUESTS" })}
        />
        <IncrementController
          title="Rooms"
          subTitle="How many rooms does the property have?"
          value={propertyStates.rooms}
          onIncrement={() => dispatch({ type: "INCREMENT_ROOMS" })}
          onDecrement={() => dispatch({ type: "DECREMENT_ROOMS" })}
        />
        <IncrementController
          title="Bathrooms"
          subTitle="How many bathrooms does the property have?"
          value={propertyStates.bathrooms}
          onIncrement={() => dispatch({ type: "INCREMENT_BATHROOMS" })}
          onDecrement={() => dispatch({ type: "DECREMENT_BATHROOMS" })}
        />
      </Flex>
    </>
  );
};

export default PropertyDetails;
