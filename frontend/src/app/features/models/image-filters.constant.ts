import { FilterGroupConfig, ImageFilters } from "./image-filters.model";

export const defaultFilters: ImageFilters = {
  brightness: 1,
  contrast: 1,
  upscale: 2,
  arch: "clean",
}

export const archValues = {
  clean: "filtersPanel.filters.arch.options.clean",
  original: "filtersPanel.filters.arch.options.original",
}

export const filtersConfig: FilterGroupConfig[] = [
  {
    name: "filtersPanel.groups.enhancement.name",
    description: "filtersPanel.groups.enhancement.description",
    icon: "star_half",
    filters: [
      {
        id: "upscale",
        minValue: 1,
        maxValue: 4,
        step: 1,
        type: "slider",
        name: "filtersPanel.filters.upscale",
        valueBuilder: (value: number) => `${value.toFixed(0)}x`
      },
      {
        id: "arch",
        values: Object.keys(archValues),
        type: "radio",
        name: "filtersPanel.filters.arch.name",
        valueBuilder: (value: string) => archValues[value as keyof typeof archValues]
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
        step: 0.1,
        type: "slider",
        name: "filtersPanel.filters.brightness",
        valueBuilder: (value: number) => `${(value * 100 - 100).toFixed(0)}%`
      },
      {
        id: "contrast",
        minValue: 0,
        maxValue: 2,
        step: 0.1,
        type: "slider",
        name: "filtersPanel.filters.contrast",
        valueBuilder: (value: number) => `${(value * 100 - 100).toFixed(0)}%`
      },
    ]
  }
];