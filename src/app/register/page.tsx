'use client';

import React, { useState } from 'react';
import RegisterComponent from '@/components/Foms/Auth/register';
import { Row } from 'antd';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

export default function RegisterUserPage() {
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
                        <RegisterComponent />
                    </Row>
                )
            }

        </>

    );
};