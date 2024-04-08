import Loading from '@/components/common/Loading'
import { FC } from 'react'

const DAIBLLoading: FC = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Loading mode={'daibl'} />
    </div>
  )
}

export default DAIBLLoading