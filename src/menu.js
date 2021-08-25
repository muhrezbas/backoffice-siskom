/* eslint-disable */
import {
  mdiAccountCircle,
  mdiDesktopMac,
  mdiReceipt,
  mdiCog,
  mdiAccountGroup,
  mdiAccountBoxMultiple,
  mdiFlagCheckered,
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
      to: "/admin/dashboard",
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
      to: "/admin/smsdetail",
      label: "SMS Detail",
      icon: mdiTable,
      updateMark: true
    },
    // {
    //   to: "/admin/smsinput",
    //   label: "SMS Input",
    //   icon: mdiTable,
    //   updateMark: true
    // },
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

    // {

    //   icon: mdiCog
    // },
    {
      label: "Settings",
      subLabel: "Submenus Example",
      icon: mdiCog,
      menu: [
        {
          to: "/admin/admin",
          icon: mdiAccountGroup,
          label: "Admin"
        },
        {
          to: "/admin/operator",
          icon: mdiAccountBoxMultiple,
          label: "Operator"
        },
        {
          to: "/admin/country",
          icon: mdiFlagCheckered,
          label: "Country"
        },
        {
          to: "/admin/senderID",
          icon: mdiFlagCheckered,
          label: "Sender ID"
        },
        {
          to: "/admin/whitelistContent",
          icon: mdiFlagCheckered,
          label: "Whitelist Content"
        },
        {
          to: "/admin/whitelistPhoneNumber",
          icon: mdiFlagCheckered,
          label: "Whitelist Phone Number"
        },
        {
          to: "/admin/prize",
          icon: mdiFlagCheckered,
          label: "Prize of SMS"
        },
        {
          to: "/admin/prefix",
          icon: mdiFlagCheckered,
          label: "Prefix"
        },
        {
          to: "/admin/keywordReguler",
          icon: mdiFlagCheckered,
          label: "Keyword For Reguler"
        }

      ]
    },
    {
      to: "/admin/client",
      label: "Clients",
      icon: mdiCog
    }
    // {
    //   to: "/admin/invoice",
    //   label: "Invoice",
    //   icon: mdiReceipt
    // },
    // {
    //   to: "/admin/detail",
    //   label: "Detail",
    //   icon: mdiCog
    // }
    // {
    //   to: '/login',
    //   label: 'Login',
    //   icon: mdiLock
    // },
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
