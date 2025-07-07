import React from "react";
import styles from "./Sidebar.module.scss";
import SidebarItem from "../SidebarItem/SidebarItem";
import logo from "../../assets/Hillel-Logo.png";
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const {t} = useTranslation();

    const menuItems = [
        { icon: "fa-solid fa-table-cells-large", label: t("sidebar.overview"), link: '/', },
        { icon: "fa-solid fa-folder", label: t("sidebar.projects"), link: '/allprojects', },
        { icon: "fa-solid fa-book-open", label: t("sidebar.tasks"), link: '/alltasks', },
        { icon: "fa-solid fa-user", label: t("sidebar.yourTeam"), link: '/team', },
        { icon: "fa-solid fa-gear", label: t("sidebar.settings"), link: '/settings', },
    ];


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
                        active={location.pathname === item.link}
                        onClick={() => {
                            navigate(item.link)
                        }}
                    />
                ))}
            </nav>
        </aside>
    )
};
