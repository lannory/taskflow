import styles from './UserInfo.module.scss';
import SmallTitle from '../../SmallTitle/SmallTitle';
import userPhoto from '../../../../src/assets/userPhoto.png';
import React from "react"

export default function UserInfo() {
    return (
        <div className={styles.userInfo}>
            <div className={styles.userInfoLeft}>
                <SmallTitle text='Surya Prakash' />
                <h6 className={styles.userInfoSubtitle}>Let's finish your task today!</h6>
            </div>
            <div className={styles.userInfoRight}>
                {/* <span className={styles.headerAlert}><i className="fa-regular fa-bell"></i></span> */}
                <img className={styles.userPhoto} src={userPhoto} alt="User photo" />
            </div>
        </div>
    )
}