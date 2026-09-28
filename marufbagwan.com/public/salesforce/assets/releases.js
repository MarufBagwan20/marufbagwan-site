/*
  Release tracker data. Add a new release object at the top when the next one lands.
  status: "GA" | "Beta" | "Developer Preview" | "Release Update" | "New" | "Removed"
*/
window.RELEASES = [
  {
    name: "Winter '27",
    notesUrl: "https://help.salesforce.com/s/articleView?language=en_US&id=release-notes.salesforce_release_notes.htm&release=264&type=5",
    dates: [
      { date: "2026-08-19", label: "Release notes published" },
      { date: "2026-08-28", label: "Sandbox preview starts" },
      { date: "2026-09-04", label: "Production wave 1" },
      { date: "2026-10-02", label: "Production wave 2" },
      { date: "2026-10-09", label: "Production wave 3" }
    ],
    features: [
      { area: "Development", status: "New", title: "Higher Apex heap limits", text: "Synchronous heap rises from 6 MB to 10 MB and asynchronous heap from 12 MB to 25 MB." },
      { area: "Development", status: "Beta", title: "Compare field values in SOQL with FORMULA()", text: "Use the FORMULA() function to compare and calculate across fields directly in a WHERE clause." },
      { area: "Development", status: "Beta", title: "Apex Symbol API", text: "Returns complete type metadata for Apex code, useful for tooling and static analysis." },
      { area: "Development", status: "Developer Preview", title: "ApexIntegrationTests", text: "Test external service integrations against real responses instead of only mocks." },
      { area: "Flow", status: "Beta", title: "Flow Test Mode", text: "A dedicated test mode for automations that replaces the traditional Debug mode." },
      { area: "Flow", status: "New", title: "Screen flows for multiple records", text: "Run screen flows on several selected records from list views and related lists." },
      { area: "Flow", status: "Removed", title: "Flow Tags and Tag Categories", text: "Announced for Winter '27 but pulled from the release in September. Salesforce hasn't said when it will return." },
      { area: "Reports", status: "Beta", title: "Preview records from Lightning Reports", text: "Open a record in a side panel without leaving the report." },
      { area: "Reports", status: "Beta", title: "Reports and dashboards on LWR sites", text: "Embed Lightning Reports and Dashboards in Lightning Web Runtime Experience Cloud sites, previously Aura-only." },
      { area: "Reports", status: "Beta", title: "Matching records across joined report blocks", text: "Show only records that appear in every block of a joined report." },
      { area: "Admin", status: "New", title: "Keep manual shares when transferring records", text: "Manual shares are kept when record ownership changes instead of being removed." },
      { area: "Admin", status: "New", title: "More flexible inline editing in list views", text: "Edit any accessible field, including across multiple record types." },
      { area: "Admin", status: "GA", title: "Field History Tracking on User", text: "Track changes to up to 20 fields on the User object." },
      { area: "Admin", status: "New", title: "Follow button in the Dynamic Highlights Panel", text: "Let users follow a record to get its updates in their feed." },
      { area: "Admin", status: "New", title: "Setup with Agentforce", text: "Manage Dynamic Actions, create related lists and customise health dashboards using natural language." },
      { area: "Security", status: "Release Update", title: "Profile Filtering", text: "Users can see only their own profile unless they are granted broader permissions." },
      { area: "Security", status: "New", title: "View Setup Audit Trail permission", text: "Grant access to the audit trail without the broader View Setup permission." },
      { area: "Security", status: "New", title: "SOAP login() needs the Use Any API permission", text: "Integrations that authenticate with SOAP API login() must have the Use Any API permission." },
      { area: "Sales", status: "New", title: "AI-suggested follow-ups after meetings", text: "Einstein Conversation Insights proposes next actions once a meeting ends." },
      { area: "Sales", status: "New", title: "Voice notes in the mobile app", text: "Capture insights by voice in the Salesforce mobile app." },
      { area: "Sales", status: "New", title: "Richer pipeline forecasting", text: "Forecasts now surface deal risks and activity trends." },
      { area: "Service", status: "Beta", title: "Redesigned Enhanced Case Merge", text: "A new case merge UI with configuration in one place." },
      { area: "Service", status: "New", title: "Case attachments inline", text: "See original case attachments inside the case description." },
      { area: "Service", status: "New", title: "Delete outdated case milestones", text: "Remove old milestones from the case timeline." },
      { area: "Marketing", status: "New", title: "Marketing Goals and Content agents", text: "Agents that turn business goals into campaign strategy and generate on-brand content." }
    ],
    sources: [
      { label: "Salesforce Help: Winter '27 release notes", url: "https://help.salesforce.com/s/articleView?language=en_US&id=release-notes.salesforce_release_notes.htm&release=264&type=5" },
      { label: "Salesforce Admins: Winter '27 release countdown", url: "https://admin.salesforce.com/blog/2026/admin-winter-27-release-countdown" },
      { label: "Salesforce Ben: Winter '27, everything you need to know", url: "https://www.salesforceben.com/salesforce-winter-27-release-everything-you-need-to-know-before-go-live/" },
      { label: "Salesforce Ben: Top 12 Winter '27 features for admins", url: "https://www.salesforceben.com/top-12-salesforce-winter-27-features-for-admins/" }
    ]
  }
];
