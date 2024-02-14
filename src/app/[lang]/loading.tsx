import { PuffLoader } from 'react-spinners';

import styles from './loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loader}>
      <PuffLoader size={100} color='red' />
    </div>
  );
};

export default Loading;
