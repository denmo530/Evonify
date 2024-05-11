import { Button } from "@/components/ui/button";
import { BellRing } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-10">
      <section className="flex items-center flex-col text-5xl space-y-4">
        <h1 className="max-w-lg font-bold prose-2xl">
          <span className="bg-gradient-to-r from-[#D4145A] via-[#FF5F6D] to-[#FBB03B] inline-block text-transparent bg-clip-text">
            Evonify.
          </span>
          A better way to keep up to date.
        </h1>
        <p className="text-lg  text-muted-foreground text-center prose">
          The only platform needed to market your event and keep up to date.
        </p>
      </section>
      <section>
        {
          // TODO: Should open up a form or just enter number/email in field and
        }{" "}
        get subsribed to mailing list.
        <Button className="flex gap-2">
          <BellRing size={18} />
          Subscribe to mailing list.
        </Button>
      </section>
    </main>
  );
}
