export interface WidgetGroup {
  id: string;
  label: string;
  notice?: string;
  widgets: Widget[];
}

export interface Widget {
  x: number;
  y: number;
  w: number;
  h: number;
  i: number;
  widget: string;
}

export interface DashboardPublicState {
  widgets: WidgetGroup[];
}
