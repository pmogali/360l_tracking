// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TypeEnum = {
  "RECORDING": "RECORDING",
  "MANUAL": "MANUAL"
};

const { TripInfo, VehicleInfo, UserInfo, UserPreference, TripInfoVehicleInfo, VehicleInfoUserInfo, UserPreferenceUserInfo } = initSchema(schema);

export {
  TripInfo,
  VehicleInfo,
  UserInfo,
  UserPreference,
  TripInfoVehicleInfo,
  VehicleInfoUserInfo,
  UserPreferenceUserInfo,
  TypeEnum
};