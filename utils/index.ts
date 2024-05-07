import { IMessage } from '@/interfaces/message'
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai'

export const convertMessagesToHistories = (messages: Array<IMessage>) => {
  const userHistories = messages.filter(message => message.role === 'user').map(({ message }) => ({ text: message }))
  const aiHistories = messages.filter(message => message.role === 'ai').map(({ message }) => ({ text: message }))
  return { userHistories, aiHistories }
}

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
]

export const genAI = new GoogleGenerativeAI(process.env.geminiApiKey as string)
export const model = genAI.getGenerativeModel({ model: 'gemini-pro', safetySettings })

const responses = [
  'Tôi nghĩ bình luận "#c%o&m@m*e!n$t" của bạn mang cảm xúc #p%r&i@d*i!c$t.',
  'Có thể bình luận "#c%o&m@m*e!n$t" của bạn mang cảm xúc #p%r&i@d*i!c$t.',
  'Bình luận "#c%o&m@m*e!n$t" mang cảm xúc #p%r&i@d*i!c$t.',
  'Bình luận "#c%o&m@m*e!n$t" của bạn có vẻ mang cảm xúc #p%r&i@d*i!c$t.',
  'Dựa vào những gì tôi được học, bình luận "#c%o&m@m*e!n$t" có thể mang cảm xúc #p%r&i@d*i!c$t.',
  'Tôi cho rằng bình luận "#c%o&m@m*e!n$t" có thể mang cảm xúc #p%r&i@d*i!c$t.',
  'Tôi cảm thấy sự #p%r&i@d*i!c$t trong bình luận "#c%o&m@m*e!n$t" của bạn.',
  'Theo tôi, bình luận "#c%o&m@m*e!n$t" mang cảm xúc #p%r&i@d*i!c$t.',
  'Tôi phân tích rằng bình luận "#c%o&m@m*e!n$t" của bạn có thể mang cảm xúc #p%r&i@d*i!c$t.',
  'Theo những gì tôi được huấn luyện, bình luận "#c%o&m@m*e!n$t" của bạn có thể mang cảm xúc #p%r&i@d*i!c$t.',
  'Tôi dự đoán bình luận "#c%o&m@m*e!n$t" của bạn có thể mang cảm xúc #p%r&i@d*i!c$t.',
  'Tôi dự đoán bình luận "#c%o&m@m*e!n$t" mang cảm xúc #p%r&i@d*i!c$t.',
  'Tôi có thể giúp bạn dự đoán bình luận "#c%o&m@m*e!n$t". Bình luận của bạn mang cảm xúc #p%r&i@d*i!c$t.',
  'Có vẻ bình luận "#c%o&m@m*e!n$t" của bạn có cảm xúc #p%r&i@d*i!c$t.',
  'Theo tôi, khả năng cao là bình luận "#c%o&m@m*e!n$t" của bạn đang mang cảm xúc #p%r&i@d*i!c$t.',
  'Bình luận "#c%o&m@m*e!n$t" có khả năng mang cảm xúc #p%r&i@d*i!c$t.',
]

export const generateRandomResponse = (comment: string, predict: string): string => {
  const randomIndex = Math.floor(Math.random() * responses.length)
  const randomResponse = responses[randomIndex]
  const finalResponse = randomResponse.replace('#c%o&m@m*e!n$t', comment).replace('#p%r&i@d*i!c$t', predict)
  return finalResponse
}

export const daiblResponseText = (responseData: '-2' | '-1' | '0' | '1', text: string): string => {
  let responseText = ''
  switch (responseData) {
    case '-2':
      responseText = `Bình luận "${text}" có thể không phải là tiếng Việt, điều này có thể ảnh hưởng đến kết quả dự đoán của mô hình, vui lòng thử những bình luận khác.`
      break
    case '-1':
      responseText = generateRandomResponse(text, 'tiêu cực')
      break
    case '0':
      responseText = generateRandomResponse(text, 'trung lập')
      break
    case '1':
      responseText = generateRandomResponse(text, 'tích cực')
      break
  }
  return responseText
}


export const calculateDaysFromDate = (dateString: string): number => {
  const currentDate = new Date().getTime()
  const targetDate = new Date(dateString).getTime()
  const millisecondsPerDay = 1000 * 60 * 60 * 24
  const differenceMilliseconds = currentDate - targetDate
  const differenceDays = Math.floor(differenceMilliseconds / millisecondsPerDay)
  return -differenceDays
}

export const calculateDateFromDaysAgo = (daysAgo: number): string => {
  const currentDate = new Date().getTime()
  const millisecondsPerDay = 1000 * 60 * 60 * 24
  const targetDate = new Date(currentDate - Math.abs(daysAgo) * millisecondsPerDay)
  const year = targetDate.getFullYear()
  const month = String(targetDate.getMonth() + 1).padStart(2, '0')
  const day = String(targetDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const getCurrentDate = (): string => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}