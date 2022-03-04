import React from 'react';
import Rodal from 'rodal';
// import '../About.css';

// include styles
import 'rodal/lib/rodal.css';

class Josh extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  show() {
    this.setState({ visible: true });
    const audio = document.querySelector('#audioFavSong');
    // this.props.joshFavSong && audio.load();
    this.props.joshFavSong && audio.play();
  }

  hide() {
    this.setState({ visible: false });
    const audio = document.querySelector('#audioFavSong');
    this.props.joshFavSong && audio.pause();
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
          <img className='profile-pic' src="/cloaked-figure-on-horseback.svg" alt="Josh" />
          <div className='about-text'>
            <p>Name: Joshua Williams</p>
            <p>Title: Software Engineer</p>
            <p>Genre: Gospel</p>
          </div>
        </div>

        <Rodal visible={this.state.visible} onClose={this.hide.bind(this)} width={550} height={250} customStyles={customStyles}>
          <div className='dev-name'>Josh Williams</div>
          <div className='wrapper-music'>
            <img className='profile-pic' src="/cloaked-figure-on-horseback.svg" alt="Josh" />
            <p>
              My name is Josh, software engineer by day and gospel artist by night. Grew up playing
              the guitar. Played in band from a young age, and decided to stick with it. When I am
              not singing, I often do enjoy watching the rain mixed in with the classics.{' '}
            </p>
            {this.props.joshFavSong ? (
              <audio id="audioFavSong" src={this.props.joshFavSong}></audio>
            ) : null }
          </div>
        </Rodal>
      </div>
    );
  }
}

export default Josh;
