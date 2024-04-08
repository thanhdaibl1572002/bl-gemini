import Loading from '@/components/common/Loading'
import { FC } from 'react'

const GeminiLoading: FC = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Loading mode={'gemini'} />
    </div>
  )
}

export default GeminiLoading