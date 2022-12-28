import { useDeleteReview } from 'climbingweb/src/hooks/queries/center/queryKey';
import { useToast } from 'climbingweb/src/hooks/useToast';
import { useState } from 'react';
import { ProfileImage } from '../common/profileImage/ProfileImage';
import { StarRating } from '../common/StarRating';

interface ReviewCommentProps {
  reviewId: string;
  centerId: string;
  content: string;
  createdAt: string;
  rank: number;
  reviewerNickname: string;
  reviewerProfileImage: string;
  updatedAt: string;
}

export const ReviewComment = ({
  content,
  createdAt,
  rank,
  reviewerNickname,
  reviewerProfileImage,
  updatedAt,
}: ReviewCommentProps) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="flex flex-row py-2 pr-1 gap-2 w-full">
      <ProfileImage src={reviewerProfileImage} />
      <div className="w-full gap-2">
        <div className="h-10 flex flex-row justify-between items-center ">
          <div>
            <p className="text-sm font-bold">{reviewerNickname}</p>
            <span className="text-gray-400 text-sm">
              {updatedAt ? updatedAt : createdAt}{' '}
            </span>
          </div>
          <StarRating readOnly size="sm" count={5} initialValue={rank} />
        </div>
        <div className="">
          <p className={`text-sm ${readMore ? '' : 'line-clamp-3'}`}>
            {content}
          </p>
          <span
            className="text-gray-400 inline float-right text-sm"
            onTouchEnd={() => setReadMore(!readMore)}
          >
            {readMore ? '접기' : '더보기'}
          </span>
        </div>
      </div>
    </div>
  );
};

export const MyReviewComment = ({
  reviewId,
  centerId,
  content,
  createdAt,
  rank,
  reviewerNickname,
  reviewerProfileImage,
  updatedAt,
}: ReviewCommentProps) => {
  const [readMore, setReadMore] = useState(false);

  const { toast } = useToast();

  const { mutate: deleteReview } = useDeleteReview(centerId, reviewId);

  const handleModifyReviewClick = () => {
    console.log('수정');
  };

  const handleDeleteReviewClick = () => {
    deleteReview();
    toast('리뷰가 삭제되었습니다.');
  };

  return (
    <div className="flex flex-row py-2 pr-1 gap-2 w-full">
      <ProfileImage src={reviewerProfileImage} size={30} />
      <div className="w-full gap-2">
        <div className="h-10 flex flex-row justify-between items-center ">
          <div>
            <p className="text-sm font-bold">{reviewerNickname}</p>
            <span className="text-gray-400 text-sm">
              {updatedAt ? updatedAt : createdAt}{' '}
            </span>

            <span
              className="text-blue-500 text-sm"
              onClick={handleModifyReviewClick}
            >
              ·수정
            </span>
            <span
              className="text-blue-500 text-sm"
              onClick={handleDeleteReviewClick}
            >
              ·삭제
            </span>
          </div>
          <StarRating readOnly size="sm" count={5} initialValue={rank} />
        </div>
        <div className="">
          <p className={`text-sm ${readMore ? '' : 'line-clamp-3'}`}>
            {content}
          </p>
          <span
            className="text-gray-400 inline float-right text-sm"
            onTouchEnd={() => setReadMore(!readMore)}
          >
            {readMore ? '접기' : '더보기'}
          </span>
        </div>
      </div>
    </div>
  );
};
