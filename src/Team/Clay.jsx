import React from 'react';
import Rodal from 'rodal';
// import '../About.css';

// include styles
import 'rodal/lib/rodal.css';

class Clay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  show() {
    this.setState({ visible: true });
    const audio = document.querySelector('.audioFavSong');
    this.props.clayFavSong && audio.load();
    this.props.clayFavSong && audio.play();
  }

  hide() {
    this.setState({ visible: false });
    const audio = document.querySelector('.audioFavSong');
    this.props.clayFavSong && audio.pause();
  }

  render() {

    const customStyles = {
      height: 'auto',
      bottom: 'auto',
      top: '30%',
      backgroundColor: '#61dafb',
      color: 'rgb(255,101,195)',
    };

    return (
      <div className='dev'>
        <div className="found" onClick={this.show.bind(this)}>
          {/* <button>show</button> */}
          <img className='profile-pic' src="/pianist.png" alt="Josh" />
          <div className='about-text'>
            <p>Name: Clayton</p>
            <p>Title: Software Engineer</p>
            <p>Genre: Sad Boy Music</p>
          </div>
        </div>

        <Rodal visible={this.state.visible} onClose={this.hide.bind(this)} width={550} height={250} customStyles={customStyles}>
          <div className='dev-name'>Clayton K</div>
          <div className='wrapper-music'>
            <img className='profile-pic' src="/pianist.png" alt="Clay" />
            <p>
              My name is Clayton. Try to make songs and records and stuff. Fav Artists: ELO, Grandaddy, Bill Callahan, Phil Elverum.{' '}
            </p>
            {this.props.clayFavSong && (
              <audio className="audioFavSong" src={this.props.clayFavSong}></audio>
            )}
          </div>
        </Rodal>
      </div>
    );
  }
}

export default Clay;
