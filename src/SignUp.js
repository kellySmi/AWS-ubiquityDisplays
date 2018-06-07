class SignUp extends React.Component {
  static defaultProps = {
    authData: {},
    authState: 'signUp',
    onAuthStateChange: (next, data) => { console.log(`SignUp:onAuthStateChange(${next}, ${JSON.stringify(data, null, 2)})`); }
  };

  constructor(props) {
    super(props);
    this.state = {
      authData: this.props.authData,
      authState: this.props.authState,
      modalShowing: false,
      error: null,
      loading: false,
      username: '',
      emailaddress: '',
      phone: '',
      password: ''
    };
  }

  async onSignUp() {
    try {
      this.setState({ loading: true });
      const response = await Auth.signUp({
        username: this.state.username,
        password: this.state.password,
        attributes: {
          email: this.state.emailaddress,
          phone_number: this.state.phone
        }
      });
      console.log(`SignUp::onSignUp(): Response#1 = ${JSON.stringify(response, null, 2)}`);
      if (response.userConfirmed === false) {
        this.setState({ authData: response, modalShowing: true, loading: false });
      } else {
        this.onAuthStateChange('default', { username: response.username });
      }
    } catch (err) {
      console.log(`SignUp::onSignUp(): Error ${JSON.stringify(err, null, 2)}`);
      this.setState({ error: err.message, loading: false });
    }
  }

  async onConfirmSubmitted(token) {
    try {
      this.setState({ loading: true });
      const response = await Auth.confirmSignUp(this.state.username, token);
      console.log(`SignUp::onConfirmSubmitted(): Response#2 = ${JSON.stringify(response, null, 2)}`);
      this.setState({ loading: false });
      if (response === 'SUCCESS') {
        this.props.onAuthStateChange('default', { username: this.state.username });
      }
    } catch (err) {
      console.log(`SignUp::onConfirmSubmitted(): Error ${JSON.stringify(err, null, 2)}`);
      this.setState({ error: err.message, loading: false });
    }
  }
  render() {
  let settings = {
    // Fill in props for individual components here
  };

  const errorComponent = this.state.error !== null
    ? {this.state.error}
    : false;

  return (
      <Wrapper>
        {this.state.error !== null && errorComponent}
        <View style={styles.signUpForm}>
          <View style={styles.formContainer}>
            <IconTextInput {...settings.usernameInput}/>
            <IconTextInput {...settings.emailInput}/>
            <IconTextInput {...settings.phoneInput}/>
            <IconTextInput {...settings.passwordInput}/>
            <View style={styles.submissionContainer}>
              <Button {...(this.state.loading ? settings.submitButtonLoading : settings.submitButton)}/>
            </View>
          </View>
        </View>
        <View style={styles.flexGrow}/>
        <View style={styles.buttonsContainer}>
          <Button {...settings.cancelButton}/>
        </View>
        <ModalTokenInput {...settings.confirmPrompt}/>
      </Wrapper>
    );
  }
}
