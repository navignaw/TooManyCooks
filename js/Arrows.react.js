var React = require('react');

var SoundEffects = require('./SoundEffects.js');

// Arrow keycodes
const KEYCODES = {
  l: 37,
  u: 38,
  r: 39,
  d: 40,
};

var Arrows = React.createClass({
  propTypes: {
    children: React.PropTypes.string.isRequired,
    onComplete: React.PropTypes.func.isRequired,
    onProgress: React.PropTypes.func,
  },

  getInitialState: function() {
    return {
      complete: false,
      progress: 0,
    };
  },

  componentDidMount: function() {
    window.addEventListener('keydown', this.onKeyDown);
  },

  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.onKeyDown);
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.onProgress && this.state.progress != prevState.progress) {
      this.props.onProgress(this.state.progress);
    }
  },

  onKeyDown: function(e) {
    if (this.state.complete) {
      return;
    }

    var keyCode = e.which || e.keyCode || 0;
    if (keyCode === KEYCODES[this.props.children.charAt(this.state.progress)]) {
      SoundEffects.playRandomClick();

      var newProgress = this.state.progress + 1;
      var complete = newProgress === this.props.children.length;
      this.setState({
        progress: newProgress,
        complete: complete,
      });

      if (complete && this.props.onComplete) {
        this.props.onComplete();
      }
    }
  },

  render: function() {
    function strToArrow(s) {
      return s.split('').map((c, i) => {
        switch (c) {
          case 'u':
            return <span key={i} className="padLeft10 glyphicon glyphicon-arrow-up" />;
          case 'd':
            return <span key={i} className="padLeft10 glyphicon glyphicon-arrow-down" />;
          case 'l':
            return <span key={i} className="padLeft10 glyphicon glyphicon-arrow-left" />;
          case 'r':
            return <span key={i} className="padLeft10 glyphicon glyphicon-arrow-right" />;
        }
      });
    }

    var prefix = this.props.children.substring(0, this.state.progress);
    var suffix = this.props.children.substring(this.state.progress);
    return (
      <div className="padTop center">
        <code>
          <span className="input">{strToArrow(prefix)}</span>
          <span>{strToArrow(suffix)}</span>
        </code>
      </div>
    );
  },
});

module.exports = Arrows;
