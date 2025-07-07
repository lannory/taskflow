import React from "react"
import { useDispatch } from 'react-redux';
import { Dropdown } from 'antd';
import SmallTitle from '../../SmallTitle/SmallTitle';
import { logout } from '../../../store/Auth/AuthSlice';

import { useTranslation } from 'react-i18next';


export default function UserInfo() {
    const { t } = useTranslation();


    const dispatch = useDispatch();

    const items = [
        {
            label: (
                <button onClick={() => dispatch(logout())}><i className="fa-solid fa-arrow-right-to-bracket"></i> {t("header.logout")}</button>
            ),
            key: 'logout',
        },
    ];

    return (
        <div className={styles.userInfo}>
            <div className={styles.userInfoLeft}>
                <SmallTitle text={t('header.greeting')} />
                <h6 className={styles.userInfoSubtitle}>{t('header.taskReminder')}</h6>
            </div>
            <div className={styles.userInfoRight}>
                {/* <span className={styles.headerAlert}><i className="fa-regular fa-bell"></i></span> */}
                <Dropdown menu={{ items }} trigger={['click']}>
                    <img className={styles.userPhoto} src="/team/default-user.jpg" alt="User photo" />
                </Dropdown>

            </div>
        </div>
    )
>>>>>>> origin
}