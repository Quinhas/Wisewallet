import { Select } from "@chakra-ui/select";
import { FaFilter } from "react-icons/fa";

type FilterProps = {
  options: {
    value: string | number;
    label: string | number;
  }[];
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void | undefined;
  defaultValue?: string | number;
};

export function Filter(props: FilterProps) {
  return (
    <>
      <Select
        w={"25%"}
        icon={<FaFilter />}
        variant="filled"
        isFullWidth={false}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
      >
        {props.options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </Select>
    </>
  );
}