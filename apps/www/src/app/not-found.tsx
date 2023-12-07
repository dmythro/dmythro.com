import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Link } from '@nextui-org/link'
import { initTheme } from 'src/utils/theme'

export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: this is a special case
          dangerouslySetInnerHTML={{
            __html: `(${initTheme.toString().replace(/\s+/g, ' ')})()`,
          }}
        />
      </head>
      <body>
        <Card className="max-w-sm m-auto my-2 print:border-small print:rounded-md print:shadow-none">
          <CardBody className="flex gap-2">
            <h2 className="text-lg">Not Found</h2>
            <p>Could not find requested resource.</p>
          </CardBody>
          <CardFooter>
            <Link href="/">Return Home</Link>
          </CardFooter>
        </Card>
      </body>
    </html>
  )
}
