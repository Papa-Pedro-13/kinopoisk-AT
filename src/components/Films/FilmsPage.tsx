import React, { useEffect, useState } from 'react';
import { Film, ListResponse, useAppSelector } from '@/features/types';
import { useGetFilmsQuery } from '@/features/api/apiSlice';
import dayjs from 'dayjs';
import {
  Card,
  DatePicker,
  Flex,
  Select,
  Input,
  Pagination,
  Button,
  Form,
  Slider,
} from 'antd';

import { formatDate } from '@/utils/common';

const { Search } = Input;
const { RangePicker } = DatePicker;

interface DefaultValues {
  title: string;
  year: number | number[];
  ageRating: number | number[];
  ['countries.name']: string;
}

const defaultValues: DefaultValues = {
  title: '',
  year: [1874, new Date().getFullYear()],
  ageRating: [0, 18],
  'countries.name': 'Россия',
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
  const [values, setValues] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);

  const { data, isSuccess, isFetching, isError } = useGetFilmsQuery(params);

  // const { list, total } = useAppSelector<ListResponse>(({ films }) => films);

  useEffect(() => {}, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setParams({ ...params, ageRating: age, year: year });
  };

  const onChangePagination = (page: number, pageSize: number) => {
    setParams({ ...params, page: page, limit: pageSize });
  };
  const handleChange = () => {};

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
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'tom',
                  label: 'Tom',
                },
              ]}
            />

            <Search
              onChange={handleChange}
              placeholder='Поиск фильма...'
              style={{ maxWidth: 400 }}
            />
          </Flex>
          <Button
            type='primary'
            htmlType='submit'
            loading={isFetching}
            style={{ marginTop: 20 }}
          >
            Применить
          </Button>
        </Card>
      </form>
      {data ? (
        data?.docs?.map((item: Film) => <div key={item.id}>{item.name}</div>)
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
