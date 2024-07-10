type subMenu = {
  name: string;
  icon: string;
  to: string;
};

export type typeMenu = {
  name: string;
  icon: string;
  to: string;
  dropdown: boolean;
  subMenu: Array<subMenu> | Array<undefined>;
};
