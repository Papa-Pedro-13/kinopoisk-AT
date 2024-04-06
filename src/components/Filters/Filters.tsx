import dayjs from 'dayjs';
import { Card, DatePicker, Flex, Select, Input } from 'antd';

import { formatDate } from '@/utils/common';

const { Search } = Input;
const { RangePicker } = DatePicker;

const Filters = () => {
  const dateFormat = 'YYYY-MM-DD';
  return (
    <Card
      title='Filters'
      size='default'
    >
      <Flex
        justify={'space-between'}
        align={'center'}
      >
        <RangePicker
          placeholder={['From', 'To']}
          allowEmpty={[true, true]}
          picker='year'
          maxDate={dayjs(formatDate(new Date().toDateString()), dateFormat)}
        />
        <Select
          placeholder='Min age rate'
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
          showSearch
          placeholder='Select a country'
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
          placeholder='Search film...'
          style={{ maxWidth: 400 }}
        />
      </Flex>
    </Card>
  );
};

export default Filters;
