import {takeLatest, put, all} from 'redux-saga/effects';
import UserActionTypes from "./user.types";
import { auth, createUserProfileDocument, googleProvider } from "../../firebase/firebase.utils";
import { googleSignInFailure, googleSignInSuccess } from "./user.actions";

export function* signInWithGoogle() {
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        // eslint-disable-next-line no-undef
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(googleSignInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        yield put(googleSignInFailure(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* userSagas() {
    // eslint-disable-next-line no-undef
    yield all([call(onGoogleSignInStart)]);
}
