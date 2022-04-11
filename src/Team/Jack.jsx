import React from 'react';
import Rodal from 'rodal';
// import '../About.css';

// include styles
import 'rodal/lib/rodal.css';

// maybe i'm not looking close enough, but it seems like these 4 componented could have been abstracted into a TeamMember component that took props and you mapped over some JSON to fill in the blanks?
class Jack extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  show() {
    this.setState({ visible: true });
    const audio = document.querySelector('.audioFavSong1');
    this.props.jackFavSong && audio.load();
    this.props.jackFavSong && audio.play();
  }

  hide() {
    this.setState({ visible: false });
    const audio = document.querySelector('.audioFavSong1');
    this.props.jackFavSong && audio.pause();
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
          <img className='profile-pic' src="/anubis.svg" alt="Josh" />
          <div className='about-text'>
            <p>Name: Cadillac Jack</p>
            <p>Title: Software Engineer</p>
            <p>Genre: Classic Rock</p>
          </div>
        </div>

        <Rodal visible={this.state.visible} onClose={this.hide.bind(this)} width={550} height={250} customStyles={customStyles}>
          <div className='dev-name'>Cadillac Jack</div>
          <div className='wrapper-music'>
            <img className='profile-pic' src="/anubis.svg" alt="Clay" />
            <p>
            My name is Cadillac Jack. I am an aspiring software developer with goals of opening community recording studios. I have loved music since I was a kid and my mother introduced me to Jimi Hendrix and Led Zeppelin. I play a little guitar, but mainly just noodle around to relax.{' '}
            </p>
            {this.props.jackFavSong && (
              <audio className="audioFavSong1" src={this.props.jackFavSong}></audio>
            )}
          </div>
        </Rodal>
      </div>
    );
  }
}

export default Jack;
