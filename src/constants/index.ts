export enum licenceTypes {
  TIME_BOUND = "TIME_BOUND",
  USAGE_LIMIT = "USAGE_LIMIT",
  HARDWARE = "HARDWARE",
}

export const licenceTypesLabels = {
  [licenceTypes.HARDWARE]: "Hardware",
  [licenceTypes.TIME_BOUND]: "Time Bound",
  [licenceTypes.USAGE_LIMIT]: "Usage Limit",
};
