import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";
import type { Activity } from "../../../lib/types/index";

type Props = {
  activities: Activity[];
  handelSelectActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
};
export default function ActivityList({
  activities,
  handelSelectActivity,
  handleDeleteActivity
}: Props) {
  return (
    <Box>
      {activities.map((activity, idx: number) => (
        <ActivityCard
          key={idx}
          activity={activity}
          handelSelectActivity={handelSelectActivity}
          handleDeleteActivity={handleDeleteActivity}
        />
      ))}
    </Box>
  );
}
