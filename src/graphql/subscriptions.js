/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTripInfo = /* GraphQL */ `
  subscription OnCreateTripInfo {
    onCreateTripInfo {
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
export const onUpdateTripInfo = /* GraphQL */ `
  subscription OnUpdateTripInfo {
    onUpdateTripInfo {
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
export const onDeleteTripInfo = /* GraphQL */ `
  subscription OnDeleteTripInfo {
    onDeleteTripInfo {
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
export const onCreateVehicleInfo = /* GraphQL */ `
  subscription OnCreateVehicleInfo {
    onCreateVehicleInfo {
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
export const onUpdateVehicleInfo = /* GraphQL */ `
  subscription OnUpdateVehicleInfo {
    onUpdateVehicleInfo {
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
export const onDeleteVehicleInfo = /* GraphQL */ `
  subscription OnDeleteVehicleInfo {
    onDeleteVehicleInfo {
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
export const onCreateUserPreference = /* GraphQL */ `
  subscription OnCreateUserPreference {
    onCreateUserPreference {
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
export const onUpdateUserPreference = /* GraphQL */ `
  subscription OnUpdateUserPreference {
    onUpdateUserPreference {
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
export const onDeleteUserPreference = /* GraphQL */ `
  subscription OnDeleteUserPreference {
    onDeleteUserPreference {
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
export const onCreateUserInfo = /* GraphQL */ `
  subscription OnCreateUserInfo {
    onCreateUserInfo {
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
export const onUpdateUserInfo = /* GraphQL */ `
  subscription OnUpdateUserInfo {
    onUpdateUserInfo {
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
export const onDeleteUserInfo = /* GraphQL */ `
  subscription OnDeleteUserInfo {
    onDeleteUserInfo {
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
export const onCreateTripInfoVehicleInfo = /* GraphQL */ `
  subscription OnCreateTripInfoVehicleInfo {
    onCreateTripInfoVehicleInfo {
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
export const onUpdateTripInfoVehicleInfo = /* GraphQL */ `
  subscription OnUpdateTripInfoVehicleInfo {
    onUpdateTripInfoVehicleInfo {
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
export const onDeleteTripInfoVehicleInfo = /* GraphQL */ `
  subscription OnDeleteTripInfoVehicleInfo {
    onDeleteTripInfoVehicleInfo {
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
export const onCreateVehicleInfoUserInfo = /* GraphQL */ `
  subscription OnCreateVehicleInfoUserInfo {
    onCreateVehicleInfoUserInfo {
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
export const onUpdateVehicleInfoUserInfo = /* GraphQL */ `
  subscription OnUpdateVehicleInfoUserInfo {
    onUpdateVehicleInfoUserInfo {
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
export const onDeleteVehicleInfoUserInfo = /* GraphQL */ `
  subscription OnDeleteVehicleInfoUserInfo {
    onDeleteVehicleInfoUserInfo {
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
export const onCreateUserPreferenceUserInfo = /* GraphQL */ `
  subscription OnCreateUserPreferenceUserInfo {
    onCreateUserPreferenceUserInfo {
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
export const onUpdateUserPreferenceUserInfo = /* GraphQL */ `
  subscription OnUpdateUserPreferenceUserInfo {
    onUpdateUserPreferenceUserInfo {
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
export const onDeleteUserPreferenceUserInfo = /* GraphQL */ `
  subscription OnDeleteUserPreferenceUserInfo {
    onDeleteUserPreferenceUserInfo {
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
