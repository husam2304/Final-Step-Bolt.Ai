# Sprint 3 & 4 - Frontend Tasks Division

## Team Members
- **Husam** - Frontend Developer
- **Tariq** - Frontend Developer

---

## SPRINT 3 - Task Division

### 🟦 HUSAM's Tasks

#### 1. Outlook OAuth Registration

**User Story:** *As a user, I want to register via Outlook to enter data quickly.*

**New Files to Create:**
- `src/services/Outlook.service.js` - Handle Microsoft OAuth flow // later
- `src/Pages/Auth/OutlookCallback.jsx` - Handle OAuth redirect // later
- `src/components/Auth/OutlookButton.jsx` - Outlook login button component // later 

**Files to Modify:**
- `src/Pages/Auth/RegistrationPage.jsx` - Add Outlook registration option  ✓
- `src/Pages/Auth/LoginPage.jsx` - Add Outlook login option ✓
- `src/services/APi/adpiEndpoints.js` - Add Outlook endpoints // later
- `src/routes/routers/AppRoute.jsx` - Add OAuth callback route // later

---

#### 2. Account Deletion

**User Story:** *As a user, I want to be able to delete my account because my graduation project has ended.*

**New Files to Create:**
- `src/Pages/Profile/SettingsPage.jsx` - User settings page   
- `src/components/Models/DeleteAccount.jsx` - Delete account confirmation modal
- `src/components/UI/Buttons/DeleteAccountButton.jsx` - Delete button component
- `src/services/Account.service.js` - Account management API calls

**Files to Modify:**
- `src/services/APi/adpiEndpoints.js` - Add delete account endpoint  
- `src/routes/routers/AppRoute.jsx` - Add settings route 
- `src/components/Layouts/Header.jsx` - Add settings link in user menu
- `src/assets/styles/Pages/SettingsPage.css` - Styling for settings page

---

### 🟩 TARIQ's Tasks

#### 1. Edit Account Information

**User Story:** *As a user, I want to be able to edit my account information to correct the data.*

**New Files to Create:**
- `src/Pages/Profile/EditProfilePage.jsx` - Edit profile form page
- `src/components/Forms/EditProfileForm.jsx` - Reusable form component
- `src/components/UI/Buttons/SaveProfileButton.jsx` - Save changes button

**Files to Modify:**
- `src/services/Account.service.js` - Add update account methods
- `src/services/APi/adpiEndpoints.js` - Add update account endpoints
- `src/routes/routers/AppRoute.jsx` - Add edit profile route
- `src/assets/styles/Pages/ProfilePage.css` - Styling for profile pages
- `src/components/Layouts/Header.jsx` - Add edit profile link

---

#### 2. Authentication Notifications (University Account)

**User Story:** *As a user, I want to receive notifications via my university account for the authentication process.*

**New Files to Create:**
- `src/services/Notification.service.js` - Email notification API calls
- `src/components/Notifications/EmailNotification.jsx` - Email notification UI component

**Files to Modify:**
- `src/Pages/Auth/RegistrationPage.jsx` - Add notification on registration ✓
- `src/Pages/Auth/UpdatePassword.jsx` - Add notification on password change ✓
- `src/services/APi/adpiEndpoints.js` - Add email notification endpoints ✓

---

## SPRINT 4 - Task Division

### 🟦 HUSAM's Tasks

#### 1. Platform Notifications System (SignalR)

**User Story:** *As a user, I want to receive notifications via the platform to find out about the latest updates.*

**New Files to Create:**
- `src/services/SignalR.service.js` - SignalR connection and hub management ✓
- `src/components/Notifications/NotificationCenter.jsx` - Notification dropdown/panel ✓
- `src/components/Notifications/NotificationItem.jsx` - Single notification component ✓
- `src/components/Notifications/NotificationBadge.jsx` - Unread count badge ✓
- `src/hooks/useNotifications.jsx` - Custom hook for notifications ✓
- `src/store/NotificationStore.js` - State management for notifications ✓
- `src/assets/styles/Components/Notifications.css` - Notification styling ✓

**Files to Modify:**
- `src/components/Layouts/Header.jsx` - Add notification bell icon ✓
- `src/services/APi/adpiEndpoints.js` - Add notification endpoints ✓
- `src/App.jsx` - Initialize SignalR connection ✓
- `package.json` - Add `@microsoft/signalr` dependency ✓

---

#### 2. Welcome Notification on Login

**User Story:** *As a user, I would like to receive a welcome notification when I log in to the site so that I can start using it.*

**New Files to Create:**
- `src/components/Notifications/WelcomeToast.jsx` - Welcome toast component  ✓

**Files to Modify:**
- `src/Pages/Auth/LoginPage.jsx` - Trigger welcome notification after login ✓ 
- `src/services/SignalR.service.js` - Add welcome notification logic ✓
- `src/store/AuthStrore.js` - Dispatch welcome notification on login ✓

---

#### 3. Display Project/Supervisor Evaluations

**User Story:** *Display project or supervisor evaluations so that I can distinguish between the positives and negatives of each one.*

**New Files to Create:**
- `src/Pages/Evaluations/EvaluationsPage.jsx` - Main evaluations page 
- `src/components/Evaluations/EvaluationCard.jsx` - Single evaluation display
- `src/components/Evaluations/EvaluationFilters.jsx` - Filter evaluations
- `src/components/Evaluations/RatingDisplay.jsx` - Star rating display component
- `src/services/Evaluation.service.js` - Evaluation API calls
- `src/assets/styles/Pages/EvaluationsPage.css` - Evaluation page styling

**Files to Modify:**
- `src/services/APi/adpiEndpoints.js` - Add evaluation endpoints
- `src/routes/routers/AppRoute.jsx` - Add evaluations route
- `src/components/Layouts/Header.jsx` - Add evaluations link to navigation
- `src/Pages/ProjectDetails.jsx` - Show evaluations in project details

---

### 🟩 TARIQ's Tasks

#### 1. Systematic Plan Section

**User Story:** *As a student, I want a section that contains a systematic plan to help me get started with my project.*

**New Files to Create:**
- `src/Pages/Guide/SystematicPlanPage.jsx` - Main plan page ✓
- `src/components/Guide/PlanStep.jsx` - Individual step component ✓
- `src/components/Guide/PlanProgress.jsx` - Progress tracker ✓
- `src/components/Guide/PlanTimeline.jsx` - Timeline visualization ✓
- `src/services/Guide.service.js` - Fetch plan data from backend ✓
- `src/assets/styles/Pages/GuidePage.css` - Guide page styling ✓

**Files to Modify:**
- `src/services/APi/adpiEndpoints.js` - Add guide endpoints  ✓
- `src/routes/routers/AppRoute.jsx` - Add systematic plan route  ✓
- `src/components/Layouts/Header.jsx` - Add guide link to navigation  ✓
- `src/Pages/Home/HomePage.jsx` - Add link to systematic plan in hero/how-to-start ✓

---

#### 2. Supervisor Evaluation Form

**User Story:** *As a student, I would like to evaluate the supervisor who supervised me after the project ended to help other students identify a good supervisor.*

**New Files to Create:**
- `src/Pages/Evaluations/SubmitEvaluationPage.jsx` - Evaluation submission page
- `src/components/Forms/EvaluationForm.jsx` - Evaluation form component
- `src/components/UI/Buttons/SubmitEvaluationButton.jsx` - Submit button
- `src/components/Evaluations/RatingInput.jsx` - Star rating input component
- `src/components/Models/EvaluationSuccess.jsx` - Success modal after submission

**Files to Modify:**
- `src/services/Evaluation.service.js` - Add submit evaluation method
- `src/services/APi/adpiEndpoints.js` - Add submit evaluation endpoint
- `src/routes/routers/AppRoute.jsx` - Add evaluation submission route
- `src/Pages/ProjectDetails.jsx` - Add "Evaluate Supervisor" button
- `src/assets/styles/Pages/EvaluationsPage.css` - Form styling

---

## 📊 Workload Summary

| Person | Sprint 3 | Sprint 4 | Total Files | Complexity Level |
|--------|----------|----------|-------------|------------------|
| **Husam** | 2 stories (12 files) | 3 stories (15 files) | **27 files** | High (OAuth + SignalR) |
| **Tariq** | 2 stories (9 files) | 2 stories (14 files) | **23 files** | Medium (Forms + Content) |

---

## ⚠️ Important Notes

### Dependencies to Install

**Husam's Dependencies:**
```bash
npm install @microsoft/signalr
# Microsoft OAuth library (check with backend for specific package)
```

**Shared Dependencies:**
- Toast notification library (if not using existing `ToastProvider.jsx`)

---

### Shared Files

**`src/services/Account.service.js`**
- Both developers will work on this file
- Husam: delete account methods
- Tariq: update account methods
- **Recommendation:** Create base file structure together or coordinate who creates it first

---

### Integration Points

1. **Notification System Integration**
   - Husam's notification system will be used by Tariq's evaluation success messages
   - Ensure notification service is completed before evaluation form completion feedback

2. **Evaluation Data Flow**
   - Husam's evaluation display page will show evaluations submitted through Tariq's form
   - Coordinate on evaluation data structure

---

### Recommended Development Order

#### Sprint 3
1. Create `Account.service.js` base structure (coordinate between both)
2. Develop features in parallel
3. Test integration points

#### Sprint 4
1. **Husam:** Build notification system infrastructure first
2. **Tariq:** Can start systematic plan (independent feature)
3. Once notification system is ready, both can integrate it into their features
4. **Husam:** Complete evaluation display
5. **Tariq:** Complete evaluation form (uses Husam's service file)

---

## 🚀 Getting Started

### For Husam
1. Sprint 3: Start with Outlook OAuth integration research and setup
2. Sprint 4: Begin SignalR service setup and notification infrastructure

### For Tariq
1. Sprint 3: Start with Edit Profile page structure and form validation
2. Sprint 4: Begin Systematic Plan page with backend API integration

---

## 📝 Notes

- **Duplicate Story:** The authentication notification story appeared in both sprints - clarify with team if this is intentional
- **Code Review:** Schedule regular code reviews to ensure consistency in coding style
- **API Coordination:** Coordinate with backend team for endpoint specifications
- **Testing:** Each developer is responsible for unit testing their components

---

## 📞 Contact

For questions or clarification:
- **Husam:** [Add contact info]
- **Tariq:** [Add contact info]

---

**Last Updated:** October 30, 2025  
**Project:** Final Step - Graduation Project Management Platform
