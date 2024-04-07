import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetFilmQuery } from '@/features/api/apiSlice';
import { Carousel, Flex } from 'antd';
import FilmCard from '../Films/FilmCard';
import { SimmilarMovie } from './types';

const FilmPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isSuccess, isFetching, isError, isLoading } = useGetFilmQuery({
    id,
  });

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate('/');
    }
  }, [isFetching, isLoading, isSuccess]);

  return (
    <div>
      <Flex
        gap='middle'
        align='center'
        justify='space-between'
      >
        <h1 className=''>{data?.name}</h1>
        <h3 style={{ height: 'fit-content' }}>
          Рейтинг кинопоиска: {data?.rating?.kp.toFixed(1)}
        </h3>
      </Flex>
      <p>{data?.description}</p>
      {data != undefined && data.seasonsInfo.length !== 0 ? (
        <div>
          <h3>Сезоны</h3>
          {data?.seasonsInfo.map((item: any) => (
            <div className='carousel-item'>
              <h4>Сезон {item.number}</h4>
              <p>Количество серий {item.episodesCount}</p>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}

      <Carousel>
        {/* {Object.values(data?.poster).map((value: any) => (
          <div
            className='carousel-item'
            style={{ backgroundImage: value }}
          ></div>
        ))} */}
      </Carousel>
      <h2>Похожие фильмы</h2>
      <Flex
        style={{ margin: '40px 0' }}
        wrap='wrap'
        gap='middle'
        align='start'
      >
        {data?.similarMovies?.map((item: SimmilarMovie) => (
          <FilmCard
            name={item.name}
            previewUrl={item.poster.previewUrl}
            id={item.id}
            year={item.year}
            rating={item?.rating?.kp}
            key={item.id}
          />
        ))}
      </Flex>
    </div>
  );
};

export default FilmPage;
