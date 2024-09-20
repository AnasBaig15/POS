import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeProjects: [],
  archivedProjects: [],
  favoriteProjects: [],
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      const newProject = { name: action.payload.name, color: action.payload.color };
      state.activeProjects.push(newProject);
    },
    archiveProject: (state, action) => {
      const project = state.activeProjects[action.payload];
      state.activeProjects = state.activeProjects.filter((_, i) => i !== action.payload);
      state.archivedProjects.push(project);
    },
    unarchiveProject: (state, action) => {
      const project = state.archivedProjects[action.payload];
      state.archivedProjects = state.archivedProjects.filter((_, i) => i !== action.payload);
      state.activeProjects.push(project);
    },
    toggleFavorite: (state, action) => {
      const project = action.payload;
      const isFavorite = state.favoriteProjects.some(
        favProject => favProject.name === project.name,
      );

      if (isFavorite) {
        state.favoriteProjects = state.favoriteProjects.filter(
          favProject => favProject.name !== project.name,
        );
      } else {
        state.favoriteProjects.push(project);
      }
    },
  },
});

export const { addProject, archiveProject, unarchiveProject, toggleFavorite } = projectSlice.actions;

export default projectSlice.reducer;
