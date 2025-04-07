/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'

export interface Habit {
    id: string;
    name: string;
    frequency: "daily" | "weekly" 
    completedDate:string[];
    createdAt:string;
}
interface HabitState {
    habits: Habit[];
}

const useHabits= create<HabitState>()(()=>{
    return{
        habits: [],
    }
})

export default useHabits;