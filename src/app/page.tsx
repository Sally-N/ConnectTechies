'use client'
import UserCard from '@/components/cards/user'
import { Col, Row } from 'antd'
import MainLayout from './mainlayout'

export default function Home() {
  return (
    <MainLayout>
      <Row>
        <Col>
          <UserCard />
        </Col>
      </Row>
    </MainLayout>



  )
}
