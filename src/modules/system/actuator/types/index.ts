export interface GlobalInfo {
  externalUrl: string;
  timeZone: string;
  locale: string;
  allowComments: boolean;
  allowRegistration: boolean;
}

export interface Info {
  git?: Git;
  build?: Build;
  java: Java;
  os: Os;
}

export interface Commit {
  id: string;
  time: Date;
}

export interface Git {
  branch: string;
  commit: Commit;
}

export interface Build {
  artifact: string;
  name: string;
  time: Date;
  version: string;
  group: string;
}

export interface Vendor {
  name: string;
  version: string;
}

export interface Runtime {
  name: string;
  version: string;
}

export interface Jvm {
  name: string;
  vendor: string;
  version: string;
}

export interface Java {
  version: string;
  vendor: Vendor;
  runtime: Runtime;
  jvm: Jvm;
}

export interface Os {
  name: string;
  version: string;
  arch: string;
}

export interface Tag {
  key: string;
  value: string;
}

export interface StartupStep {
  name: string;
  id: number;
  tags: Tag[];
  parentId?: number;
}

export interface Event {
  endTime: Date;
  duration: string;
  startTime: Date;
  startupStep: StartupStep;
}

export interface Timeline {
  startTime: Date;
  events: Event[];
}

export interface Startup {
  springBootVersion: string;
  timeline: Timeline;
}
