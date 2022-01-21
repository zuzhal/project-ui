import { LogStepTypes } from "./../data-models/constants";
import axios from "axios";
import { DateTime } from "luxon";
import store from "../store/index";

const API_URL = "http://localhost:1337/";
const uninterceptedAxiosInstance = axios.create();

//localstorage[‘key+timestamp’] = event
export function saveLogLocal(args: any) {
  const time = DateTime.local({ locale: "sl" }).toISO();
  const timeFormatted = DateTime.fromISO(time).toLocaleString(
    DateTime.DATETIME_SHORT_WITH_SECONDS
  );
  const guid = store.getters["experiments/guid"];
  const subject = store.getters["experiments/subject"];
  const key = guid + time;
  const experiment = store.getters["experimentConfig/experimentName"];
  let data = "";
  if (args.step) {
    if (args.step == LogStepTypes.StartLog) {
      data = `${LogStepTypes.StartLog} for subject ${subject} at ${timeFormatted}`;
      setExperimentSubjectList(guid, experiment, subject);
    } else {
      data = `${args.step} ${timeFormatted}`;
    }
    setLocalStorageItem(key, data, time, guid, experiment, subject);
  } else {
    setLocalStorageItem(key, args, time, guid, experiment, subject);
  }
}

export function saveResponsesDB() {
  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    const item = localStorage.getItem(key);
    if (isJSON(item)) {
      const requestObj = JSON.parse(item);
      const response = uninterceptedAxiosInstance
        .post(API_URL + "general-logs", requestObj)
        .then((response) => {
          if (response.status !== 200) {
            console.error(response);
            alert(response.statusText);
          } else {
            localStorage.removeItem(key);
          }
        });
    }
  });
}

function setLocalStorageItem(key, data, dateTime, guid, experiment, subject) {
  localStorage.setItem(
    key,
    JSON.stringify({
      data,
      dateTime,
      guid,
      experiment,
      subject
    })
  );
}

function setExperimentSubjectList(guid, experiment, subject) {
  const time = DateTime.local({ locale: "sl" }).toISO();
  const requestObj = { guid, experiment, subject, dateTime: time };
  const response = uninterceptedAxiosInstance
    .post(API_URL + "experiment-subject-lists", requestObj)
    .then((response) => {
      if (response.status !== 200) {
        console.error(response);
        alert(response.statusText);
      }
    });
}

function isJSON(str) {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
}
