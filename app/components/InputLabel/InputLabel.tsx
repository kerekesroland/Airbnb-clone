import { FormLabel, useMultiStyleConfig } from "@chakra-ui/react";

export const AnimatedInputLabel = ({
  isFocused,
  children,
  value,
  ...props
}: any) => {
  const styles = useMultiStyleConfig("FormLabel", {});
  const shouldShrink = isFocused || value;

  return (
    <FormLabel
      {...props}
      sx={{
        ...styles,
        position: "absolute",
        left: shouldShrink ? "12px" : "14px",
        top: shouldShrink ? "10px" : "50%",
        fontSize: shouldShrink ? "10px" : "14px",
        backgroundColor: "transparent",
        color: shouldShrink ? "#b2bdcc" : "#b2bdcc",
        fontWeight: shouldShrink ? "light" : "semibold",
        zIndex: 1,
        px: "4px",
        transform: shouldShrink ? "translateY(-50%)" : "translateY(-50%)",
        transition: "all 0.3s",
      }}
    >
      {children}
    </FormLabel>
  );
};
