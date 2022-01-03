import { LogStepTypes } from "./../data-models/constants";
import axios from "axios";
import { DateTime } from "luxon";
import store from "../store/index";

const API_URL = "http://localhost:1337/";
const uninterceptedAxiosInstance = axios.create();

//localstorage[‘kľúč+timestamp’] = event?
export function saveLogLocal(args: any) {
  const time = DateTime.local({ locale: "sl" }).toISO();
  const guid = store.getters["experiments/guid"];
  const timeFormatted = DateTime.fromISO(time).toLocaleString(
    DateTime.DATETIME_SHORT_WITH_SECONDS
  );
  const key = guid + time;
  const experiment = store.getters["experimentConfig/experimentName"];
  let data = "";
  if (args.step) {
    if (args.step == LogStepTypes.StartLog) {
      data = `${LogStepTypes.StartLog} for subject ${args.subject} at ${timeFormatted}`;
    } else {
      data = `${LogStepTypes.StartLog} ${timeFormatted}`;
    }
    setLocalStorageItem(key, data, time, guid, experiment);
  } else {
    setLocalStorageItem(key, args.data, time, guid, experiment);
  }
}

export function saveResponsesDB() {
  const keys = Object.keys(localStorage);
  console.log('saveResp');
  keys.forEach((key) => {
    const item = localStorage.getItem(key);
    if (isJSON(item)) {
      const requestObj = JSON.parse(item);
      const response = uninterceptedAxiosInstance
        .post(API_URL + "general-logs", requestObj)
        .then((response) => {
          if (response.status !== 200) {
            alert(response.statusText);
            console.error(response);
          } else {
            localStorage.removeItem(key);
          }
        });
    }
  });
}

function setLocalStorageItem(key, data, dateTime, guid, experiment) {
  localStorage.setItem(
    key,
    JSON.stringify({
      data: data,
      dateTime: dateTime,
      guid: guid,
      experiment: experiment,
    })
  );
}

function isJSON(str) {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
}
