export enum StepTypes {
  Instructions = "instructions",
  FixationRest = "fixation",
  FixationTask = "fixationTask",
  Stimulus = "stimulus",
  End = "end",
}

export enum LogStepTypes {
  StartLog = "# Starting logging",
  Instructions = "# Showing instructions",
  Fixation = "# Showing fixation",
  StartedExp = "# Experiment started",
  EndedPrel = "# Script ended preliminary via the q key",
  EndMsg = "# End message shown",
  EndingExp = "# Ending experiment"
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
    component: "base-instructions",
  },
};
