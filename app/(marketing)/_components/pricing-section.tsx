import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export function PricingSection() {
  return (
    <section className="w-full mt-64 flex flex-col items-center justify-center ">
      <div className="flex flex-col gap-4 items-center">
        <h3 className="max-w-lg font-bold prose-2xl text-pretty leading-12 text-2xl ">
          Simple Pricing.
        </h3>
        <p className="text-base max-w-xl text-muted-foreground text-center prose text-pretty leading-relaxed">
          Simple pricing. Choose between our generous freemium plan or support
          us and become a premium member. Which I would appreciate a lot.
        </p>
      </div>
      <div className="mt-16">
        <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
          <Card className="flex flex-col p-6 mx-auto max-w-md rounded-lg  shadow xl:p-8 ">
            <h3 className="mb-4 text-2xl font-semibold">Freemium</h3>
            <p className="font-medium text-muted-foreground sm:text-base">
              A generous offer. Try all our features for free. No hidden fees.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold text-special">
                FREE
              </span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              <li className="flex items-center space-x-3">
                <Check className="w-6 h-6 " />
                <span>Event creation and management</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-6 h-6 " />

                <span>Build and maintain a subscriber list.</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-6 h-6 " />

                <span>
                  Send <span className="font-semibold">1</span> email
                  notification per event.
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-6 h-6 " />

                <span>Organizer central hub</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-6 h-6 " />

                <span>Real-Time event and subscriber analytics</span>
              </li>
            </ul>
            <div className="flex flex-col gap-3 items-center w-full">
              <Button className="font-semibold w-full">Sign In</Button>
              <span className="text-xs text-muted-foreground">
                Free. No Subscription
              </span>
            </div>
          </Card>
          <Card className="flex flex-col p-6 mx-auto max-w-md rounded-lg  shadow xl:p-8 ">
            <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
            <p className="font-medium text-muted-foreground sm:text-base">
              Powerful extra features for the power user. Support us and become
              a premium member.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold text-special">
                €25
              </span>
              <span>/month</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              <li className="flex items-center space-x-3">
                <Check className="w-6 h-6 " />
                <span>Event creation and management</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-6 h-6 " />

                <span>Build and maintain a subscriber list.</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-6 h-6 " />

                <span>
                  Send <span className="font-semibold">1</span> email
                  notification per event.
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-6 h-6 " />

                <span>Organizer central hub</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-6 h-6 " />

                <span>Real-Time event and subscriber analytics</span>
              </li>
            </ul>
            <div className="flex flex-col gap-3 items-center w-full">
              <Button variant={"outline"} className="font-semibold w-full ">
                Subscribe
              </Button>
              <span className="text-xs text-muted-foreground">
                Billed Monthly
              </span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
