import { Box, Button, LinearProgress, Paper, Typography } from "@mui/material"; // ✅ Removed Grid
import useHabits, { Habit } from "../store/store";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function Habitlist() {
  const { habits, removeHabit, toggleHabit } = useHabits();

  const today = new Date().toISOString().split("T")[0];

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const CurrentDate = new Date();

    while (true) {
      const dateString = CurrentDate.toISOString().split("T")[0];
      if (habit.completedDate.includes(dateString)) {
        streak++;
        CurrentDate.setDate(CurrentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      {habits.map((habit) => (
        <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
          {/* ✅ Replaced Grid container with responsive flex layout */}
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            {/* ✅ Left section */}
            <Box flex={1}>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {habit.frequency}
              </Typography>
            </Box>

            {/* ✅ Right section with buttons */}
            <Box
              flex={1}
              display="flex"
              justifyContent={{ xs: "flex-start", sm: "flex-end" }}
              gap={1}
            >
              <Button
                variant="contained"
                color={
                  habit.completedDate.includes(today) ? "success" : "primary"
                }
                startIcon={<CheckCircleOutlineIcon />}
                onClick={() => toggleHabit(habit.id, today)}
              >
                {habit.completedDate.includes(today)
                  ? "Completed"
                  : "Mark as Completed"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => removeHabit(habit.id)}
              >
                Delete
              </Button>
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography>Current Streak : {getStreak(habit)}</Typography>
            <LinearProgress
              variant="determinate"
              value={(getStreak(habit) / 30) * 100}
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

export default Habitlist;
