import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import { useStores } from "../hooks/useStores";
import { observer } from "mobx-react";
import CreatePetpGramModal from "./CreatePetpGramModal";
import EditProfileModal from "./EditProfile";

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
			<CreatePetpGramModal
				visibility={modalStore.getCreatePetpGramState}
				CreatePetpGramModalState={() => {
					modalStore.createPetpGramState = false;
				}}
			></CreatePetpGramModal>
			<EditProfileModal
				visibility={modalStore.getEditProfile}
				EditProfileModalState={() => {
					modalStore.editProfile = false;
				}}
			></EditProfileModal>
		</>
	);
});
export default Modal;
