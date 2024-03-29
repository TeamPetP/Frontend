import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import { useStores } from "../hooks/useStores";
import { observer } from "mobx-react";
import CreatePetpGramModal from "./CreatePetpGramModal";
import EditProfileModal from "./EditProfile";
import EditPetpGramModal from "./EditPetpGramModal";
import CreatePetMeetingBoardModal from "./CreatePetMeetingBoardModal";
import ViewPetMeetingGalleryModal from "./ViewPetMeetingGalleryModal";
import EditPetMeetingModal from "./EditPetMeetingModal";

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
			<EditPetpGramModal
				visibility={modalStore.getEditPetpGramState}
				EditPetpGramModalState={() => {
					modalStore.editPetpGramState = false;
				}}
			></EditPetpGramModal>
			<EditPetMeetingModal
				visibility={modalStore.getEditPetMeetingBoardState}
				EditPetMeetingModalState={() => {
					modalStore.editPetMeetingBoardState = false;
				}}
			></EditPetMeetingModal>
			<EditProfileModal
				visibility={modalStore.getEditProfile}
				EditProfileModalState={() => {
					modalStore.editProfile = false;
				}}
			></EditProfileModal>
			<CreatePetMeetingBoardModal
				visibility={modalStore.getCreatePetMeetingBoardState}
				meetingId={modalStore.getPetMeetingIdState}
				CreatePetMeetingBoardModalState={() => {
					modalStore.createPetMeetingBoardState = false;
				}}
			></CreatePetMeetingBoardModal>
			<ViewPetMeetingGalleryModal
				visibility={modalStore.getViewPetMeetingGalleryState}
				imgUrl={modalStore.getPetMeetingImgUrl}
				ViewPetMeetingGalleryModalState={() => {
					modalStore.viewPetMeetingGalleryState = false;
				}}
			></ViewPetMeetingGalleryModal>
		</>
	);
});
export default Modal;
