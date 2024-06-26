import React, { useState } from 'react';
import {
    FileOutlined,
    TeamOutlined,
    HomeOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Home', '1', <HomeOutlined />),
    getItem('My Connections', '2', <TeamOutlined />),
   
    getItem('Files', '9', <FileOutlined />),
];

const SidemenuComponent: React.FC = () => {


    return (
        <div style={{backgroundColor: 'white'}}>
            <div className="demo-logo-vertical" />
            <Menu  defaultSelectedKeys={['1']} mode="inline" items={items} />
        </div>
    );
};

export default SidemenuComponent;