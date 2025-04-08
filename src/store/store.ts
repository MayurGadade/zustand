/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

export interface Habit {
    id: string;
    name: string;
    frequency: "daily" | "weekly" 
    completedDate:string[];
    createdAt:string;
}
interface HabitState {
    habits: Habit[];
    addHabit: (name:string,frequency:"daily" | "weekly")=>void;
    removeHabit: (id:string)=>void;
    toggleHabit: (id:string, date:string)=>void;
}

const useHabits= create<HabitState>()(persist((set)=>{
    return{
        habits: [],
        addHabit: (name,frequency)=>set((state)=>{
            return{
                habits:[ ...state.habits,
                    {
                        id:Date.now().toString(),
                        name,
                        frequency,
                        completedDate: [],
                        createdAt: new Date().toISOString(),

                    }
                ],
                }
            }
        ),
        removeHabit: (id)=>set((state)=>{
            return{
                habits: state.habits.filter((habit)=>habit.id !== id)
            }
        }),
        toggleHabit: (id, date)=>set((state)=>{
            return{
                habits: state.habits.map((habit)=>
                habit.id === id
                ? {
                    ...habit,
                    completedDate: habit.completedDate.includes(date) ? habit.completedDate.filter((d)=> d !== date) : [...habit.completedDate, date]
                }:habit
                ),
    }
}
)
    }},{
    name: 'habit-storage',
    }))
export default useHabits;