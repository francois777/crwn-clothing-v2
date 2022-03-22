import './sign-in.styles.scss'
import { signInWithGooglePopup,
         createUserDocument
} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {

  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocument(user)
  }

  return (
    <div className="signin-page-container">
      <div className="signin-form-container">
        <h1>Sign In Page</h1>
        <button type="button" onClick={logGoogleUser}>
          Sign in with Google Popup
        </button>
      </div>
      <div className="signup-form-container">
        <SignUpForm />
      </div>
    </div>
  )
}

export default SignIn
