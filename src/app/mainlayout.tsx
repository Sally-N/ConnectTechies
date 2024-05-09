import React, { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import { useMediaQuery } from 'react-responsive';
import NavbarComponent from '@/components/navigation/navbar';
import SidemenuComponent from '@/components/navigation/sidemenu';

const { Header, Sider, Content } = Layout;

const layoutStyle = {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'white',
    minHeight: '100%'
};


const headerStyle: React.CSSProperties = {
    height: 64,
    background: 'white'
};

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: 'white',
};



const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const isSmallerScreen = useMediaQuery({ query: "(min-width: 577px)" });
    const isMediumScreen = useMediaQuery({ 'query': '(max-width: 996px)' })
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [loaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, [])

    return (
        loaded && (
            <Layout style={{ ...layoutStyle }}>
                <Header style={{
                    ...headerStyle, padding: '0px',
                }}>
                    <NavbarComponent />
                </Header>
                <Layout style={{
                    width: '100%',
                    height: 'fit-content',
                    //  border: 'solid 10px green',
                     minHeight: '200vh'
                }}>
                    <Sider width="13%" style={siderStyle} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                        <SidemenuComponent />
                    </Sider>
                    <Content style={{
                        padding: isSmallerScreen ? '25px' : '10px',
                        width: '100%',
                        overflowY: 'auto'
                    }}>

                        {children}
                    </Content>
                </Layout>
            </Layout>
        )
    );
};

export default MainLayout;

