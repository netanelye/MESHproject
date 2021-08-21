import React from 'react'

const routes = [
    {
      label: "ראשי",
      path: "/",
      icon: DashboardIcon,
      activeIcon: DashboardIconActive,
      component: Dashboard,
    },
    {
      label: "איזור אישי",
      path: "/personal",
      icon: AccountsIcon,
      activeIcon: AccountsIconActive,
      component: Accounts,
    },
    {
      label: "favorites",
      path: "/transactions",
      icon: TransactionsIcon,
      activeIcon: TransactionsIconActive,
      component: Transactions,
    },
    {
      label: "Secure",
      path: "/secure",
      icon: SecureIcon,
      activeIcon: SecureIconActive,
      component: Secure,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: SettingsIcon,
      activeIcon: SettingsIconActive,
      component: Settings,
    },
    {
      label: "Sign Out",
      path: "/sign-out",
      icon: SignOutIcon,
      activeIcon: SignOutIcon,
    },
  ];
  
  export default routes;