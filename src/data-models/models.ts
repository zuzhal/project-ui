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

export interface ExperimentTimes {
  endrest: number;
  initial: number;
  rest: number;
  stimulus: number;
}
export interface Instructions {
  instructions: string;
  instructionsColor: string;
  title: string;
  titleColor: string;
}

export interface ReportSettings {
  report: string;
  reportColor: string;
  reportFontSize: number;
}

export interface FixationSettings {
  fixationColorRest: string;
  fixationColorTask: string;
  fixationRadius: number;
}

export interface StimulusSettings {
  // stimuliSet: any;
  stimulusColor: string;
  stimulusHeight: number;
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
  usersPermissionsUser: any; // TODO interface
}

export interface ExperimentStepInt {
  step: string;
  component: string;
}

export interface FlankerStimulus {
  text: string;
  direction: string;
  congruency: string;
  code: string;
}
