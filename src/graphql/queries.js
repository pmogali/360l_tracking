/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTripInfo = /* GraphQL */ `
  query GetTripInfo($id: ID!) {
    getTripInfo(id: $id) {
      id
      Event
      Event_Time
      Notes
      Latitude
      Longitude
      Type
      File_Location
      VehicleInfos {
        nextToken
        startedAt
      }
      Core_Motion
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listTripInfos = /* GraphQL */ `
  query ListTripInfos(
    $filter: ModelTripInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTripInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Event
        Event_Time
        Notes
        Latitude
        Longitude
        Type
        File_Location
        Core_Motion
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTripInfos = /* GraphQL */ `
  query SyncTripInfos(
    $filter: ModelTripInfoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTripInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        Event
        Event_Time
        Notes
        Latitude
        Longitude
        Type
        File_Location
        Core_Motion
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getVehicleInfo = /* GraphQL */ `
  query GetVehicleInfo($id: ID!) {
    getVehicleInfo(id: $id) {
      id
      VIN
      Year
      Model
      Make
      Trim
      tripinfos {
        nextToken
        startedAt
      }
      UserInfos {
        nextToken
        startedAt
      }
      Selected
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listVehicleInfos = /* GraphQL */ `
  query ListVehicleInfos(
    $filter: ModelVehicleInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVehicleInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        VIN
        Year
        Model
        Make
        Trim
        Selected
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncVehicleInfos = /* GraphQL */ `
  query SyncVehicleInfos(
    $filter: ModelVehicleInfoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncVehicleInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        VIN
        Year
        Model
        Make
        Trim
        Selected
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUserPreference = /* GraphQL */ `
  query GetUserPreference($id: ID!) {
    getUserPreference(id: $id) {
      id
      UserInfos {
        nextToken
        startedAt
      }
      Pref_Key
      Pref_Value
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listUserPreferences = /* GraphQL */ `
  query ListUserPreferences(
    $filter: ModelUserPreferenceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserPreferences(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Pref_Key
        Pref_Value
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUserPreferences = /* GraphQL */ `
  query SyncUserPreferences(
    $filter: ModelUserPreferenceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserPreferences(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        Pref_Key
        Pref_Value
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUserInfo = /* GraphQL */ `
  query GetUserInfo($id: ID!) {
    getUserInfo(id: $id) {
      id
      Name
      Titles
      Status
      Email
      Password
      Phone
      Last_Update_User
      Last_Update
      userpreferences {
        nextToken
        startedAt
      }
      vehicleinfos {
        items {
          vehicleInfo {
            Make
            Model
            id
            Selected
          }
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listUserInfos = /* GraphQL */ `
  query ListUserInfos(
    $filter: ModelUserInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Name
        Titles
        Status
        Email
        Password
        Phone
        Last_Update_User
        Last_Update
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUserInfos = /* GraphQL */ `
  query SyncUserInfos(
    $filter: ModelUserInfoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        Name
        Titles
        Status
        Email
        Password
        Phone
        Last_Update_User
        Last_Update
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getTripInfoVehicleInfo = /* GraphQL */ `
  query GetTripInfoVehicleInfo($id: ID!) {
    getTripInfoVehicleInfo(id: $id) {
      id
      tripInfoID
      vehicleInfoID
      tripInfo {
        id
        Event
        Event_Time
        Notes
        Latitude
        Longitude
        Type
        File_Location
        Core_Motion
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      vehicleInfo {
        id
        VIN
        Year
        Model
        Make
        Trim
        Selected
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listTripInfoVehicleInfos = /* GraphQL */ `
  query ListTripInfoVehicleInfos(
    $filter: ModelTripInfoVehicleInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTripInfoVehicleInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tripInfoID
        vehicleInfoID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTripInfoVehicleInfos = /* GraphQL */ `
  query SyncTripInfoVehicleInfos(
    $filter: ModelTripInfoVehicleInfoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTripInfoVehicleInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        tripInfoID
        vehicleInfoID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getVehicleInfoUserInfo = /* GraphQL */ `
  query GetVehicleInfoUserInfo($id: ID!) {
    getVehicleInfoUserInfo(id: $id) {
      id
      vehicleInfoID
      userInfoID
      vehicleInfo {
        id
        VIN
        Year
        Model
        Make
        Trim
        Selected
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      userInfo {
        id
        Name
        Titles
        Status
        Email
        Password
        Phone
        Last_Update_User
        Last_Update
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listVehicleInfoUserInfos = /* GraphQL */ `
  query ListVehicleInfoUserInfos(
    $filter: ModelVehicleInfoUserInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVehicleInfoUserInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        vehicleInfoID
        userInfoID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncVehicleInfoUserInfos = /* GraphQL */ `
  query SyncVehicleInfoUserInfos(
    $filter: ModelVehicleInfoUserInfoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncVehicleInfoUserInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        vehicleInfoID
        userInfoID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUserPreferenceUserInfo = /* GraphQL */ `
  query GetUserPreferenceUserInfo($id: ID!) {
    getUserPreferenceUserInfo(id: $id) {
      id
      userPreferenceID
      userInfoID
      userPreference {
        id
        Pref_Key
        Pref_Value
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      userInfo {
        id
        Name
        Titles
        Status
        Email
        Password
        Phone
        Last_Update_User
        Last_Update
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listUserPreferenceUserInfos = /* GraphQL */ `
  query ListUserPreferenceUserInfos(
    $filter: ModelUserPreferenceUserInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserPreferenceUserInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userPreferenceID
        userInfoID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUserPreferenceUserInfos = /* GraphQL */ `
  query SyncUserPreferenceUserInfos(
    $filter: ModelUserPreferenceUserInfoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserPreferenceUserInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userPreferenceID
        userInfoID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
