import { Player } from '@lottiefiles/react-lottie-player';
import hr from '../../assets/json/hr.json';

const IntroLottie = () => {
  return (
    <div className="">
      <Player
        autoplay
        loop
        src={hr}
        style={{ height: '320px', width: '320px' }}
      />
    </div>
  );
};

export default IntroLottie;
