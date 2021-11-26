// ------ Experiment interfaces

export interface ExperimentInfoDialog {
  id: any;
  language: { language: string[] }; // json in strapi
  subject: any; 
  setup: { setup: string[] }; // json in strapi
}

export interface ExpEnvSettings {
  background: string;
  fixationRadius: number;
  fixationLinewidth: number;
  fixationColorRest: string;
  fixationColorTask: string;
  titleColor: string;
  titleHeight: number;
  instructionsColor: string;
  instructionsHeight: number;
  reportColor: string;
  reportHeight: number;
  stimulusColor: string;
  stimulusHeight: number;
  title: string;
  report: string;
  instructions: string;
  times: any; // json in strapi
  stimuliSet: any; // json in strapi
  ITISet: any; // json in strapi
}

export interface Instructions {
  instructions: string;
  instructionsColor: string;
  background: string;
  title: string;
  titleColor: string;
}

export interface ExperimentSettings {
  expEnvSettings: ExpEnvSettings;
  experimentName: string;
}

export interface Experiments {
  id: number;
  experimentLink: string;
  experimentName: string;
  active: boolean;
  usersPermissionsUser: any // TODO interface
}
