class SignIn extends React.Component {
  static defaultProps = {
    authData: {},
    authState: 'signIn',
    onAuthStateChange: (next, data) => { console.log(`SignIn:onAuthStateChange(${next}, ${JSON.stringify(data, null, 2)})`); }
  };

  constructor(props) {
    super(props);
    this.state = {
      authData: this.props.authData,
      authState: this.props.authState,
      modalShowing: false,
      loading: false,
      error: null,
      username: this.props.authData.username || '',
      password: this.props.authData.password || '',
      user: null
    };
  }

  async onSignIn() {
    this.setState({ loading: true });
    try {
      const data = await Auth.signIn(this.state.username, this.state.password);
      console.log(`onSignIn::Response#1: ${JSON.stringify(data, null, 2)}`);
      if (data.signInUserSession === null) {
        this.setState({ user: data, loading: false, modalShowing: true });
      } else {
        this.props.onAuthStateChange('authenticated', data);
      }
    } catch (err) {
      console.log(`Error: ${JSON.stringify(err, null, 2)}`);
      this.setState({ error: err.message, loading: false });
    }
  }

  async onConfirmSignin(token) {
    this.setState({ loading: true });
    try {
      console.log(`onConfirmSignIn:: ${this.state.username}, ${token}`);
      const data = await Auth.confirmSignIn(this.state.user, token);
      console.log(`onConfirmSignIn::Response#2: ${JSON.stringify(data, null, 2)}`);
      const profile = await Auth.currentUser();
      this.props.onAuthStateChange('authenticated', profile);
    } catch (err) {
      console.log('Error: ', err);
      this.setState({ error: err.message, loading: false, modalShowing: false });
    }
  }
