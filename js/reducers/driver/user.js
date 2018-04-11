import { REHYDRATE } from 'redux-persist/constants';
import { DRIVER_LOGIN_SUCCESS, LOGOUT_USER } from '../../actions/common/signin';
import { DRIVER_REGISTER_SUCCESS } from '../../actions/common/register';
import {
  SET_USER_LOCATION,
  SET_INITIAL_USER_LOCATION
} from '../../actions/driver/home';
import {
  PROFILE_UPDATED,
  SET_HOME_ADDRESS,
  PROFILE_PROGRESS
} from '../../actions/driver/settings';

const initialState = {
  _id: undefined,
  email: undefined,
  password: undefined,
  userType: undefined,
  fname: undefined,
  lname: undefined,
  dob: undefined,
  address: undefined,
  city: undefined,
  state: undefined,
  country: undefined,
  emergencyDetails: {
    phone: undefined,
    name: undefined,
    imgUrl: undefined
  },
  insuranceUrl: undefined,
  vechilePaperUrl: undefined,
  rcBookUrl: undefined,
  licenceDetails: {},
  photographUrl: undefined,
  licenceUrl: undefined,
  licenseBackUrl: undefined,
  childSafetyUrl: undefined,
  hireServiceUrl: undefined,
  workWithChildUrl: undefined,
  passengerLicenseUrl: undefined,
  charterLicenseUrl: undefined,
  carPhotoUrl: undefined,
  passengerLicenseCodeUrl: undefined,
  carDetails: {},
  recoveryEmail: undefined,
  latitudeDelta: 0.022,
  longitudeDelta: undefined,
  gpsLoc: [],
  userRating: undefined,
  phoneNo: undefined,
  profileUrl: undefined,
  currTripId: undefined,
  isAvailable: false,
  currTripState: undefined,
  loginStatus: undefined,
  createdAt: undefined,
  profileUpdating: false,
  homeAddress: undefined
};

export const getUserType = state => {
  const rider = state.rider.user.userType;
  const driver = state.driver.user.userType;
  if (!rider && !driver) {
    return null;
  } else if (!driver) {
    return rider;
  }
  return driver;
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case DRIVER_LOGIN_SUCCESS:
      return action.payload.data.user;

    case DRIVER_REGISTER_SUCCESS:
      return action.payload.data.user;

    case LOGOUT_USER:
      return initialState;

    case PROFILE_UPDATED:
      return {
        ...state,
        fname: action.payload.data.fname,
        lname: action.payload.data.lname,
        email: action.payload.data.email,
        phoneNo: action.payload.data.phoneNo,
        profileUrl: action.payload.data.profileUrl,
        homeAddress: action.payload.data.homeAddress,
        emergencyDetails: action.payload.data.emergencyDetails,
        insuranceUrl: action.payload.data.insuranceUrl,
        vechilePaperUrl: action.payload.data.vechilePaperUrl,
        rcBookUrl: action.payload.data.rcBookUrl,
        licenceDetails: action.payload.data.licenceDetails,
        photographUrl: action.payload.data.photographUrl,
        licenceUrl: action.payload.data.licenceUrl,
        licenseBackUrl: action.payload.data.licenseBackUrl,
        childSafetyUrl: action.payload.data.childSafetyUrl,
        hireServiceUrl: action.payload.data.hireServiceUrl,
        workWithChildUrl: action.payload.data.workWithChildUrl,
        passengerLicenseUrl: action.payload.data.passengerLicenseUrl,
        charterLicenseUrl: action.payload.data.charterLicenseUrl,
        carPhotoUrl: action.payload.data.carPhotoUrl,
        passengerLicenseCodeUrl: action.payload.data.passengerLicenseCodeUrl,
        carDetails: action.payload.data.carDetails,
        isAvailable: action.payload.data.isAvailable,
        profileUpdating: false
      };

    case SET_INITIAL_USER_LOCATION:
      return {
        ...state,
        gpsLoc: [action.payload.latitude, action.payload.longitude]
      };

    case SET_USER_LOCATION:
      return {
        ...state,
        gpsLoc: [action.payload.latitude, action.payload.longitude]
      };
    case PROFILE_PROGRESS:
      return { ...state, profileUpdating: true };

    case SET_HOME_ADDRESS:
      return { ...state, homeAddress: action.payload };

    default:
      return state;
  }
};
export default user;
