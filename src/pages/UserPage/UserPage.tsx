import BlogList from '@/components/BlogList';
import { useFetch } from '@/components/useFetch';
import { Author, Blog } from '@/types/blogs';
import styles from './UserPage.module.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

const UserPage = () => {
  const [newUserName, setNewUserName] = useState('');
  const [inputNameIsChanged, setInputNameIsChanged] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [newPasswordIsShown, setNewPasswordIsShown] = useState(false);
  const [oldPasswordIsShown, setOldPasswordIsShown] = useState(false);

  const userData = useSelector((state: RootState) => state.auth.user);

  const token = localStorage.getItem('@token');

  const { data: user } = useFetch<Author>('http://localhost:8001/api/users/me');
  const { data } = useFetch<{ count: number; items: Blog[] }>(
    `http://localhost:8001/api/posts/?author_id=${userData?.id}`,
  );

  const changeUserName = () => {
    axios
      .patch(
        'http://localhost:8001/api/users/me',
        {
          name: newUserName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        setInputNameIsChanged(false);
      })
      .catch((error) => console.log(error));
  };

  const changePassword = () => {
    axios
      .post(
        'http://localhost:8001/api/users/me/password',
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        setOldPassword('');
        setNewPassword('');
      })
      .catch((error) => console.log(error));
  };

  const showOldPassword = () => {
    setOldPasswordIsShown(!oldPasswordIsShown);
  };
  const showNewPassword = () => {
    setNewPasswordIsShown(!oldPasswordIsShown);
  };

  return (
    <div className={styles.container}>
      <div className={styles.userBlock}>
        <div className={styles.userAvatar}>
          <img src="../../../public/avatar.png" alt="avatar" />
        </div>
        <div>
          {user && (
            <ul className={styles.userData}>
              <li className={styles.userDataItem}>
                <input
                  type="text"
                  placeholder={user.name}
                  onChange={(e) => {
                    setNewUserName(e.target.value);
                    {
                      e.target.value.length >= 1
                        ? setInputNameIsChanged(true)
                        : setInputNameIsChanged(false);
                    }
                  }}
                />
                {inputNameIsChanged && <button onClick={() => changeUserName()}>Save</button>}
              </li>
              <li className={styles.userDataItem}>
                <p>{user.email}</p>
              </li>
              <li className={styles.userDataItem}>
                <input
                  value={oldPassword}
                  type={oldPasswordIsShown ? 'text' : 'password'}
                  placeholder="old password"
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                />
                {oldPasswordIsShown ? (
                  <EyeOff className={styles.eye} onClick={() => showOldPassword()} />
                ) : (
                  <Eye className={styles.eye} onClick={() => showOldPassword()} />
                )}
              </li>
              <li className={styles.userDataItem}>
                <input
                  value={newPassword}
                  type={newPasswordIsShown ? 'text' : 'password'}
                  placeholder="new password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
                {oldPassword.length >= 6 && newPassword.length >= 6 ? (
                  <button onClick={() => changePassword()}>Save</button>
                ) : (
                  ''
                )}
                {newPasswordIsShown ? (
                  <EyeOff className={styles.eye} onClick={() => showNewPassword()} />
                ) : (
                  <Eye className={styles.eye} onClick={() => showNewPassword()} />
                )}
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className={styles.blogsWrapper}>{data && <BlogList blogs={data.items} />}</div>
    </div>
  );
};

export default UserPage;
