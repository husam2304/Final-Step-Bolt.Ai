const apiEndpoint = {
  Auth: {
    Login: `/Account/Login`, //Login
    ForgotPassword: `/Account/ForgotPassword/forgot-password`, //Send Link to Email
    ResetPassword: (email) => `/Account/ResetPassword?email=${email}`, // acept new pass when forget
    StudentRegestartion: `/Account/AddNewUser`, //Regestartion
    DoctorRegestartion: `/Account/AddNewDoctor`, // need to change when get true backend
    Logout: (refreshToken) => `/Account/Logout?refreshToken=${refreshToken}`, //Logout
    RefreshToken: `/Account/RefreshToken`, //RefreshToken
    GetCurrentUserInfo: `/Account/GetUserInfo`, // user info
  },
  Project: {
    CreateProject: `/Project/AddNewProject`, //Create Project
    GetProjectById: (ProjectId) => `/Project/GetProjectById/${ProjectId}`, //Get  Project By Id
    GetAllProjects: `/Project/GetAllProjects`, //Get  Projects
    UpdateProject: (ProjectId) => `/Project/UpdateProject/${ProjectId}`, //Edit Project
    DeleteProject: (ProjectId) => `/Project/DeleteProject/${ProjectId}`, //Delete Project
    RequestSupervisor: `/SupervisionRequest/Submit`,
    RemoveMember: `/Project/RemoveMember`,
    LeaveTeam: `/Project/LeaveTeam`,
  },
  Technology: {
    AddTechnology: `/Technology/AddTechnology`, //Add Technology
    GetTechnology: `Technology/GetAllTechnologys`, //Get All Technology
    GetTechnologyById: (id) => `/Technology/GetTechnologyById/${id}`, //Get Technology By Id
    UpdateTechnology: (id) => `/Technology/UpdateTechnology/${id}`, //Update Technology
    DeleteTechnology: (id) => `/Technology/DeleteTechnology/${id}`, //Delete Technology
  },
  Student: {
    ActivatSearshTeam: `/Student/GetAvailableStudents`,
  },
  Supervisor: {
    getAllSupervisors: `/Supervisor/GetSupervisors`,
  },
  openAI: {
    getResultPrompt: `/Chat/message`,
    start: `/Chat/session`,
    delete: (sessionId) => `/Chat/session/${sessionId}`,
  },
  Search: {
    AdvancedSearch: `/Search/AdvancedSearch`,
    GetProjectsByProjectType: `/Search/GetProjectsByProjectType`,
  },

  // need to be sure is it the same as backend 
  signalR: {
    notificationHub: `$/NotificationHub`,
  },
  notifications: {
    getNotifications: `/Notifications/AllNotifications`,
    getUnreadCount: `/Notifications/unread-count`,
    markAsRead: (id) => `/Notifications/${id}/read`
  },
};
export default apiEndpoint;
