export enum StepTypes {
  Instructions = "instructions",
  Fixation = "fixation",
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
    step: "fixation",
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
    component: "base-fixation",
  },
};
