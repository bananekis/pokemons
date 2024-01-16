import { FC } from 'react';

type Props = React.ComponentProps<'svg'>;

const IconHeart: FC<Props> = (props) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 24 25"
      fill={'none'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.5791 4.30057L12 4.95697L12.4209 4.30057C12.6408 3.95769 12.8943 3.63278 13.1854 3.33148C15.5451 0.889508 19.3637 0.889508 21.7233 3.33148C24.0922 5.78308 24.0922 9.76506 21.7233 12.2167L11.9989 22.2804L2.27673 12.2167L2.27669 12.2167C-0.0922316 9.76506 -0.0922316 5.78308 2.27669 3.33148C4.63631 0.889507 8.45494 0.889508 10.8146 3.33148C11.1047 3.63169 11.3593 3.95774 11.5791 4.30057Z"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default IconHeart;
