import { tripUpdate } from "../../services/driversocket";
import { endTripSubmit } from "../../middlewares/driver/endTripmiddleware";
import { changePageStatus } from "../../actions/driver/home";
import moment from "moment";

export const END_TRIP = "END_TRIP";
export const TRIP_FARE = "TRIP_FARE";

export function endTrip() {
  return (dispatch, getState) => {
    dispatch({ type: END_TRIP, payload: "endTrip" });
    fetchFareDetail(getState().driver, getState().basicAppConfig.config).then(
      fareAmt => {
        dispatch({ type: TRIP_FARE, payload: fareAmt });
        endTripSubmit({ to: "90898", message: "testcase" });

        tripUpdate(getState().driver.trip); // socket call to notify end trip
        dispatch(changePageStatus("rateRider"));
      }
    );
  };
}

export function fetchFareDetail(tripObj, appConfig) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${
        tripObj.trip.srcLoc[0]
      },${tripObj.trip.srcLoc[1]}&destinations=${tripObj.user.gpsLoc[0]},${
        tripObj.user.gpsLoc[1]
      }&key=${appConfig.googleMapsApiKey}`,
      {
        method: "GET"
      }
    )
      .then(resp => resp.json())
      .then(response => {
        const bookingTime = moment(
          tripObj.trip.bookingTime,
          "YYYY-MM-DD'T'HH:mm:ss:SSSZ"
        );
        const currentTime = moment(new Date());
        const travelTime = moment.duration(currentTime.diff(bookingTime));
        const tripDistance = response.rows[0].elements[0].distance.value / 1000;
        let tripTime = Math.abs(travelTime._milliseconds);
        const tripAmt =
          tripDistance * appConfig.tripPrice.farePerKm +
          tripTime / 60000 * appConfig.tripPrice.farePerMin +
          appConfig.tripPrice.baseFare;
        resolve(Math.round(tripAmt));
      })
      .catch(e => reject(e));
  });
}
