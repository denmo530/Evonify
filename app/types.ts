import { Doc, Id } from "@/convex/_generated/dataModel";

export interface IEvent extends Doc<"events"> {
  urls: Id<"_storage">[];
}
