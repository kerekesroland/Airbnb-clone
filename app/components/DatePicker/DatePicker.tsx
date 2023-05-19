"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface IProps {
  range: Range;
  onChange: (value: RangeKeyDict) => void;
  invalidDates: Array<Date>;
}

const DatePicker = ({ range, onChange, invalidDates }: IProps) => {
  const today = new Date();
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[range]}
      date={today}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={today}
      disabledDates={invalidDates}
    />
  );
};

export default DatePicker;
