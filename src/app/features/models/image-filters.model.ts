export type ImageFilters = Record<string, number>;

export interface FilterConfig {
  id: string,
  name: string,
  minValue: number,
  maxValue: number,
  valueBuilder: (value: number) => string
}

export interface FilterGroupConfig {
  name: string,
  description: string,
  icon: string,
  filters: FilterConfig[]
}

export const defaultFilters: ImageFilters = {
  brightness: 1,
  saturate: 1,
  contrast: 1,
  grayscale: 0,
  sepia: 0,
}

// ToDo: replace with AI filters after AI integration
export const filtersConfig: FilterGroupConfig[] = [
  {
    name: "filtersPanel.groups.color.name",
    description: "filtersPanel.groups.color.description",
    icon: "palette",
    filters: [
      {
        id: "grayscale",
        minValue: 0,
        maxValue: 1,
        name: "filtersPanel.filters.grayscale",
        valueBuilder: (value: number) => `${(value * 100).toFixed(0)}%`
      },
      {
        id: "sepia",
        minValue: 0,
        maxValue: 1,
        name: "filtersPanel.filters.sepia",
        valueBuilder: (value: number) => `${(value * 100).toFixed(0)}%`
      },
      {
        id: "saturate",
        minValue: 0,
        maxValue: 2,
        name: "filtersPanel.filters.saturate",
        valueBuilder: (value: number) => `${(value * 100 - 100).toFixed(0)}%`
      }
    ]
  },
  {
    name: "filtersPanel.groups.lighting.name",
    description: "filtersPanel.groups.lighting.description",
    icon: "exposure",
    filters: [
      {
        id: "brightness",
        minValue: 0,
        maxValue: 2,
        name: "filtersPanel.filters.brightness",
        valueBuilder: (value: number) => `${(value * 100 - 100).toFixed(0)}%`
      },
      {
        id: "contrast",
        minValue: 0,
        maxValue: 2,
        name: "filtersPanel.filters.contrast",
        valueBuilder: (value: number) => `${(value * 100 - 100).toFixed(0)}%`
      },
    ]
  }
];