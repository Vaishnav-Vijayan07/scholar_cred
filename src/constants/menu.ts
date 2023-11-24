export interface MenuItemTypes {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: string;
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
  { key: "apps", label: "Apps", isTitle: true },

  {
    key: "crm-leads",
    label: "Leads",
    isTitle: false,
    icon: "users",
    url: "/apps/crm/leads",
  },

  { key: "components", label: "Components", isTitle: true },

  {
    key: "extended-ui",
    label: "Extended UI",
    isTitle: false,
    icon: "layers",
    badge: { variant: "info", text: "Hot" },
    children: [
      {
        key: "extended-ui-nestable",
        label: "Nestable List",
        url: "/extended-ui/nestable",
        parentKey: "extended-ui",
      },
      {
        key: "extended-ui-dragdrop",
        label: "Drag and Drop",
        url: "/extended-ui/dragdrop",
        parentKey: "extended-ui",
      },
      {
        key: "extended-ui-rangesliders",
        label: "Range Sliders",
        url: "/extended-ui/rangesliders",
        parentKey: "extended-ui",
      },
      {
        key: "extended-ui-animation",
        label: "Animation",
        url: "/extended-ui/animation",
        parentKey: "extended-ui",
      },
      {
        key: "extended-ui-sweet-alert",
        label: "Sweet Alert",
        url: "/extended-ui/sweet-alert",
        parentKey: "extended-ui",
      },
      {
        key: "extended-ui-tour",
        label: "Tour Page",
        url: "/extended-ui/tour",
        parentKey: "extended-ui",
      },
      {
        key: "extended-ui-loading-buttons",
        label: "Loading Buttons",
        url: "/extended-ui/loading-buttons",
        parentKey: "extended-ui",
      },
    ],
  },
  {
    key: "forms",
    label: "Forms",
    isTitle: false,
    icon: "bookmark",
    children: [
      {
        key: "form-basic",
        label: "General Elements",
        url: "/ui/forms/basic",
        parentKey: "forms",
      },
      {
        key: "form-advanced",
        label: "Form Advanced",
        url: "/ui/forms/advanced",
        parentKey: "forms",
      },
      {
        key: "form-validation",
        label: "Validation",
        url: "/ui/forms/validation",
        parentKey: "forms",
      },
      {
        key: "form-wizard",
        label: "Wizard",
        url: "/ui/forms/wizard",
        parentKey: "forms",
      },
      {
        key: "form-upload",
        label: "File Uploads",
        url: "/ui/forms/upload",
        parentKey: "forms",
      },
      {
        key: "form-editors",
        label: "Editors",
        url: "/ui/forms/editors",
        parentKey: "forms",
      },
    ],
  },
  {
    key: "tables",
    label: "Tables",
    isTitle: false,
    icon: "grid",
    children: [
      {
        key: "table-basic",
        label: "Basic Tables",
        url: "/ui/tables/basic",
        parentKey: "tables",
      },
      {
        key: "table-advanced",
        label: "Advanced Tables",
        url: "/ui/tables/advanced",
        parentKey: "tables",
      },
    ],
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
    key: "apps",
    icon: "grid",
    label: "Apps",
    isTitle: true,
    children: [

      {
        key: "apps-leads",
        label: "Leads",
        isTitle: false,
        icon: "users",
        parentKey: "apps",
        url: "/apps/crm/leads",
      },

    ],
  },
  {
    key: "components",
    icon: "package",
    label: "Components",
    isTitle: true,
    children: [
      {
        key: "extended-ui",
        label: "Extended UI",
        isTitle: false,
        icon: "layers",
        badge: { variant: "info", text: "Hot" },
        parentKey: "components",
        children: [
          {
            key: "extended-ui-nestable",
            label: "Nestable List",
            url: "/extended-ui/nestable",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-dragdrop",
            label: "Drag and Drop",
            url: "/extended-ui/dragdrop",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-rangesliders",
            label: "Range Sliders",
            url: "/extended-ui/rangesliders",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-animation",
            label: "Animation",
            url: "/extended-ui/animation",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-sweet-alert",
            label: "Sweet Alert",
            url: "/extended-ui/sweet-alert",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-tour",
            label: "Tour Page",
            url: "/extended-ui/tour",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-loading-buttons",
            label: "Loading Buttons",
            url: "/extended-ui/loading-buttons",
            parentKey: "extended-ui",
          },
        ],
      },
      {
        key: "forms",
        label: "Forms",
        isTitle: false,
        icon: "bookmark",
        parentKey: "components",
        children: [
          {
            key: "form-basic",
            label: "General Elements",
            url: "/ui/forms/basic",
            parentKey: "forms",
          },
          {
            key: "form-advanced",
            label: "Form Advanced",
            url: "/ui/forms/advanced",
            parentKey: "forms",
          },
          {
            key: "form-validation",
            label: "Validation",
            url: "/ui/forms/validation",
            parentKey: "forms",
          },
          {
            key: "form-wizard",
            label: "Wizard",
            url: "/ui/forms/wizard",
            parentKey: "forms",
          },
          {
            key: "form-upload",
            label: "File Uploads",
            url: "/ui/forms/upload",
            parentKey: "forms",
          },
          {
            key: "form-editors",
            label: "Editors",
            url: "/ui/forms/editors",
            parentKey: "forms",
          },
        ],
      },
      {
        key: "tables",
        label: "Tables",
        isTitle: false,
        icon: "grid",
        parentKey: "components",
        children: [
          {
            key: "table-basic",
            label: "Basic Tables",
            url: "/ui/tables/basic",
            parentKey: "tables",
          },
          {
            key: "table-advanced",
            label: "Advanced Tables",
            url: "/ui/tables/advanced",
            parentKey: "tables",
          },
        ],
      }
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
    key: "apps",
    icon: "grid",
    label: "Apps",
    isTitle: true,
    children: [
      {
        key: "apps-crm",
        label: "Leads",
        url: "/apps/crm/leads",
        parentKey: "apps",
        isTitle: false,
        icon: "users",
      },
     
    ],
  },
  {
    key: "components",
    icon: "package",
    label: "Components",
    isTitle: true,
    children: [
      {
        key: "extended-ui",
        label: "Extended UI",
        isTitle: false,
        icon: "layers",
        badge: { variant: "info", text: "Hot" },
        parentKey: "components",
        children: [
          {
            key: "extended-ui-nestable",
            label: "Nestable List",
            url: "/extended-ui/nestable",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-dragdrop",
            label: "Drag and Drop",
            url: "/extended-ui/dragdrop",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-rangesliders",
            label: "Range Sliders",
            url: "/extended-ui/rangesliders",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-animation",
            label: "Animation",
            url: "/extended-ui/animation",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-sweet-alert",
            label: "Sweet Alert",
            url: "/extended-ui/sweet-alert",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-tour",
            label: "Tour Page",
            url: "/extended-ui/tour",
            parentKey: "extended-ui",
          },
          {
            key: "extended-ui-loading-buttons",
            label: "Loading Buttons",
            url: "/extended-ui/loading-buttons",
            parentKey: "extended-ui",
          },
        ],
      },
      {
        key: "forms",
        label: "Forms",
        isTitle: false,
        icon: "bookmark",
        parentKey: "components",
        children: [
          {
            key: "form-basic",
            label: "General Elements",
            url: "/ui/forms/basic",
            parentKey: "forms",
          },
          {
            key: "form-advanced",
            label: "Form Advanced",
            url: "/ui/forms/advanced",
            parentKey: "forms",
          },
          {
            key: "form-validation",
            label: "Validation",
            url: "/ui/forms/validation",
            parentKey: "forms",
          },
          {
            key: "form-wizard",
            label: "Wizard",
            url: "/ui/forms/wizard",
            parentKey: "forms",
          },
          {
            key: "form-upload",
            label: "File Uploads",
            url: "/ui/forms/upload",
            parentKey: "forms",
          },
          {
            key: "form-editors",
            label: "Editors",
            url: "/ui/forms/editors",
            parentKey: "forms",
          },
        ],
      },
      {
        key: "tables",
        label: "Tables",
        isTitle: false,
        icon: "grid",
        parentKey: "components",
        children: [
          {
            key: "table-basic",
            label: "Basic Tables",
            url: "/ui/tables/basic",
            parentKey: "tables",
          },
          {
            key: "table-advanced",
            label: "Advanced Tables",
            url: "/ui/tables/advanced",
            parentKey: "tables",
          },
        ],
      },
    
    ],
  },
];

export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
