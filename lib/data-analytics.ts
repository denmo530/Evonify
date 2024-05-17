import { Doc } from "@/convex/_generated/dataModel";

type AnalyticsData = Doc<"events"> | Doc<"subscribers">;

export interface IMonthData {
  month: string;
  count: number;
}

export async function generateAnalytics(
  data: AnalyticsData[] | undefined
): Promise<{ last7Months: IMonthData[] }> {
  const last7Months: IMonthData[] = [];
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  for (let i = 6; i >= 0; i--) {
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - i * 28
    );

    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() - 28
    );

    const monthYear = endDate.toLocaleString("default", {
      month: "short",
      year: "numeric",
      day: "numeric",
    });

    const count =
      data?.filter((item) => {
        const itemDate = new Date(item._creationTime);
        return itemDate >= startDate && itemDate < endDate;
      }).length ?? 0;

    last7Months.push({ month: monthYear, count });
  }
  return { last7Months };
}
