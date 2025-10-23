export type ImageFilters = Record<string, number | string>;
export type InputType = "radio" | "slider";

export interface FilterConfig<T = number | string> {
  id: string,
  name: string,
  type: InputType,
  minValue?: number,
  maxValue?: number,
  step?: number,
  values?: string[],
  valueBuilder: (value: T) => string
}

export interface FilterGroupConfig {
  name: string,
  description: string,
  icon: string,
  filters: (FilterConfig<number> | FilterConfig<string>)[]
}
