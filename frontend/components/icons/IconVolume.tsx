import { FC } from 'react';

type Props = React.ComponentProps<'svg'>;

const IconVolume: FC<Props> = (props) => (
  <svg id="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="#71c1a1" {...props}>
    <defs>
      <style>{`.cls-1{fill:#71c1a1;}.cls-2{fill:none;}`}</style>
    </defs>
    <title>volume--up</title>
    <path d="M27.16,8.08,25.63,9.37a10,10,0,0,1-.29,13.23L26.81,24a12,12,0,0,0,.35-15.88Z" />
    <path d="M21.58,12a6,6,0,0,1-.18,7.94l1.47,1.36a8,8,0,0,0,.23-10.59Z" />
    <path
      className="cls-1"
      d="M18,30a1,1,0,0,1-.71-.3L9.67,22H3a1,1,0,0,1-1-1H2V11a1,1,0,0,1,1-1H9.67l7.62-7.7a1,1,0,0,1,1.41,0A1,1,0,0,1,19,3V29A1,1,0,0,1,18,30ZM4,20h6.08a1,1,0,0,1,.71.3L17,26.57V5.43L10.79,11.7a1,1,0,0,1-.71.3H4Z"
    />
    <rect
      id="_Transparent_Rectangle_"
      data-name="&lt;Transparent Rectangle&gt;"
      className="cls-2"
      width="32"
      height="32"
    />
  </svg>
);

export default IconVolume;
