/* eslint-disable */
import {
  mdiAccountCircle,
  mdiDesktopMac,
  mdiReceipt,
  mdiCog,
  mdiMessage,
  mdiAccountGroup,
  mdiAccountBoxMultiple,
  mdiFlagCheckered,
  mdiCardAccountDetailsOutline,
  mdiPlaylistCheck,
  mdiViewListOutline,
  mdiLicense,
  mdiFormatTextWrappingClip,
  mdiFormatText,
  // mdiGithub,
  // // mdiLock,
  // mdiMonitorClean,
  // mdiSquareEditOutline,
  mdiTable,
  mdiText
  // mdiViewList,
  // mdiTelevisionGuide
} from "@mdi/js";

export default [
  "General",
  [
    {
      to: "/dashboard",
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
      icon: mdiMessage,
      updateMark: true
    },
    // {
    //   to: "/smsinput",
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
          to: "/admin",
          icon: mdiAccountGroup,
          label: "Admin"
        },
        {
          to: "/operator",
          icon: mdiAccountBoxMultiple,
          label: "Operator"
        },
        {
          to: "/country",
          icon: mdiFlagCheckered,
          label: "Country"
        },
        {
          to: "/senderID",
          icon: mdiCardAccountDetailsOutline,
          label: "Sender ID"
        },
        {
          to: "/whitelistContent",
          icon: mdiPlaylistCheck,
          label: "Whitelist Content"
        },
        {
          to: "/whitelistPhoneNumber",
          icon: mdiViewListOutline,
          label: "Whitelist Phone Number"
        },
        {
          to: "/prize",
          icon: mdiLicense,
          label: "Prize of SMS"
        },
        {
          to: "/prefix",
          icon: mdiFormatTextWrappingClip,
          label: "Prefix"
        },
        {
          to: "/keywordReguler",
          icon: mdiFormatText,
          label: "Keyword For Reguler"
        }
      ]
    },
    {
      to: "/client",
      label: "Clients",
      icon: mdiCog
    }
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
