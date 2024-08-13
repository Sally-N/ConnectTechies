'use client';

import React, { useState } from 'react';
import { Row } from 'antd';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import LoginComponent from '@/components/Foms/Auth/login';

export default function LoginUserPage() {
    const [mounted, setisMounted] = useState(false);

    useEffect(() => {
        setisMounted(true);
    }, [])

    return (
        <>
            {mounted &&
                (
                        <Row align={'middle'} justify={'center'}>
                            
                            <Toaster />
                            <LoginComponent />
                        </Row>
                )
            }

        </>

    );
};