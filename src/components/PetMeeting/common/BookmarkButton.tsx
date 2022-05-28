import styled from 'styled-components';
import bookmark from '../../../assets/images/bookmark.png';
import bookmark_active from '../../../assets/images/bookmark_active.png';

interface ITest {
	isBookmark: boolean;
}

const BookmarkButton = ({ isBookmark }: ITest) => {
	return <Bookmark isBookmark={isBookmark} />;
};

export default BookmarkButton;

const Bookmark = styled.button<{ isBookmark: boolean }>`
	width: 28px;
	height: 22px;
	background: url(${(props) => (props.isBookmark ? bookmark_active : bookmark)})
		no-repeat center center / cover;
`;
