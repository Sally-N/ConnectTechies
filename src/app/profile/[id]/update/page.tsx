'use client'

import React, { useEffect } from "react";
import { Col, Row } from "antd";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import UserProfileFormComponent from "@/components/Foms/profile";
import MainLayout from "@/app/mainlayout";
import UpdateUserProfileFormComponent from "@/components/Foms/updateProfile";



export default function Profile() {

    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const url = `${pathname}?${searchParams}`
        console.log(url)
        // You can now use the current URL
        // ...
    }, [pathname, searchParams])

    // return null



    // const router = useRouter();
    // const userId = router.query['id'];
    // console.log(userId, 'user')
    return (
        <MainLayout>
            <Row gutter={[8, 8]} style={{ height: '100vh' }}>
                <Col span={12}>
                    <Row justify={'center'} align={'middle'}>
                        <UpdateUserProfileFormComponent />
                    </Row>
                </Col>


            </Row>
        </MainLayout>
    )
}