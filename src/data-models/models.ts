// ------ Experiment interfaces

export interface ExperimentInfoDialog {
  language: { language: string[] }; // json in strapi
  subject: string; // json in strapi
  setup: { setup: string[] };
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

export interface ExperimentSettings {
  expEnvSettings: ExpEnvSettings;
  experimentName: string;
}
