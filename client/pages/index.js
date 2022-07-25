import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar/NavBar';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <NavBar/>
    </div>
  )
}
