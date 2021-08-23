/* eslint-disable */
import {
  mdiAccountCircle,
  mdiDesktopMac,
  mdiReceipt,
  mdiCog,
  // mdiGithub,
  // // mdiLock,
  // mdiMonitorClean,
  // mdiSquareEditOutline,
  mdiTable
  // mdiViewList,
  // mdiTelevisionGuide
} from "@mdi/js";

export default [
  "General",
  [
    {
      to: "/",
      icon: mdiDesktopMac,
      label: "Dashboard"
    },
    // {
    //   to: '/tables',
    //   label: 'Tables',
    //   icon: mdiTable,
    //   updateMark: true
    // },
    {
      to: "/smsdetail",
      label: "SMS Detail",
      icon: mdiTable,
      updateMark: true
    },
    {
      to: "/smsinput",
      label: "SMS Input",
      icon: mdiTable,
      updateMark: true
    },
    // {
    //   to: '/forms',
    //   label: 'Forms',
    //   icon: mdiSquareEditOutline
    // },
    // {
    //   to: '/ui',
    //   label: 'UI',
    //   icon: mdiTelevisionGuide
    // },

    {
      to: "/setting",
      label: "Settings",
      icon: mdiCog
    },
    {
      to: "/client",
      label: "Clients",
      icon: mdiCog
    },
    // {
    //   to: "/invoice",
    //   label: "Invoice",
    //   icon: mdiReceipt
    // },
    // {
    //   to: "/detail",
    //   label: "Detail",
    //   icon: mdiCog
    // }
    // {
    //   to: '/login',
    //   label: 'Login',
    //   icon: mdiLock
    // },
    // {
    //   label: 'Submenus',
    //   subLabel: 'Submenus Example',
    //   icon: mdiViewList,
    //   menu: [
    //     {
    //       label: 'Sub-item One'
    //     },
    //     {
    //       label: 'Sub-item Two'
    //     }
    //   ]
    // }
  ]
  // 'About',
  // [
  //   {
  //     href: 'https://tailwind-vue.justboil.me/',
  //     label: 'Premium version',
  //     icon: mdiMonitorClean
  //   },
  //   {
  //     href: 'https://github.com/justboil/admin-one-vue-tailwind',
  //     label: 'GitHub',
  //     icon: mdiGithub
  //   }
  // ]
];
