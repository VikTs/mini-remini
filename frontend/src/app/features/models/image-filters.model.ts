export type ImageFilters = Record<string, number | string | boolean>;
export type InputType = "slider" | 'button' | 'toggle' | "checkbox";

export interface FilterConfig {
  id: string,
  name: string,
  type: InputType,
  tooltip?: string,
  minValue?: number,
  maxValue?: number,
  step?: number,
  values?: FilterValue[],
  valueBuilder?: (value: number) => string
}

export interface FilterGroupConfig {
  name: string,
  description: string,
  icon: string,
  filters: FilterConfig[]
}

export interface FilterValue {
  id: string,
  name: string,
  image?: string
}
