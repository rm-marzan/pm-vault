import React from "react";

const MenuContext = React.createContext();
const MenuItemProvider = MenuContext.Provider;
const MenuItemConsumer = MenuContext.Consumer;

export { MenuItemProvider, MenuItemConsumer };