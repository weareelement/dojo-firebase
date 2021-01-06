import { assignClick } from './utilities';
import { googleSignin, googleSignout } from './firebase/firebaseAuthentication';
import { handleOnAuthStateChange } from './firebase/handleAuthStateChange';

assignClick('signin-google', googleSignin);
assignClick('signout-google', googleSignout);

handleOnAuthStateChange();