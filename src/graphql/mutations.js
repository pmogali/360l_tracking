/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTripInfo = /* GraphQL */ `
  mutation CreateTripInfo(
    $input: CreateTripInfoInput!
    $condition: ModelTripInfoConditionInput
  ) {
    createTripInfo(input: $input, condition: $condition) {
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
export const updateTripInfo = /* GraphQL */ `
  mutation UpdateTripInfo(
    $input: UpdateTripInfoInput!
    $condition: ModelTripInfoConditionInput
  ) {
    updateTripInfo(input: $input, condition: $condition) {
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
export const deleteTripInfo = /* GraphQL */ `
  mutation DeleteTripInfo(
    $input: DeleteTripInfoInput!
    $condition: ModelTripInfoConditionInput
  ) {
    deleteTripInfo(input: $input, condition: $condition) {
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
export const createVehicleInfo = /* GraphQL */ `
  mutation CreateVehicleInfo(
    $input: CreateVehicleInfoInput!
    $condition: ModelVehicleInfoConditionInput
  ) {
    createVehicleInfo(input: $input, condition: $condition) {
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
export const updateVehicleInfo = /* GraphQL */ `
  mutation UpdateVehicleInfo(
    $input: UpdateVehicleInfoInput!
    $condition: ModelVehicleInfoConditionInput
  ) {
    updateVehicleInfo(input: $input, condition: $condition) {
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
export const deleteVehicleInfo = /* GraphQL */ `
  mutation DeleteVehicleInfo(
    $input: DeleteVehicleInfoInput!
    $condition: ModelVehicleInfoConditionInput
  ) {
    deleteVehicleInfo(input: $input, condition: $condition) {
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
export const createUserPreference = /* GraphQL */ `
  mutation CreateUserPreference(
    $input: CreateUserPreferenceInput!
    $condition: ModelUserPreferenceConditionInput
  ) {
    createUserPreference(input: $input, condition: $condition) {
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
export const updateUserPreference = /* GraphQL */ `
  mutation UpdateUserPreference(
    $input: UpdateUserPreferenceInput!
    $condition: ModelUserPreferenceConditionInput
  ) {
    updateUserPreference(input: $input, condition: $condition) {
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
export const deleteUserPreference = /* GraphQL */ `
  mutation DeleteUserPreference(
    $input: DeleteUserPreferenceInput!
    $condition: ModelUserPreferenceConditionInput
  ) {
    deleteUserPreference(input: $input, condition: $condition) {
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
export const createUserInfo = /* GraphQL */ `
  mutation CreateUserInfo(
    $input: CreateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    createUserInfo(input: $input, condition: $condition) {
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
export const updateUserInfo = /* GraphQL */ `
  mutation UpdateUserInfo(
    $input: UpdateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    updateUserInfo(input: $input, condition: $condition) {
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
export const deleteUserInfo = /* GraphQL */ `
  mutation DeleteUserInfo(
    $input: DeleteUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    deleteUserInfo(input: $input, condition: $condition) {
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
export const createTripInfoVehicleInfo = /* GraphQL */ `
  mutation CreateTripInfoVehicleInfo(
    $input: CreateTripInfoVehicleInfoInput!
    $condition: ModelTripInfoVehicleInfoConditionInput
  ) {
    createTripInfoVehicleInfo(input: $input, condition: $condition) {
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
export const updateTripInfoVehicleInfo = /* GraphQL */ `
  mutation UpdateTripInfoVehicleInfo(
    $input: UpdateTripInfoVehicleInfoInput!
    $condition: ModelTripInfoVehicleInfoConditionInput
  ) {
    updateTripInfoVehicleInfo(input: $input, condition: $condition) {
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
export const deleteTripInfoVehicleInfo = /* GraphQL */ `
  mutation DeleteTripInfoVehicleInfo(
    $input: DeleteTripInfoVehicleInfoInput!
    $condition: ModelTripInfoVehicleInfoConditionInput
  ) {
    deleteTripInfoVehicleInfo(input: $input, condition: $condition) {
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
export const createVehicleInfoUserInfo = /* GraphQL */ `
  mutation CreateVehicleInfoUserInfo(
    $input: CreateVehicleInfoUserInfoInput!
    $condition: ModelVehicleInfoUserInfoConditionInput
  ) {
    createVehicleInfoUserInfo(input: $input, condition: $condition) {
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
export const updateVehicleInfoUserInfo = /* GraphQL */ `
  mutation UpdateVehicleInfoUserInfo(
    $input: UpdateVehicleInfoUserInfoInput!
    $condition: ModelVehicleInfoUserInfoConditionInput
  ) {
    updateVehicleInfoUserInfo(input: $input, condition: $condition) {
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
export const deleteVehicleInfoUserInfo = /* GraphQL */ `
  mutation DeleteVehicleInfoUserInfo(
    $input: DeleteVehicleInfoUserInfoInput!
    $condition: ModelVehicleInfoUserInfoConditionInput
  ) {
    deleteVehicleInfoUserInfo(input: $input, condition: $condition) {
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
export const createUserPreferenceUserInfo = /* GraphQL */ `
  mutation CreateUserPreferenceUserInfo(
    $input: CreateUserPreferenceUserInfoInput!
    $condition: ModelUserPreferenceUserInfoConditionInput
  ) {
    createUserPreferenceUserInfo(input: $input, condition: $condition) {
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
export const updateUserPreferenceUserInfo = /* GraphQL */ `
  mutation UpdateUserPreferenceUserInfo(
    $input: UpdateUserPreferenceUserInfoInput!
    $condition: ModelUserPreferenceUserInfoConditionInput
  ) {
    updateUserPreferenceUserInfo(input: $input, condition: $condition) {
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
export const deleteUserPreferenceUserInfo = /* GraphQL */ `
  mutation DeleteUserPreferenceUserInfo(
    $input: DeleteUserPreferenceUserInfoInput!
    $condition: ModelUserPreferenceUserInfoConditionInput
  ) {
    deleteUserPreferenceUserInfo(input: $input, condition: $condition) {
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
