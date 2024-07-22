import React, { useState } from 'react';
import type { ConfigProviderProps, RadioChangeEvent,  TabsProps } from 'antd';
import { Radio, Tabs } from 'antd';
import UpdateUserComponent from '../Foms/updateUser';
import UpdateUserProfileFormComponent from '../Foms/updateProfile';

type SizeType = ConfigProviderProps['componentSize'];

const UpdateUserTabComponent: React.FC = () => {
  const [size, setSize] = useState<SizeType>('small');

  const onChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  const items: TabsProps['items'] = [
    { key: '1', label: 'Basic Details', children: <UpdateUserComponent /> },
    { key: '2', label: 'Profile Details', children: <UpdateUserProfileFormComponent/> },
  ]

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={'small'}
        items={items}
      />
    </div>
  );
};

export default UpdateUserTabComponent;