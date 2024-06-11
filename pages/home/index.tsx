import WelcomeText from '@/components/home/WelcomeText'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function index() {

  const { data: session, status } = useSession()
  const router = useRouter()

  if (!session && status == 'unauthenticated'){
    router.push('/')
  }

  return (
    <div className='h-screen w-screen lg:pl-[180px]'>
      <WelcomeText />
    </div>
  )
}

export default index