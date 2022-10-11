export interface Option {
  value: string | number;
  label: string;
}

export type SelectProps = {
  options: Option[];
} & (SingleSelectProps | MultipleSelectProps);

export type SingleSelectProps = {
  multiple?: false;
  value?: Option;
  onChange: (value: Option | undefined) => void;
};
export type MultipleSelectProps = {
  multiple: true;
  value: Option[];
  onChange: (value: Option[]) => void;
};
