"use client";

import useFilterModal from "@/hooks/useFilterModal";
import PopupModal from "./PopupModal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useReducer, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import queryString from "query-string";
import { formatISO } from "date-fns";
import CountrySelector from "../RentModalSteps/CountrySelector";
import { Box } from "@chakra-ui/react";
import DatePicker from "../DatePicker/DatePicker";
import GeneralHeader from "../GeneralHeader/GeneralHeader";
import IncrementController from "../IncrementController/IncrementController";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

interface ICountrySelect {
  value: string;
  label: string;
  flag: string;
  latlong: Array<number>;
  region: string;
}

const FilterModal = () => {
  const { isOpen, onClose } = useFilterModal();
  const router = useRouter();
  const params = useSearchParams();
  const [location, setLocation] = useState<ICountrySelect>();
  const [step, setStep] = useState<number>(STEPS.LOCATION);
  const [rooms, setRooms] = useState<number>(1);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [guests, setGuests] = useState<number>(1);
  const [rangeOfDate, setRangeOfDate] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Location = useMemo(
    () =>
      dynamic(() => import("../Location/Location"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

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

  const initialStates = {
    guests,
    bathrooms,
    rooms,
  };

  const [propertyStates, dispatch] = useReducer(reducer, initialStates);

  const handlePrevStep = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const handleNextStep = useCallback(() => {
    setStep((next) => next + 1);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return handleNextStep();
    }
    let query = {};

    if (params) {
      queryString.parse(query.toString());
    }

    const newQuery: Record<string, any> = {
      ...query,
      locationValue: location?.region
        ?.concat(", ")
        .concat(location?.label as string),
      numberOfRooms: propertyStates.rooms,
      numberOfBathrooms: propertyStates.bathrooms,
      numberOfGuests: propertyStates.guests,
    };

    if (rangeOfDate.startDate) {
      newQuery.startDate = formatISO(rangeOfDate.startDate);
    }

    if (rangeOfDate.endDate) {
      newQuery.endDate = formatISO(rangeOfDate.endDate);
    }

    const modifiedUrl = queryString.stringifyUrl(
      {
        url: "/",
        query: newQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    onClose();
    router.push(modifiedUrl);
  }, [
    step,
    params,
    location?.region,
    location?.label,
    propertyStates.rooms,
    propertyStates.bathrooms,
    propertyStates.guests,
    rangeOfDate.startDate,
    rangeOfDate.endDate,
    onClose,
    router,
    handleNextStep,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const renderContent = () => {
    switch (step) {
      case STEPS.LOCATION:
        return (
          <>
            <CountrySelector
              value={location}
              headerTitle="Where would you like to go?"
              headerSubtitle="Choose a country!"
              onChange={(location) => setLocation(location as ICountrySelect)}
            />
            <Location center={location?.latlong?.map((l) => Number(l))} />
          </>
        );
      case STEPS.DATE:
        return (
          <>
            <GeneralHeader
              title="When do you plan on going?"
              subTitle="Choose a date!"
            />
            <DatePicker
              range={rangeOfDate}
              onChange={(date) => setRangeOfDate(date.selection)}
              invalidDates={[]}
            />
          </>
        );

      case STEPS.INFO:
        return (
          <>
            <GeneralHeader
              title="More information"
              subTitle="Choose some filters"
            />
            <br />

            <IncrementController
              title={"Guests"}
              subTitle={"How many people are going?"}
              value={propertyStates.guests}
              onIncrement={() => dispatch({ type: "INCREMENT_GUESTS" })}
              onDecrement={() => dispatch({ type: "DECREMENT_GUESTS" })}
            />
            <br />
            <IncrementController
              title={"Rooms"}
              subTitle={"How many rooms would you like to have?"}
              value={propertyStates.rooms}
              onIncrement={() => dispatch({ type: "INCREMENT_ROOMS" })}
              onDecrement={() => dispatch({ type: "DECREMENT_ROOMS" })}
            />
            <br />

            <IncrementController
              title={"Bathrooms"}
              subTitle={"How many bathrooms would you like to have?"}
              value={propertyStates.bathrooms}
              onIncrement={() => dispatch({ type: "INCREMENT_BATHROOMS" })}
              onDecrement={() => dispatch({ type: "DECREMENT_BATHROOMS" })}
            />
          </>
        );

      default:
        break;
    }
  };

  return (
    <PopupModal
      footer={<Box paddingBottom="40px" />}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Filters"
      body={renderContent()}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : handlePrevStep}
      secondaryActionLabel={secondaryActionLabel}
    />
  );
};

export default FilterModal;
