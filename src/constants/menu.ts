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
    url: "/dashboard",
  },

  { key: "user_management", label: "User Management", isTitle: true, roles: ["CRED_ADMIN", "SUPER_USER", "CONSULTANT_ADMIN"] },

  {
    key: "consultant",
    label: "Consultants",
    isTitle: false,
    icon: "user-check",
    url: "/users/consultant",
    roles: ["CRED_ADMIN", "SUPER_USER"],
  },
  {
    key: "staff",
    label: "Staff",
    isTitle: false,
    icon: "users",
    url: "/users/staff",
    roles: ["CRED_ADMIN", "SUPER_USER"],
  },

  {
    key: "consultant_staff",
    label: "Consultant Staff",
    isTitle: false,
    icon: "users",
    url: "/consultant-users/staff",
    roles: ["CONSULTANT_ADMIN", "SUPER_USER"],
  },

  { key: "student_management", label: "Student Management", isTitle: true, roles: ["CRED_ADMIN", "SUPER_USER", "CONSULTANT_ADMIN", "CONSULTANT_STAFF"] },

  {
    key: "students",
    label: "Students",
    isTitle: false,
    icon: "users",
    url: "/users/students",
    roles: ["CRED_ADMIN", "SUPER_USER", "CONSULTANT_ADMIN", "CONSULTANT_STAFF"],
  },

  { key: "cred_admin_management", label: "Cred Admin Management", isTitle: true, roles: ["SUPER_USER"] },

  {
    key: "cred_admin_management",
    label: "Cred Admin Users",
    isTitle: false,
    icon: "users",
    url: "/cred_admin/cred_user_management",
    roles: ["SUPER_USER"],
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
        key: "ds-dashboard",
        label: "Dashboard",
        url: "/dashboard",
        parentKey: "dashboard",
      },
    ],
  },
  {
    key: "users",
    label: "Users",
    isTitle: false,
    icon: "users",
    roles: ["CRED_ADMIN", "SUPER_USER", "CONSULTANT_ADMIN"],
    children: [
      {
        key: "consultant",
        label: "Consultants",
        url: "/users/consultant",
        parentKey: "users",
        roles: ["CRED_ADMIN", "SUPER_USER"],
      },
      {
        key: "staff",
        label: "Staff",
        url: "/users/staff",
        parentKey: "users",
        roles: ["CRED_ADMIN", "SUPER_USER"],
      },
      {
        key: "consultant_staff",
        label: "Consultant Staff",
        isTitle: false,
        url: "/consultant-users/staff",
        roles: ["CONSULTANT_ADMIN", "SUPER_USER"],
      },
    ],
  },
  {
    key: "student_management",
    icon: "users",
    label: "Student Management",
    isTitle: true,
    children: [
      {
        key: "students",
        label: "Students",
        isTitle: false,
        url: "/users/students",
        roles: ["CRED_ADMIN", "SUPER_USER", "CONSULTANT_ADMIN", "CONSULTANT_STAFF"],
      },
    ],
  },
  {
    key: "cred_admin_management",
    icon: "users",
    label: "Cred Admin  Management",
    isTitle: true,
    children: [
      {
        key: "cred_admin_management",
        label: "Cred Admin Management",
        isTitle: false,
        url: "/cred_admin/cred_user_management",
        roles: ["SUPER_USER"],
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
        key: "ds-dashboard",
        label: "Dashboard",
        url: "/dashboard",
        parentKey: "dashboard",
      },
    ],
  },
  {
    key: "users",
    label: "Users",
    isTitle: false,
    icon: "users",
    roles: ["CRED_ADMIN", "SUPER_USER", "CONSULTANT_ADMIN"],
    children: [
      {
        key: "consultant",
        label: "Consultants",
        url: "/users/consultant",
        parentKey: "users",
        roles: ["CRED_ADMIN", "SUPER_USER"],
      },
      {
        key: "staff",
        label: "Staff",
        url: "/users/staff",
        parentKey: "users",
        roles: ["CRED_ADMIN", "SUPER_USER"],
      },
      {
        key: "consultant_staff",
        label: "Consultant Staff",
        isTitle: false,
        url: "/consultant-users/staff",
        roles: ["CONSULTANT_ADMIN", "SUPER_USER"],
      },
    ],
  },
  {
    key: "student_management",
    icon: "users",
    label: "Student Management",
    isTitle: true,
    children: [
      {
        key: "students",
        label: "Students",
        isTitle: false,
        url: "/users/students",
        roles: ["CRED_ADMIN", "SUPER_USER", "CONSULTANT_ADMIN", "CONSULTANT_STAFF"],
      },
    ],
  },
];

export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
