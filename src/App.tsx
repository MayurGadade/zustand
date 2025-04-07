import { Box, Container, Typography } from "@mui/material";
import "./App.css";
import useHabits from "./store/store";
import HabitForm from "./components/Habit-form";

function App() {
  // const storeHabit = useHabits();
  // console.log(storeHabit);
  return (
    <div>
      <Container>
        <Box>
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Habit Tracker
          </Typography>

          {/* Habit form */}

          <HabitForm />
        </Box>
      </Container>
    </div>
  );
}

export default App;
