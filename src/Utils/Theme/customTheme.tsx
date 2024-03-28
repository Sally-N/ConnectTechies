import React from 'react';
import { ConfigProvider, Typography, theme } from 'antd';
import { Inter } from 'next/font/google';
import { Poppins } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] })
export const poppins = Poppins({subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] }) 

export const { Text, Paragraph, Title } = Typography;

export const ConnectTechiesTheme = ({
    childrenElements
}: {
    childrenElements: React.ReactNode
}) => {
    return <>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ed33a4',
                    fontFamily: poppins.style.fontFamily,
                    colorTextDisabled: 'rgba(0, 0, 0, 0.25)',
                },
                components: {
                    Button: {
                        colorPrimary: '#ed33a4',
                        colorPrimaryText: "#ffffff",
                        colorBgContainerDisabled: '#ed33a4',
                        borderRadius: 40,
                        defaultShadow: 'none',
                        colorBgTextActive: 'white',                        
                        algorithm: true, // Enable algorithm
                        primaryShadow: 'none',
                        colorTextDisabled: 'white',
                    },
                    Steps: {
                        customIconFontSize: 20,
                        iconSize: 30,
                        //  finishIconBorderColor: '#1677ff '
                    },
                    Input: {
                        activeBorderColor: '#ed33a4',
                        activeShadow: 'none',
                        hoverBorderColor: 'none',
                        algorithm: true, // Enable algorithm
                    },
                    Dropdown: {
                        borderRadius: 2,
                    },
                    Menu: {
                        boxShadow: '#f7f8f9',
                        itemSelectedBg: '#f7f8f9',
                        iconMarginInlineEnd: 0,
                    },
                    Avatar: {
                        boxShadow: '#f7f8f9',
                        colorBgBase: '#00000073'
                    },
                    Select: {
                        optionSelectedBg: 'rgba(0, 0, 0, 0.04)',
                    },

                },
            }}
        >
            {
                childrenElements
            }
        </ConfigProvider>

    </>
}