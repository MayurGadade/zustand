import { Box, Button, LinearProgress, Paper, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
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
          <Grid container alignItems="center">
            <Grid xs={12} sm={6} size={6}>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {habit.frequency}
              </Typography>
            </Grid>
            <Grid xs={12} sm={6} size={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                }}
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
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Typography>Current Streak : {getStreak(habit)}</Typography>
            <LinearProgress
              variant="determinate"
              value={(getStreak(habit) / 30) * 100}
            ></LinearProgress>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

export default Habitlist;
