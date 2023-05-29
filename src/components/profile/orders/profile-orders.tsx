import React, { useEffect } from 'react';
import styles from './profile-orders.module.css';
import Orders from '../../orders/orders';
import { TFeed, WebsocketStatus } from '../../../services/types/data';
import { useDispatch, useSelector } from '../../../services/hooks';
import { profileFeedErrorSelector, profileFeedSelector, profileFeedStatusSelector } from '../../../services/profile-feed/selectors';
import { connect, disconnect } from '../../../services/profile-feed/actions';
import { getProfileFeedUrl } from '../../../utils/burger-api';

const ProfileOrders: React.FC = () => {
  const dispatch = useDispatch();

  const profileFeed = useSelector(profileFeedSelector);
  const profileFeedStatus = useSelector(profileFeedStatusSelector);
  const profileFeedError = useSelector(profileFeedErrorSelector);

  useEffect(
    () => {
      dispatch(connect(getProfileFeedUrl()));

      return () => {
        dispatch(disconnect());
      };
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <>
      {
        <div className={`${styles.form} mt-10 custom-scroll`} >
          {profileFeedStatus === WebsocketStatus.CONNECTING &&
            <p className="text text_type_main-default mb-10">Connecting...</p>
          }
          {profileFeedStatus === WebsocketStatus.OFFLINE &&
            <p className="text text_type_main-default mb-10">Offline.</p>
          }
          {profileFeedError &&
            <p className="text text_type_main-default mb-10">Произошла ошибка. {profileFeedError}</p>
          }
          {profileFeed &&
            profileFeedStatus === WebsocketStatus.ONLINE &&
            !profileFeedError &&
            profileFeed.orders?.length > 0 &&
            <Orders orders={profileFeed.orders} />
          }
        </div>
      }
    </>
  );
}

export default ProfileOrders;