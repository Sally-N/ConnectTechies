'use client'
import UserCard from '@/components/cards/user'
import { Col, Row } from 'antd'
import Image from 'next/image'
// import styles from './page.module.css'

export default function Home() {
  return (

       <Row>
        <Col>
        <UserCard />
        </Col>
       </Row>
      


  )
}
