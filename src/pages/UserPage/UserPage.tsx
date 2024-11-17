import BlogList from '@/components/BlogList/BlogList';
import styles from './UserPage.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Input from '@/components/Input/Input';
import { useDebounce } from '@/hooks/useDeobunce';
import Pagination from '@/components/Pagination/Pagination';
import { getPosts } from '@/services/postsServices';
import { getMe, updateMe, updatePassword } from '@/services/usersServices';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';

interface UserForm {
  name: string;
  old_password: string;
  new_password: string;
}

interface UpdatePasswordRequest {
  old_password: string;
  new_password: string;
}

const UserPage = () => {
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
    queryFn: () => getPosts(searchDebounced, limit, offset, tags, userData?.id),
  });

  const { register, handleSubmit, reset, formState } = useForm<UserForm>({
    mode: 'onTouched',
    defaultValues: {
      name: user?.name || '',
      old_password: '',
      new_password: '',
    },
  });

  const { errors } = formState;

  const changeNameMutation = useMutation({
    mutationFn: (newName: string) => updateMe(newName),
    onSuccess: () => {
      reset({ name: '', old_password: '', new_password: '' });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data: UpdatePasswordRequest) => updatePassword(data),
    onSuccess: () => {
      reset({ old_password: '', new_password: '' });
    },
  });

  const onSubmit: SubmitHandler<UserForm> = (data) => {
    if (data.name && data.name !== user?.name) {
      changeNameMutation.mutate(data.name);
    }
    if (data.old_password && data.new_password) {
      changePasswordMutation.mutate({
        old_password: data.old_password,
        new_password: data.new_password,
      });
    }
    console.log('user data', data);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.userForm}>
        <div className={styles.userBlock}>
          <div className={styles.userAvatar}>
            <img src="/avatar.png" alt="avatar" />
          </div>
          {user && (
            <div className={styles.userInputswrapper}>
              <div className={styles.userDataItem}>
                <Input
                  type="text"
                  placeholder="Username"
                  className={styles.inputContainer}
                  register={register('name', {
                    required: 'Name is required',
                  })}
                />
              </div>
              {errors.name && <p className={styles.inputError}>{errors.name.message}</p>}

              <div className={styles.userEmail}>
                <p>{user.email}</p>
              </div>

              <div className={styles.userDataItem}>
                <Input
                  type="password"
                  placeholder="Old Password"
                  className={styles.inputContainer}
                  eyeShown={true}
                  register={register('old_password', {
                    required: 'Old password is required',
                  })}
                />
              </div>
              {errors.old_password && (
                <p className={styles.inputError}>{errors.old_password.message}</p>
              )}

              <div className={styles.userDataItem}>
                <Input
                  type="password"
                  placeholder="New Password"
                  className={styles.inputContainer}
                  eyeShown={true}
                  register={register('new_password', {
                    required: 'New password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                />
              </div>
              {errors.new_password && (
                <p className={styles.inputError}>{errors.new_password.message}</p>
              )}

              <div className={styles.saveBtn}>
                <button type="submit">Save Changes</button>
              </div>
            </div>
          )}
        </div>
      </form>

      <div className={styles.blogsWrapper}>{posts && <BlogList blogs={posts.items} />}</div>
      <div className={styles.footer}>{posts && <Pagination count={posts.count} />}</div>
    </div>
  );
};

export default UserPage;
