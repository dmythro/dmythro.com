import 'src/styles/global.css'

export { viewport } from 'src/constants'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
