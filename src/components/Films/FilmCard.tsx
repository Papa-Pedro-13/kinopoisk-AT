import { Film } from '@/features/types';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { FilmCardProps } from '../Film/types';
const { Meta } = Card;

const FilmCard: React.FC<FilmCardProps> = ({
  name,
  previewUrl,
  id,
  year,
  rating,
}) => {
  return (
    <>
      <Link
        to={`/films/${id}`}
        style={{ width: 'calc(25% - 15px)' }}
      >
        <Card
          hoverable
          style={{ minHeight: 420 }}
          cover={
            <img
              style={{ height: 300, objectFit: 'cover' }}
              alt='poster'
              src={previewUrl}
            />
          }
        >
          <Meta
            title={name}
            description={
              <>
                {rating && `Рейтинг: ${rating.toFixed(1)}`}
                <br />
                {year && `Год: ${year}`}
              </>
            }
          />
        </Card>
      </Link>
    </>
  );
};

export default FilmCard;
