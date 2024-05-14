import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

export interface IDashboardCard {
  title: string | undefined;
  description: string | undefined;
  amount: number | undefined;
  comparisonAmount: number | undefined;
  percentageGrowth: number | undefined;
}

export default function DashboardCard({
  data,
}: {
  data: IDashboardCard | undefined;
}) {
  if (data === undefined) return <></>;

  const growthStyle =
    data?.percentageGrowth !== undefined &&
    !isNaN(data.percentageGrowth) &&
    data.percentageGrowth >= 0
      ? "bg-[#DCFCE6] text-green-600"
      : "bg-[#fcdcdc] text-red-600";

  return (
    <>
      {data && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{data.title}</CardTitle>
            <CardDescription>{data.description} </CardDescription>
          </CardHeader>
          <CardContent className="flex prose justify-between items-center">
            <div className="text-[18px]">{data.amount}</div>
            <div
              className={cn(
                "flex p-2 items-center rounded-full gap-2",
                growthStyle
              )}
            >
              <TrendingUp className="h-6 w-6 rounded-full " />
              <span className="text-xs text-opacity-80 font-medium">
                {data.percentageGrowth}%
              </span>
            </div>
          </CardContent>
          <CardFooter className="text-muted-foreground text-xs">
            from {data.comparisonAmount} (last 4 weeks)
          </CardFooter>
        </Card>
      )}
    </>
  );
}
