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
} from 'antd';

import { formatDate } from '@/utils/common';

const { Search } = Input;
const { RangePicker } = DatePicker;

const defaultValues = {
  title: '',
  ageRating: 12,
  price_min: 0,
  price_max: 0,
};
const defaultParams = {
  ...defaultValues,
  limit: 10,
  page: 1,
  total: 1,
};

const FilmsPage = () => {
  const dateFormat = 'YYYY-MM-DD';
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [values, setValues] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);

  const { data, isLoading, isFetching } = useGetFilmsQuery(params);

  // const { list, total } = useAppSelector<ListResponse>(({ films }) => films);

  useEffect(() => {}, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setParams({ ...params, ageRating: +age });
    console.log(params);
  };

  const onChangePagination = (page: number, pageSize: number) => {
    setParams({ ...params, page: page, limit: pageSize });
  };
  const handleChange = () => {};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card title='Фильтры'>
          <Flex
            wrap='wrap'
            gap={20}
            align={'center'}
          >
            <RangePicker
              placeholder={['От', 'До']}
              allowEmpty={[true, true]}
              picker='year'
              maxDate={dayjs(formatDate(new Date().toDateString()), dateFormat)}
            />
            <Select
              onChange={(value: string) => setAge(value)}
              placeholder='Возрастной рейтинг'
              options={[
                {
                  value: '0',
                  label: '0+',
                },
                {
                  value: '12',
                  label: '12+',
                },
                {
                  value: '18',
                  label: '18+',
                },
              ]}
            />

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
