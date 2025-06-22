import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import SidebarItem from "../SidebarItem/SidebarItem";
import logo from "../../assets/Hillel-Logo.png";

const menuItems = [
    { icon: "fa-solid fa-table-cells-large", label: "Overview" },
    { icon: "fa-solid fa-folder", label: "Projects" },
    { icon: "fa-solid fa-book-open", label: "Tasks" },
    { icon: "fa-solid fa-user", label: "Your Team" },
    { icon: "fa-solid fa-gear", label: "Settings" },
];

export default function Sidebar() {
    const [activeItem, setActiveItem] = useState("Overview");

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
            <img src={logo} alt="Logo" className={styles.logoImage} />
            </div>

            <nav className={styles.menu}>
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        active={item.label === activeItem}
                        onClick={() => setActiveItem(item.label)}
                    />
                ))}
            </nav>
        </aside>
    )
};
