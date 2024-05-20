import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import React from "react";

interface EventCreatedEmailProps {
  username?: string;
  userImage?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  inviteLink?: string;
  img?: string;
}

const baseUrl = process.env.HOST_URL
  ? `https://${process.env.HOST_URL}`
  : "https://example.com";

export default function EventCreatedEmail({
  username,
  invitedByUsername,
  invitedByEmail,
  inviteLink,
  img,
}: EventCreatedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Organisation has created a new event!</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px] ">
              <Img
                src={`/message.svg`}
                width="100"
                height="100"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>
            <div className="px-8">
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Join <strong></strong> on <strong>Vercel</strong>
              </Heading>
              <Text className="text-black text-[14px] leading-[24px]">
                Hello {username},
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                <strong>{}</strong>
                <Link
                  href={`mailto:${invitedByEmail}`}
                  className="text-[#D4145A]  no-underline"
                >
                  {invitedByUsername}
                </Link>{" "}
                has created a new event on <strong>Evonify</strong>.
              </Text>
              <Text className="text-black text-[14px] leading-relaxed">
                We&apos;re sure you may be interested in their event. Click the
                link below to read more!
              </Text>
              <Section>
                <Row>
                  <Column align="right">
                    <Img
                      className="rounded-full"
                      src={img ?? "/message.svg"}
                      width="50%"
                      height="100px"
                    />
                  </Column>
                  <Column align="center">
                    <Img
                      src={`${baseUrl}/static/vercel-arrow.png`}
                      width="12"
                      height="9"
                      alt="invited you to"
                    />
                  </Column>
                  <Column align="left">
                    {/* <Img className="rounded-full" src={} width="64" height="64" /> */}
                  </Column>
                </Row>
              </Section>
              <Section className="text-center mt-[32px] mb-[32px]">
                <Button className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3 cursor-pointer">
                  Read More
                </Button>
              </Section>
              <Text className="text-black text-[14px] leading-[24px]">
                or copy and paste this URL into your browser:{" "}
                <Link href={inviteLink} className="text-[#D4145A] no-underline">
                  {inviteLink}
                </Link>
              </Text>
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                This email was intended for{" "}
                <span className="text-black">{username}</span>. This invite was
                sent from{" "}
                <span className="text-black">{invitedByUsername}</span> If you
                were not expecting this invitation, you can ignore this email.
                If you are concerned about your account&apos;s safety, please
                reply to this email to get in touch with us.
              </Text>
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
