import React from 'react';
import Rodal from 'rodal';
// import '../About.css';

// include styles
import 'rodal/lib/rodal.css';

class Jack extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  show() {
    this.setState({ visible: true });
    const audio = document.querySelector('#audioFavSong');
    this.props.joshFavSong && audio.load();
    this.props.joshFavSong && audio.play();
  }

  hide() {
    this.setState({ visible: false });
    const audio = document.querySelector('#audioFavSong');
    this.props.joshFavSong && audio.pause();
  }

  render() {
    return (
      <div>
        <div className="found" onClick={this.show.bind(this)}>
          {/* <button>show</button> */}
          <img src="https://placebear.com/200/200" alt="Josh" />
          <div>
            <p>Name: Jack K</p>
            <p>Title: Software Engineer</p>
            <p>Genre: Classic Rock</p>
          </div>
        </div>

        <Rodal visible={this.state.visible} onClose={this.hide.bind(this)} width={550} height={250}>
          <div>Jack K</div>
          <div className='wrapper-music'>
            <img src="https://placebear.com/200/100" alt="Clay" />
            <p>
              My name is Jack. I ...{' '}
            </p>
            {this.props.joshFavSong && (
              <audio id="audioFavSong" src={this.props.joshFavSong}></audio>
            )}
          </div>
        </Rodal>
      </div>
    );
  }
}

export default Jack;
