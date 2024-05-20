import {
  BarChart4,
  CakeSlice,
  CalendarPlus,
  HeartHandshake,
  MailsIcon,
  Users,
} from "lucide-react";

const FeatureItem = ({
  title,
  content,
  icon,
}: {
  title: string;
  content: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-3 text-center">
      <div className="rounded-md bg-special flex items-center p-3 text-white">
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-base text-muted-foreground font-medium leading-relaxed">
        {content}
      </p>
    </div>
  );
};

export function FeaturesSection() {
  const featureItems = [
    {
      title: "Event Creation",
      content:
        "Effortlessly create and manage events. Keep your audience engaged and informed about upcoming events. All in one place.",
      icon: <CalendarPlus className="w-6 h-6" />,
    },
    {
      title: "Mailing List Management",
      content:
        "Build and maintain your subscriber list with ease. Manage subscriptions, send notifications, and keep your audience informed.",
      icon: <MailsIcon className="w-6 h-6" />,
    },
    {
      title: "Real-Time Analytics",
      content:
        "Gain valuable insights with real-time analytics. Track subscribers, opens, and event metrics for smarter planning.",
      icon: <BarChart4 className="w-6 h-6" />,
    },
    {
      title: "Collaboration",
      content:
        "Collaborate with your team and organize events efficiently. Work together seamlessly to deliver outstanding events for your audience.",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "User-Friendly Interface",
      content:
        "Enjoy a user-friendly interface designed for ease of use. Navigate through features effortlessly and manage your events with confidence.",
      icon: <CakeSlice className="w-6 h-6" />,
    },
    {
      title: "Central Hub",
      content:
        "Showcase your events with our organizer pages. Provide a central hub for all your event information, making it easy for your audience to find and engage with your events.",
      icon: <HeartHandshake className="w-6 h-6" />,
    },
  ];

  return (
    <section className="container mx-auto w-full flex flex-col items-center justify-center ">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full md:px-12 grid-rows-2 items-center gap-x-8 gap-y-12">
        {featureItems.map((feature, index) => (
          <FeatureItem
            key={index}
            title={feature.title}
            content={feature.content}
            icon={feature.icon}
          />
        ))}
      </div>
    </section>
  );
}
