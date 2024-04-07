import React, { useState } from 'react';

import { Film } from '@/features/types';
import { useGetFilmsQuery } from '@/features/api/apiSlice';

import {
  Card,
  DatePicker,
  Flex,
  Select,
  Input,
  Pagination,
  Button,
  Slider,
} from 'antd';

import FilmCard from './FilmCard';

interface DefaultValues {
  year: number | number[];
  ageRating: number | number[];
  ['countries.name']: string;
}

const defaultValues: DefaultValues = {
  year: [1874, new Date().getFullYear()],
  ageRating: [0, 18],
  'countries.name': '',
};
const defaultParams = {
  ...defaultValues,
  limit: 10,
  page: 1,
  total: 1,
};

const FilmsPage = () => {
  const [age, setAge] = useState<number | number[]>([0, 18]);
  const [year, setYear] = useState<number | number[]>([
    1874,
    new Date().getFullYear(),
  ]);
  const [country, setCountry] = useState('');
  const [params, setParams] = useState(defaultParams);

  const { data, isSuccess, isFetching, isError } = useGetFilmsQuery(params);

  //Get countries list for filter
  const countries = require('i18n-iso-countries');
  countries.registerLocale(require('i18n-iso-countries/langs/ru.json'));

  //Apply filters
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setParams({
      ...params,
      ageRating: age,
      year: year,
      'countries.name': country,
    });
  };

  const onChangePagination = (page: number, pageSize: number) => {
    setParams({ ...params, page: page, limit: pageSize });
  };
  const onChangeAge = (value: number | number[]) => {
    setAge(value);
  };
  const onChangeYear = (value: number | number[]) => {
    setYear(value);
  };

  if ((!isSuccess && !isFetching) || isError) {
    return <h2>Ошибка</h2>;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card title='Фильтры'>
          <Flex
            wrap='wrap'
            gap={20}
            style={{ flexDirection: 'column' }}
          >
            <div>
              <p>Возрастной рейтинг</p>
              <Slider
                range
                onChangeComplete={onChangeAge}
                step={1}
                defaultValue={[0, 18]}
                max={18}
                min={0}
              />
            </div>
            <div>
              <p>Год</p>
              <Slider
                range
                onChangeComplete={onChangeYear}
                step={1}
                defaultValue={[1874, new Date().getFullYear()]}
                max={new Date().getFullYear()}
                min={1874}
              />
            </div>

            <Select
              onChange={(value: string) => setCountry(value)}
              showSearch
              placeholder='Страна'
              options={Object.values(countries.getNames('ru')).map((value) => {
                return { value: value, label: value };
              })}
            />

            <Button
              type='primary'
              htmlType='submit'
              loading={isFetching}
            >
              Применить
            </Button>
          </Flex>
        </Card>
      </form>
      {data ? (
        <Flex
          style={{ margin: '40px 0' }}
          wrap='wrap'
          gap='middle'
          align='start'
        >
          {data?.docs?.map((item: Film) => (
            <FilmCard
              name={item.name}
              previewUrl={item.poster.previewUrl}
              id={item.id}
              year={item.year}
              rating={item.rating.kp}
              key={item.id}
            />
          ))}
        </Flex>
      ) : (
        <div>Загрузка...</div>
      )}
      <Pagination
        disabled={isFetching}
        style={{ margin: '0 auto', width: 'fit-content', marginTop: 40 }}
        defaultCurrent={1}
        total={data?.total}
        onChange={onChangePagination}
      />
    </div>
  );
};

export default FilmsPage;
