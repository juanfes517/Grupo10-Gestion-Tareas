import User from "@/components/users/User"
import Alert from '@mui/material/Alert';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function index() {

  const { data: session, status } = useSession()
  const router = useRouter()

  if (!session && status == 'unauthenticated') {
    router.push('/')
  }

  return (
    <div className='overflow-x-hidden h-screen w-screen lg:pl-[180px]'>
      <User />
    </div>
  )
}

export default index