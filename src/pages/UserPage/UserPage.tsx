import BlogList from '@/components/BlogList/BlogList';
import styles from './UserPage.module.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Input from '@/components/Input/Input';
import { useDebounce } from '@/hooks/useDeobunce';
import Pagination from '@/components/Pagination/Pagination';
import { getPosts } from '@/services/postsServices';
import { getMe, updateMe, updatePassword } from '@/services/usersServices';
import { useMutation, useQuery } from '@tanstack/react-query';

const UserPage = () => {
  const [newUserName, setNewUserName] = useState('');
  const [inputNameIsChanged, setInputNameIsChanged] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const userData = useSelector((state: RootState) => state.auth.user);

  const { limit, offset, tags } = useSelector((state: RootState) => state.posts);
  const searchValue = useSelector((state: RootState) => state.search.searchValue);
  const searchDebounced = useDebounce<string>(searchValue);

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getMe(),
  });

  const { data: posts } = useQuery({
    queryKey: ['post', offset, tags, searchDebounced],
    queryFn: () => getPosts(searchDebounced, limit, offset, userData?.id),
  });

  const changeNameMutation = useMutation({
    mutationFn: () => updateMe(newUserName),
    onSuccess: () => {
      setInputNameIsChanged(false);
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: () => updatePassword(oldPassword, newPassword),
    onSuccess: () => {
      setOldPassword('');
      setNewPassword('');
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.userBlock}>
        <div className={styles.userAvatar}>
          <img src="/avatar.png" alt="avatar" />
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
                {inputNameIsChanged && (
                  <button onClick={() => changeNameMutation.mutate()}>Save</button>
                )}
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
                  saveHandler={() => {
                    changePasswordMutation.mutate();
                  }}
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
