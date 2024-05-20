import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-24 text-gray-600">
      <Loader2 className="h-32 w-32 animate-spin" />
      <div className="text-xl">Loading your data...</div>
    </div>
  );
}
