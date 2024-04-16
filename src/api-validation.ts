import { z } from "zod";

const ENDPOINT = "https://api.sunrise-sunset.org/json";

const sunsetDataSchema = z.object({
  results: z.object({
    sunrise: z.string(),
    sunset: z.string(),
    solar_noon: z.string(),
    day_length: z.string(),
    civil_twilight_begin: z.string(),
    civil_twilight_end: z.string(),
    nautical_twilight_begin: z.string(),
    nautical_twilight_end: z.string(),
    astronomical_twilight_begin: z.string(),
    astronomical_twilight_end: z.string(),
  }),
  status: z.string(),
  tzid: z.string(),
});
type TSunsetData = z.infer<typeof sunsetDataSchema>;
type TCoordinate = {
  lat: number;
  lng: number;
};

const getEndpoint = ({ lat, lng }: TCoordinate) => {
  return `${ENDPOINT}?lat=${lat}&lng=${lng}`;
};
const getSunsetData = ({ lat, lng }: TCoordinate): Promise<TSunsetData> =>
  // ?lat=36.7201600&lng=-4.4203400
  new Promise((resolve, reject) => {
    const endPoint = getEndpoint({ lat, lng });
    fetch(endPoint, {})
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((e) => {
        reject(e);
      });
  });

getSunsetData({
  lat: 36.72016,
  lng: -4.42034,
})
  .then((data) => {
    console.log("The sunset time is: " + data.results.sunset);
    console.log("The sunrise time is: " + data.results.sunrise);
  })
  .catch((error) => {
    console.error({
      message: error.message,
      name: error.name,
      cause: error.cause,
    });
  });
