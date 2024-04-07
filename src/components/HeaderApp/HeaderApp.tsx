import { useGetFilmByNameQuery } from '@/features/api/apiSlice';
import { Film } from '@/features/types';
import { Avatar, Flex, Layout, List } from 'antd';
import Search, { SearchProps } from 'antd/es/input/Search';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const { Header } = Layout;

const data2 = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const HeaderApp = () => {
  const [value, setValue] = useState('2');

  const { data } = useGetFilmByNameQuery({ query: value });

  const handleChange: SearchProps['onChange'] = (e) => {
    setValue(e.target.value);
  };

  return (
    <Header style={{ padding: 0 }}>
      <Flex
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '0px 50px',
          height: '100%',
          position: 'relative',
        }}
        align='center'
      >
        <Search
          onChange={handleChange}
          placeholder='Поиск фильма по названию'
        />
        {/* {value && (
          <List
            itemLayout='horizontal'
            dataSource={data?.docs}
            style={{
              position: 'absolute',
              width: '100%',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#fff',
              transform: 'translateY(100%)',
              zIndex: 9,
            }}
            renderItem={(item: Film, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                    />
                  }
                  title={<p>{item.name}</p>}
                />
              </List.Item>
            )}
          />
        )} */}
      </Flex>
    </Header>
  );
};

export default HeaderApp;
