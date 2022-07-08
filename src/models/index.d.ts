import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum TypeEnum {
  RECORDING = "RECORDING",
  MANUAL = "MANUAL"
}



type TripInfoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VehicleInfoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserInfoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserPreferenceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TripInfoVehicleInfoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VehicleInfoUserInfoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserPreferenceUserInfoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class TripInfo {
  readonly id: string;
  readonly Event?: string | null;
  readonly Event_Time?: string | null;
  readonly Notes?: string | null;
  readonly Latitude?: number | null;
  readonly Longitude?: number | null;
  readonly Type?: TypeEnum | keyof typeof TypeEnum | null;
  readonly File_Location?: string | null;
  readonly VehicleInfos?: (TripInfoVehicleInfo | null)[] | null;
  readonly Core_Motion?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<TripInfo, TripInfoMetaData>);
  static copyOf(source: TripInfo, mutator: (draft: MutableModel<TripInfo, TripInfoMetaData>) => MutableModel<TripInfo, TripInfoMetaData> | void): TripInfo;
}

export declare class VehicleInfo {
  readonly id: string;
  readonly VIN?: string | null;
  readonly Year?: string | null;
  readonly Model?: string | null;
  readonly Make?: string | null;
  readonly Trim?: string | null;
  readonly tripinfos?: (TripInfoVehicleInfo | null)[] | null;
  readonly UserInfos?: (VehicleInfoUserInfo | null)[] | null;
  readonly Selected?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<VehicleInfo, VehicleInfoMetaData>);
  static copyOf(source: VehicleInfo, mutator: (draft: MutableModel<VehicleInfo, VehicleInfoMetaData>) => MutableModel<VehicleInfo, VehicleInfoMetaData> | void): VehicleInfo;
}

export declare class UserInfo {
  readonly id: string;
  readonly Name: string;
  readonly Titles?: string | null;
  readonly Status?: string | null;
  readonly Email?: string | null;
  readonly Password?: string | null;
  readonly Phone?: string | null;
  readonly Last_Update_User: string;
  readonly Last_Update: string;
  readonly userpreferences?: (UserPreferenceUserInfo | null)[] | null;
  readonly vehicleinfos?: (VehicleInfoUserInfo | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<UserInfo, UserInfoMetaData>);
  static copyOf(source: UserInfo, mutator: (draft: MutableModel<UserInfo, UserInfoMetaData>) => MutableModel<UserInfo, UserInfoMetaData> | void): UserInfo;
}

export declare class UserPreference {
  readonly id: string;
  readonly UserInfos?: (UserPreferenceUserInfo | null)[] | null;
  readonly Pref_Key?: string | null;
  readonly Pref_Value?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<UserPreference, UserPreferenceMetaData>);
  static copyOf(source: UserPreference, mutator: (draft: MutableModel<UserPreference, UserPreferenceMetaData>) => MutableModel<UserPreference, UserPreferenceMetaData> | void): UserPreference;
}

export declare class TripInfoVehicleInfo {
  readonly id: string;
  readonly tripInfo: TripInfo;
  readonly vehicleInfo: VehicleInfo;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<TripInfoVehicleInfo, TripInfoVehicleInfoMetaData>);
  static copyOf(source: TripInfoVehicleInfo, mutator: (draft: MutableModel<TripInfoVehicleInfo, TripInfoVehicleInfoMetaData>) => MutableModel<TripInfoVehicleInfo, TripInfoVehicleInfoMetaData> | void): TripInfoVehicleInfo;
}

export declare class VehicleInfoUserInfo {
  readonly id: string;
  readonly vehicleInfo: VehicleInfo;
  readonly userInfo: UserInfo;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<VehicleInfoUserInfo, VehicleInfoUserInfoMetaData>);
  static copyOf(source: VehicleInfoUserInfo, mutator: (draft: MutableModel<VehicleInfoUserInfo, VehicleInfoUserInfoMetaData>) => MutableModel<VehicleInfoUserInfo, VehicleInfoUserInfoMetaData> | void): VehicleInfoUserInfo;
}

export declare class UserPreferenceUserInfo {
  readonly id: string;
  readonly userInfo: UserInfo;
  readonly userPreference: UserPreference;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<UserPreferenceUserInfo, UserPreferenceUserInfoMetaData>);
  static copyOf(source: UserPreferenceUserInfo, mutator: (draft: MutableModel<UserPreferenceUserInfo, UserPreferenceUserInfoMetaData>) => MutableModel<UserPreferenceUserInfo, UserPreferenceUserInfoMetaData> | void): UserPreferenceUserInfo;
}