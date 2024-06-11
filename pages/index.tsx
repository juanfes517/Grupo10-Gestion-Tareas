import { signIn, signOut } from 'next-auth/react'
import Landing from '../components/landing/Landing'

const Home = () => {

  return (
    <div>
      <div className='flex justify-center items-center overflow-x-hidden'>
        <Landing />
      </div>

    </div>
  )
};

export default Home;
