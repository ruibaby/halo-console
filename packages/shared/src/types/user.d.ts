export interface UserProfileLayoutTabs {
  id: string;
  label: string;
  routeName: string;
}

export interface UserProfileLayoutPublicStates {
  tabs: UserProfileLayoutTabs[];
}
