import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";

type Props = {
  activities: Activity[];
};
export default function ActivityList({ activities }: Props) {
  return (
    <Box>
      {activities.map((activity, idx: number) => (
        <ActivityCard key={idx} activity={activity} />
      ))}
    </Box>
  );
}
