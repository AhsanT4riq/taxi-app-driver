import React, { Component } from "react";
import { StatusBar, Platform, BackHandler } from "react-native";
import { connect } from "react-redux";
import { Drawer } from "native-base";
import { Scene, Router, Actions } from "react-native-router-flux";
import PropTypes from "prop-types";

import { closeDrawer } from "./actions/drawer";
import NavigationDrawer from "./DrawerNavigator";
import Login from "./components/common/login/";
import SignIn from "./components/common/signIn/";
import Register from "./components/common/register/";

import DriverStartupService from "./components/driver/startupServices";
import DriverRootView from "./components/driver/rootView";
import DriverHome from "./components/driver/home";
import SideBar from "./components/driver/sideBar";
import SuggestLocation from "./components/driver/suggestLocation/";
import RideRequest from "./components/driver/rideRequest";
import Settings from "./components/driver/settings";
import History from "./components/driver/history";
import Earnings from "./components/driver/earnings";
import DriverAccessMessage from "./components/driver/driverAccessMessage";
import Documents from "./components/driver/documents";
import UploadFiles from "./components/driver/uploadFiles";
import LicenceDetails from "./components/driver/licenceDetails";
import CarDetails from "./components/driver/carDetails";
import BankDetails from "./components/driver/bankDetails";
import PickRider from "./components/driver/pickRider";
import StartRide from "./components/driver/startRide";
import DropOff from "./components/driver/dropOff";
import RateRider from "./components/driver/rateRider";
import Charities from "./components/driver/charities";
import { statusBarColor } from "./themes/base-theme";
import { getAppConfig } from "./actions/appConfig";

const RouterWithRedux = connect()(Router);

class AppNavigator extends Component {
  static propTypes = {
    driverJwtAccessToken: PropTypes.string
  };
  componentWillMount() {
    this.props.getAppConfig();
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    );
  }

  backAndroid() {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  }

  render() {
    return (
      <NavigationDrawer>
        <StatusBar backgroundColor={statusBarColor} />
        <RouterWithRedux>
          <Scene key="root" hideNavBar>
            <Scene
              key="login"
              component={Login}
              hideNavBar
              initial={!this.props.driverJwtAccessToken ? true : false}
            />
            <Scene key="signIn" component={SignIn} />
            <Scene key="register" component={Register} />

            <Scene key="sideBar" component={SideBar} />
            <Scene
              key="suggestLocation"
              component={SuggestLocation}
              hideNavBar
            />

            <Scene key="driverRootView" component={DriverRootView}>
              <Scene key="driverHome" component={DriverHome} />
              <Scene key="rideRequest" component={RideRequest} />
              <Scene key="pickRider" component={PickRider} />
              <Scene key="startRide" component={StartRide} />
              <Scene key="dropOff" component={DropOff} />
              <Scene key="rateRider" component={RateRider} />
            </Scene>
            <Scene key="settings" component={Settings} />
            <Scene key="charities" component={Charities} />
            <Scene key="history" component={History} />
            <Scene key="earnings" component={Earnings} />
            <Scene key="driverAccessMessage" component={DriverAccessMessage} />
            <Scene key="documents" component={Documents} />
            <Scene key="uploadFiles" component={UploadFiles} />
            <Scene key="licenceDetails" component={LicenceDetails} />
            <Scene key="carDetails" component={CarDetails} />
            <Scene key="bankDetails" component={BankDetails} />
            <Scene
              key="driverStartupService"
              component={DriverStartupService}
              hideNavBar
              initial={this.props.driverJwtAccessToken}
            />
          </Scene>
        </RouterWithRedux>
      </NavigationDrawer>
    );
  }
}
function bindAction(dispatch) {
  return {
    getAppConfig: () => dispatch(getAppConfig())
  };
}
const mapStateToProps = state => ({
  driverApproved: state.driver.user.isApproved,
  driverJwtAccessToken: state.driver.appState.jwtAccessToken
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
