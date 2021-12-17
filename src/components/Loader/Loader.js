import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import css from './loader.module.css';

const LoaderSpinner = () => {
  return (
    <div className={css.loaderThumb}>
      <Loader
        type="Grid"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </div>
  );
};
export { LoaderSpinner };
