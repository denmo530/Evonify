("use node");
import { Resend } from "resend";
import { internalAction } from "../_generated/server";
import { ConvexError, v } from "convex/values";
import EventCreatedEmail from "./EventCreatedEmail";

export const resend = new Resend(process.env.RESEND_API_KEY);

// TODO: Send an email to the user when organiser create an event
// TODO: Send an email to the user when organiser update an event
// TODO: Send an email to the user when organiser delete an event
// TODO: Send an email to the user when they subscribe to an event
// TODO: Send an email to the user when they unsubscribe to an event
// TODO: Send an email to the user when they subscribe to an organiser
// TODO: Send an email to the user the day before an event as a reminder
// TODO: Manual send event function

const emailFrom = "Evonify <support@evonify.com>";

export const sendEventCreatedEmail = internalAction({
  args: {
    email: v.string(),
    org: v.string(),
    eventName: v.string(),
    userEmail: v.string(),
    eventImg: v.optional(v.any()),
  },
  async handler(ctx, args) {
    const inviteLink = `${process.env.HOST_URL}/events/${args.eventName}`;

    const { error } = await resend.emails.send({
      from: emailFrom,
      to: "delivered@resend.dev",
      subject: args.org + " has created a new event!",
      react: EventCreatedEmail({
        invitedByUsername: args.org,
        inviteLink: inviteLink,
        invitedByEmail: args.userEmail,
        username: args.email,
        img: args.eventImg,
      }),
    });
    if (error) {
      console.error("Error sending email", error);

      throw new ConvexError({ message: error?.message });
    }

    return { success: true, code: 200 };
  },
});
