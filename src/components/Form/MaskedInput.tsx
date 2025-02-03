import { Box, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { FormLabel } from "../ui/form";
import { ClipboardEvent } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { cn } from "@/lib/utils";

type IMaskedInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  mask: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any, any>;
  error?: FieldError;
  onChange?: (value: string) => void;
};

export function MaskedInput({
  name,
  label,
  placeholder,
  mask,
  control,
  error,
  onChange,
}: IMaskedInputProps) {
  const hasError = !!error;

  return (
    <FormControl isInvalid={hasError} className="block w-full">
      <FormLabel
        className={cn(error && "text-destructive", "mb-2 block font-bold")}
        htmlFor={name}
      >
        {label}
      </FormLabel>

      {control ? (
        <Controller
          name={name}
          control={control}
          render={({
            field: { onBlur, onChange, name: fieldName, value, disabled },
          }) => (
            <PatternFormat
              id={name}
              name={fieldName}
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              )}
              value={value}
              disabled={disabled}
              customInput={Input}
              placeholder={placeholder}
              format={mask}
              onValueChange={(val: { value: string }) => onChange(val.value)}
              onBlur={onBlur}
              onPaste={(e: ClipboardEvent<HTMLInputElement>) => {
                e.preventDefault();

                const value = e.clipboardData
                  .getData("text/plain")
                  .replace(/[^0-9]/g, "");

                onChange(value);
              }}
            />
          )}
        />
      ) : (
        <PatternFormat
          id={name}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          )}
          customInput={Input}
          format={mask}
          onValueChange={(val) => {
            if (typeof onChange === "function") {
              onChange(val.value);
            }
          }}
          onPaste={(e: ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault();

            const value = e.clipboardData
              .getData("text/plain")
              .replace(/[^0-9]/g, "");

            if (typeof onChange === "function") {
              onChange(value);
            }
          }}
        />
      )}

      {hasError && (
        <Box minH="18px" mt="6px">
          <FormErrorMessage mt={0} className="text-destructive">
            {error.message}
          </FormErrorMessage>
        </Box>
      )}
    </FormControl>
  );
}
