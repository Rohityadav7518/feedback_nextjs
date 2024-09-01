import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button
} from "@react-email/components"

interface VerificationEmailProps {
    username: string,
    otp: string
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (

        <html lang="en" dir="ltr">
            <head>
                <title>Verification Code</title>
                <Font fontFamily="Roboto"
                    fallbackFontFamily={"Verdana"}
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/roboto/v27/KFO',
                        format: 'woff2'
                    }}
                    fontStyle="normal"
                    fontWeight={400} />
            </head>

            <Preview>
                Here is Your Verification Code {otp}
            </Preview>
            <Section>
                <Row>
                    <Heading as="h2">
                        Hello {username}
                    </Heading>
                </Row>
                <Row>

                    <Text>
                        Thank You For  Resgistering Please Use Code To Complete Process
                    </Text>
                </Row>

                <Row>

                    <Text>{otp} </Text>
                </Row>
            </Section>

            <body>

            </body>
        </html>
    )
}