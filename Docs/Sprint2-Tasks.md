# Sprint 2 Frontend Task Division

## Team Assignment Overview

### 👨‍💻 **Developer 1 (Husam) - Authentication & User Management**
**Focus Area:** User registration, authentication flows, and user-related components

### 👨‍💻 **Developer 2 (Tariq) - Project & Team Management**  
**Focus Area:** Project operations, team management, and project-related components

---

## 🔥 **Developer 1 (Husam) Tasks**

### 📄 **Pages to Create**
```
├── Pages/Auth/DoctorRegistration.jsx  ✔ api  X wait to Osama
└── Pages/Students/ProjectsPage.jsx ✔ api ✔
```

**Page Details:**
- **DoctorRegistration.jsx**: Complete registration form for supervisors with role-specific fields ✔ api ✔
- **FindStudents.jsx**: Student discovery interface with search, filters, and invitation functionality ✔ api ✔

### 🎴 **Components to Create**
```
├── components/Cards/SupervisorCard.jsx  ✔ api ✔
├── components/Cards/StudentCard.jsx ✔ api ✔
├── components/Models/SupervisorRequest.jsx  ✔ api ✔
├── components/Models/InviteStudent.jsx  ✔  api ✔
├── components/Models/RemoveMember.jsx  ✔ 
├── components/HomePage/CardsView.jsx ✔ api ✔
├── components/AIChat/ChatBot.jsx  ✔ 
└── components/layouts/Header.jsx ✔ 
```

**Component Details:**
- **SupervisorCard.jsx**: Display supervisor information, ratings, specialties, and contact options 
- **StudentCard.jsx**: Show student profiles with skills, availability, and team status
- **SupervisorRequest.jsx**: Modal for students to request supervision with supervisor selection 
- **InviteStudent.jsx**: Modal for sending student invitations 
- **ConfirmModel.jsx**: Reusable confirmation modal (delete, leave, etc.)
- **CardsView.jsx**:  Layout section that renders any projects, supervisors, or student cards in a grid or list view.  
- **ChatBot.jsx**:  Flyout AI-powered chat assistant to help users with navigation, project guidance.  
- **Header.jsx**: Main header of all Pages
### 🔘 **Buttons to Create**
```
├── components/UI/Buttons/InviteStudentButton.jsx  ✔ api ✔
├── components/UI/Buttons/RequestSupervisionButton.jsx  ✔ api ✔
├── components/UI/Buttons/ChatBotButton.jsx  ✔ 
└── components/UI/Buttons/RemoveMemberButton.jsx  ✔
```

**Button Details:**
- **InviteStudentButton.jsx**: Send team invitations to students
- **RequestSupervisionButton.jsx**: Request supervision from selected supervisor
- **RemoveMemberButton.jsx**: Remove team members with reason confirmation
- **ChatBotButton.jsx**:  open the flyout and start conversion with ai 
---

## 🔥 **Developer 2 (Tariq) Tasks**

### 📄 **Pages to Create**
```
└── Pages/Projects/BrowseProjects.jsx
```

**Page Details:**
- **BrowseProjects.jsx**: Project discovery interface with semester filtering, search, and detailed project views

### 🎴 **Components to Create**
```
├── components/Cards/ProjectCard.jsx
├── components/Models/EditProject.jsx
├── components/Models/ConfirmModel.jsx
├── components/Models/LeaveTeam.jsx
├── components/HomePage/HowToStart.jsx
├── components/HomePage/statistics.jsx
├── components/HomePage/Hero.jsx
└── components/Layouts/Footer.jsx
```

**Component Details:**
- **ProjectCard.jsx**: Display project information, team status, technologies, and action buttons
- **EditProject.jsx**: Modal for project owners to modify project details and settings
- **ReasonModel.jsx**: Modal for removing a student/team member or leave with reason 
- **Hero.jsx**: Main landing section with headline, subtext,searchBar, and primary call-to-action 
- **HowToStart.jsx**: Guide section showing the steps for start graduation project 
- **statistics.jsx**: Section that highlights key platform numbers such as active users, total projects, technologies used, and collaborations made
- **Footer.jsx**: Main Footer of all Pages with navigation links, contact information, and social media icons

### 🔘 **Buttons to Create**
```
├── components/UI/Buttons/EditProjectButton.jsx
├── components/UI/Buttons/DeleteProjectButton.jsx
├── components/UI/Buttons/StartNow.jsx
└── components/UI/Buttons/LeaveTeamButton.jsx
```

**Button Details:**
- **EditProjectButton.jsx**: Open project edit modal for team leaders
- **DeleteProjectButton.jsx**: Delete project with confirmation dialog
- **LeaveTeamButton.jsx**: Allow team members to leave team with confirmation
- **StartNow.jsx**: Navigate to all project page or what ever 

---

## 🔗 **Shared Dependencies & Coordination**

### 🤝 **Integration Points**
- **StudentCard** (Husam) ↔ **ProjectCard** (Tariq): Student invitation to projects
- **SupervisorRequest** (Husam) ↔ **EditProject** (Tariq): Adding supervisors to projects
- Shared styling consistency across all cards and modals

### 📚 **Shared Services to Update**
Both developers will need to coordinate on:
- `services/Student.service.js` - Student-related API calls
- `services/Project.service.js` - Project-related API calls
- `services/Team.service.js` - Team management API calls (new)
- `services/Supervisor.service.js` - Supervisor-related API calls (new)

### 🎨 **Shared Styling**
- Card components should follow consistent design patterns
- Modal components should use shared modal base styles
- Button components should maintain consistent styling from existing buttons


---

## ✅ **Definition of Done**
- [ ] All components are responsive and mobile-friendly
- [ ] Components follow established design system
- [ ] All buttons are properly placed in `components/UI/Buttons/` directory
- [ ] Proper error handling and loading states
- [ ] Components are properly exported in index.js files


---

## 🚀 **Getting Started**
1. Create feature branches: `feature/sprint2-husam-tasks` and `feature/sprint2-tariq-tasks`
2. Set up component structure and basic layouts
3. Merge to `front` branch when complete
