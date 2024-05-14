import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
export default function DashboardCard({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{data.title}</CardTitle>
        <CardDescription>{data.description} </CardDescription>
      </CardHeader>
      <CardContent className="flex prose justify-between items-center">
        <div className="text-[18px]">{data.amount}</div>
        <div className="flex p-2 items-center rounded-full bg-[#DCFCE6] gap-2">
          <TrendingUp className="h-6 w-6 rounded-full text-green-600" />
          <span className="text-xs text-opacity-80 text-green-600 font-medium">
            {data.percentageGrowth}%
          </span>
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground text-xs">
        from {data.comparisonAmount} (last 4 weeks)
      </CardFooter>
    </Card>
  );
}
