import React from 'react';
import { Avatar, Card, Typography } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
// import { Title } from '@/Utils/Theme/customTheme';

const { Meta } = Card;
const { Title } = Typography;


const UserCard: React.FC = () => (
  <Card
    hoverable
    style={{ width: 240, height: 190 }}
    cover={
    <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}    
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title="senior Software"
      description="This is the description"
    />
   
  </Card>
);

export default UserCard;