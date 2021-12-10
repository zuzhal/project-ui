export enum StepTypes {
  Instructions = "instructions",
  FixationRest = "fixation",
  FixationTask = "fixationTask",
  Stimulus = "stimulus",
  End = "end",
}

export const experimentSteps = {
  instructions: {
    step: "instructions",
    component: "base-instructions",
  },
  fixation: {
    step: "fixationRest",
    component: "base-fixation",
  },
  fixationTask: {
    step: "fixationTask",
    component: "base-fixation",
  },
  stimulus: {
    step: "stimulus",
    component: "base-stimulus",
  },
  end: {
    step: "end",
    component: "experiment-ended",
  },
};
