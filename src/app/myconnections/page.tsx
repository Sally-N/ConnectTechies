'use client'

import React, { useContext, useEffect } from 'react'
import MainLayout from '../mainlayout';
import UserConnectionsCard from '@/components/cards/connections';

export default function MyConnectionsPage() {
    return (
        <MainLayout>
            <p>hello</p>
            <UserConnectionsCard  />
        </MainLayout>
    )
}
