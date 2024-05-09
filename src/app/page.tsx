'use client'
import UserCards from '@/components/cards/user'
import { Col, Row } from 'antd'
import MainLayout from './mainlayout'

export default function Home() {
  return (
    <MainLayout>      
            <UserCards/>
    </MainLayout>
  )
}
