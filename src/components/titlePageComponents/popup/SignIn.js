import styles from './styles.module.scss';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeSignInPopup, openSignUpPopup, openSignInPopup, loginToHomepage } from "../actions/index.js";
import { FaHubspot } from "react-icons/fa"
import { Component } from "react";

class SignIn extends Component {
   state = {
      emailValue: "",
      emailMsg: "",
      email: false,
      passwordValue: "",
      passMsg: "",
      password: false,
   }

   changeEmailValue = (e) => {
      if(e.target.value === "") {
         this.setState({
            emailMsg: "Wrong Email",
            emailValue: "",
            email: false,
         }) 
      } else {
         this.setState({
            emailValue: e.target.value,
            emailMsg: "",
            email: true,
         })
      }
   }

   changePasswordValue = (e) => {
      if(e.target.value === "") {
         this.setState({
            passwordValue: "",
            passMsg: "Wrong password",
            password: false,
         })
      } else {
        this.setState({
           passwordValue: e.target.value,
           passMsg: "",
           password: true,
        })
     }
   }

   handleSignInSubmit = (e) => {
      e.preventDefault();
      if (this.state.email && this.state.password) {
         this.props.loginToHomepage(this.state.emailValue, this.state.passwordValue)
      } else {
         this.setState({
            passMsg: "Wrong Email or Password",
            emailMsg: "",
         })
         this.props.openSignInPopup()
      }
   }

   render() {
    return(
      <div className={styles.login}>
      <div className={styles.signUpContainerHeader}>
         <span onClick={ this.props.closeSignInPopup }>X</span>
      </div>
      <div className={styles.loginWrapper}>
          <div className={styles.loginLeft} 
          style={{backgroundImage: `url(/gif/logo.gif)`}}>
              <h3 className={styles.loginLogo}><FaHubspot /> TalentHouse</h3>
              <span className={styles.loginDesc}>
              Connect talented people around the world with the on-demand creative community
              </span>
          </div>
         <div className={styles.loginRight}>
           <form className={styles.loginBox} 
           onSubmit={ this.handleSignInSubmit }>
              <input type="text" placeholder="Email" 
              onChange={ this.changeEmailValue } 
              value={ this.state.emailValue }
              className={styles.loginInput}></input>
                 <p>{ this.state.emailMsg }</p>
              <input type="password" placeholder="Password" 
              onChange={ this.changePasswordValue} 
              value={ this.state.passwordValue }
              className={styles.loginInput}></input>
                 <p>{ this.state.passMsg }</p>
              <button className={styles.loginButton}>Sign In</button>
           </form>
           <div className={styles.signUpContainerFooter}>
               <p onClick={ this.props.openSignUpPopup }>Don't have an account yet? Sign Up</p>
           </div>
       </div>
      </div>
   </div>
    )
   }
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators(
    {
       closeSignInPopup,
       openSignUpPopup,
       openSignInPopup,
       loginToHomepage,
    },
       dispatch,
    )    
}

export default connect(null, mapDispatchToProps)(SignIn);