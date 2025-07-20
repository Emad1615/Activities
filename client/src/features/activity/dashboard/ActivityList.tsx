import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";

type Props = {
  activities: Activity[];
  handelSelectActivity: (id: string) => void;
};
export default function ActivityList({
  activities,
  handelSelectActivity,
}: Props) {
  return (
    <Box>
      {activities.map((activity, idx: number) => (
        <ActivityCard
          key={idx}
          activity={activity}
          handelSelectActivity={handelSelectActivity}
        />
      ))}
    </Box>
  );
}
