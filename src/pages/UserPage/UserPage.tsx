import BlogList from '@/components/BlogList/BlogList';
import { useFetch } from '@/hooks/useFetch';
import { Author, Blog } from '@/types/blogs';
import styles from './UserPage.module.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import axios from 'axios';
import Input from '@/components/Input/Input';
import { getPostsUrl } from '../../utils/getPostsUrl';
import { useDebounce } from '@/hooks/useDeobunce';
import Pagination from '@/components/Pagination/Pagination';
import { getPosts } from '@/services/postsServices';
import { getMe } from '@/services/usersServices';

const UserPage = () => {
  const [newUserName, setNewUserName] = useState('');
  const [inputNameIsChanged, setInputNameIsChanged] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [posts, setPosts] = useState(null);

  const userData = useSelector((state: RootState) => state.auth.user);

  const token = localStorage.getItem('@token');

  const { limit, offset, tags } = useSelector((state: RootState) => state.posts);
  const searchValue = useSelector((state: RootState) => state.search.searchValue);

  const searchDebounced = useDebounce<string>(searchValue);

  const [user, setUser] = useState(null);

  useEffect(() => {
    getMe(token)
      .then((res) => setUser(res))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getPosts(searchDebounced, limit, offset, userData?.id)
      .then((res) => setPosts(res))
      .catch((error) => console.log(error));
  }, [offset, tags, searchDebounced]);

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
                  className={styles.inputContainer}
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
                <Input
                  className={styles.inputContainer}
                  value={oldPassword}
                  type="password"
                  placeholder="old password"
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                  eyeShown={true}
                />
              </li>
              <li className={styles.userDataItem}>
                <Input
                  className={styles.inputContainer}
                  value={newPassword}
                  type="password"
                  placeholder="new password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  eyeShown={true}
                  saveHandler={changePassword}
                  isValid={oldPassword.length >= 6 && newPassword.length >= 6}
                />
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className={styles.blogsWrapper}>{posts && <BlogList blogs={posts.items} />}</div>
      <div className={styles.footer}>{posts && <Pagination count={posts.count} />}</div>
    </div>
  );
};

export default UserPage;
