import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import { useStores } from "../hooks/useStores";
import { observer } from "mobx-react";

const Modal = observer(() => {
	const { modalStore } = useStores();

	return (
		<>
			<SignInModal
				visibility={modalStore.getSignInState}
				SignInModalState={() => {
					modalStore.signInState = false;
				}}
			></SignInModal>
			<SignUpModal
				visibility={modalStore.getSignUpState}
				SignInModalState={() => {
					modalStore.signUpState = false;
				}}
			></SignUpModal>
		</>
	);
});
export default Modal;
