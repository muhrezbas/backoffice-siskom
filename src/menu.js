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
      icon: mdiMessage,
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 573d8b4f1b0747af3b21ee0e04d29797112a5ec5
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
