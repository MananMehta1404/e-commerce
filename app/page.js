"use client"

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import ProductsContainer from '@/components/ProductsContainer';
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter();
  const token = Cookies.get('token');

  if(!token) {
    router.push('/login');
  }

  return (
    <section className="w-full flex-center flex-col">
      <NavBar />
      {/* <Banner /> */}
      <ProductsContainer />
      <Footer />
    </section>
  )
}

export default Home