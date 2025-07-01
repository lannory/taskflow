import styles from './UserInfo.module.scss';
import SmallTitle from '../../SmallTitle/SmallTitle';
import React from "react"
import { Dropdown } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/Auth/AuthSlice';

export default function UserInfo() {

    const dispatch = useDispatch();

    const items = [
        {
            label: (
                <button onClick={() => dispatch(logout())}><i className="fa-solid fa-arrow-right-to-bracket"></i> logout</button>
            ),
            key: 'logout',
        },
    ];

    return (
        <div className={styles.userInfo}>
            <div className={styles.userInfoLeft}>
                <SmallTitle text='Hi There!' />
                <h6 className={styles.userInfoSubtitle}>Let's finish your task today!</h6>
            </div>
            <div className={styles.userInfoRight}>
                {/* <span className={styles.headerAlert}><i className="fa-regular fa-bell"></i></span> */}
                <Dropdown menu={{ items }} trigger={['click']}>
                    <img className={styles.userPhoto} src="/team/default-user.jpg" alt="User photo" />
                </Dropdown>

            </div>
        </div>
    )
}