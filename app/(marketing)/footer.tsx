import React from "react";
import Link from "next/link";
import { BellRing, HeartHandshake, LucideLinkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-8 px-16 mt-8">
      <div className="container mx-auto prose  ">
        <div className="flex justify-between items-center">
          <div className="space-y-1 text-muted-foreground">
            {/* // TODO: Add logo */}
            <h4 className="text-lg font-bold flex gap-2 items-center">
              <BellRing className="w-5 h-5" />
              Evonify
            </h4>
            <p className="text-sm">© 2024, All rights reserved.</p>
            <p className="text-sm flex gap-1 items-center">
              Made with <HeartHandshake className="w-4 h-4 text-special" /> by
              <Link
                className="text-special font-bold hover:underline hover:opacity-70"
                href="https://dennismoradkhani.se"
                target="_blank"
              >
                Dennis Moradkhani
              </Link>
            </p>
            <p className="w-fit">
              <Link
                target="_blank"
                href={
                  "https://www.linkedin.com/in/dennis-moradkhani-5386a8181/"
                }
              >
                <LucideLinkedin className="w-5 h-5 cursor-pointer hover:text-special  " />
              </Link>
            </p>
          </div>
          <div className="space-x-4 text-muted-foreground text-sm ">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
