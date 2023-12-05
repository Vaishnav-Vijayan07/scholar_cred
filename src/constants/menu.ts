export interface MenuItemTypes {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: string;
  roles?: string[];
  url?: string;
  badge?: {
    variant: string;
    text: string;
  };
  parentKey?: string;
  target?: string;
  children?: MenuItemTypes[];
}

const MENU_ITEMS: MenuItemTypes[] = [
  { key: "navigation", label: "Navigation", isTitle: true },
  {
    key: "dashboard",
    label: "Dashboard",
    isTitle: false,
    icon: "airplay",
    url: "/dashboard-4",
  },

  { key: "user_management", label: "User Management", isTitle: true, roles: ["ADMIN", "SUPER_USER", "CONSULTANT_ADMIN"] },

  {
    key: "consultant",
    label: "Consultants",
    isTitle: false,
    icon: "user-check",
    url: "/users/consultant",
    roles: ["ADMIN", "SUPER_USER"],
  },
  {
    key: "staff",
    label: "Staff",
    isTitle: false,
    icon: "users",
    url: "/users/staff",
    roles: ["ADMIN", "SUPER_USER"],
  },
  {
    key: "consultant_staff",
    label: "Consultant Staff",
    isTitle: false,
    icon: "users",
    url: "/consultant-users/staff",
    roles: ["CONSULTANT_ADMIN", "SUPER_USER"],
  },
];

const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = [
  {
    key: "dashboard",
    icon: "home",
    label: "Dashboard",
    isTitle: true,
    children: [
      {
        key: "ds-dashboard-4",
        label: "Dashboard",
        url: "/dashboard-4",
        parentKey: "dashboard",
      },
    ],
  },
  {
    key: "users",
    label: "Users",
    isTitle: false,
    icon: "users",
    roles: ["ADMIN", "SUPER_USER", "CONSULTANT_ADMIN"],
    children: [
      {
        key: "consultant",
        label: "Consultants",
        url: "/users/consultant",
        parentKey: "users",
        roles: ["ADMIN", "SUPER_USER"],
      },
      {
        key: "staff",
        label: "Staff",
        url: "/users/staff",
        parentKey: "users",
        roles: ["ADMIN", "SUPER_USER"],
      },
      {
        key: "consultant_staff",
        label: "Consultant Staff",
        isTitle: false,
        icon: "users",
        url: "/consultant-users/staff",
        roles: ["CONSULTANT_ADMIN", "SUPER_USER"],
      },
    ],
  },
];

const TWO_COl_MENU_ITEMS: MenuItemTypes[] = [
  {
    key: "dashboard",
    icon: "home",
    label: "Dashboard",
    isTitle: true,
    children: [
      {
        key: "ds-dashboard-4",
        label: "Dashboard",
        url: "/dashboard-4",
        parentKey: "dashboard",
      },
    ],
  },
  {
    key: "users",
    label: "Users",
    isTitle: false,
    icon: "users",
    roles: ["ADMIN", "SUPER_USER", "CONSULTANT_ADMIN"],
    children: [
      {
        key: "consultant",
        label: "Consultants",
        url: "/users/consultant",
        parentKey: "users",
        roles: ["ADMIN", "SUPER_USER"],
      },
      {
        key: "staff",
        label: "Staff",
        url: "/users/staff",
        parentKey: "users",
        roles: ["ADMIN", "SUPER_USER"],
      },
      {
        key: "consultant_staff",
        label: "Consultant Staff",
        isTitle: false,
        icon: "users",
        url: "/consultant-users/staff",
        roles: ["CONSULTANT_ADMIN", "SUPER_USER"],
      },
    ],
  },
];

export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
