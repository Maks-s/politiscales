export interface UnpairedAxis {
  legacyKey?: string
}

export interface PairedAxis {
  pair?: string
  legacyKey?: string
  color?: string
}

export interface AxisValues {
  [key: string]: number | null
}
