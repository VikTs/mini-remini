import { FilterGroupConfig, ImageFilters } from "./image-filters.model";

export const initialFilters: ImageFilters = {
  enhanceFace: false,
  faceHightResolution: false,
  restore: false,
  restoreHightResolution: false,
  colorCorrection: "none",
}

export const filtersConfig: FilterGroupConfig[] = [
  {
    name: "filtersPanel.groups.restoration.name",
    description: "filtersPanel.groups.restoration.description",
    icon: "auto_fix_high",
    filters: [
      {
        id: "restore",
        type: "toggle",
        name: "filtersPanel.filters.restore",
      },
      {
        id: "restoreHightResolution",
        type: "checkbox",
        tooltip: "filtersPanel.tooltips.slowProcessing",
        name: "filtersPanel.filters.restoreHightResolution",
      }
    ]
  },
  {
    name: "filtersPanel.groups.face_enhancement.name",
    description: "filtersPanel.groups.face_enhancement.description",
    icon: "auto_awesome",
    filters: [
      {
        id: "enhanceFace",
        type: "toggle",
        name: "filtersPanel.filters.enhance_face",
      },
      {
        id: "faceHightResolution",
        type: "checkbox",
        tooltip: "filtersPanel.tooltips.slowProcessing",
        name: "filtersPanel.filters.faceHightResolution",
      }
    ]
  },
  {
    name: "filtersPanel.groups.lighting.name",
    description: "filtersPanel.groups.lighting.description",
    icon: "palette",
    filters: [
      {
        id: "colorCorrection",
        type: "button",
        name: "filtersPanel.filters.color_correction.name",
        values: [
          { id: "none", name: "filtersPanel.filters.color_correction.options.no_filter", image: "images/deny-circle.png" },
          { id: "warm", name: "filtersPanel.filters.color_correction.options.warm", image: "images/color-correction/warm.png" },
          { id: "cool", name: "filtersPanel.filters.color_correction.options.cool", image: "images/color-correction/cool.png" },
          { id: "vintage", name: "filtersPanel.filters.color_correction.options.vintage", image: "images/color-correction/vintage.png" },
          { id: "cinematic", name: "filtersPanel.filters.color_correction.options.cinematic", image: "images/color-correction/cinematic.png" },
        ],
      },
    ]
  }
];