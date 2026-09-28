/*
  Quiz question bank. Add questions to any topic, or add a new topic.
  a = index of the correct option (0-based). Backticks in text render as code.
*/
window.QUIZ = [
  // ---------- Apex ----------
  { topic: "Apex", q: "How many SOQL queries can a single synchronous Apex transaction run?",
    o: ["50", "100", "150", "200"], a: 1,
    e: "The synchronous limit is 100 SOQL queries per transaction. Asynchronous Apex gets 200." },
  { topic: "Apex", q: "What is the maximum number of DML statements in one Apex transaction?",
    o: ["100", "150", "200", "10,000"], a: 1,
    e: "150 DML statements per transaction. 10,000 is the limit on rows processed by DML, not statements." },
  { topic: "Apex", q: "In a trigger, which context lets you change field values on `Trigger.new` without an extra DML statement?",
    o: ["after insert", "after update", "before insert and before update", "after undelete"], a: 2,
    e: "Records in `Trigger.new` are writable in before triggers. In after triggers they are read-only." },
  { topic: "Apex", q: "Which asynchronous option supports chaining jobs and passing non-primitive types such as sObjects?",
    o: ["@future methods", "Queueable Apex", "Scheduled Apex", "Platform Event triggers"], a: 1,
    e: "Queueable Apex accepts complex types as member variables and can enqueue a follow-on job. @future only takes primitives and can't chain." },
  { topic: "Apex", q: "What is the default scope (records per `execute` call) for Batch Apex?",
    o: ["100", "200", "500", "2,000"], a: 1,
    e: "The default is 200. You can pass a scope of up to 2,000 to `Database.executeBatch`." },
  { topic: "Apex", q: "What causes a MIXED_DML_OPERATION error?",
    o: ["Inserting more than 10,000 rows", "DML on setup objects (like User) and non-setup objects in the same transaction", "Calling DML inside a loop", "Using `Database.insert` with allOrNone = false"], a: 1,
    e: "Setup objects (User, Group, PermissionSetAssignment…) can't be modified alongside ordinary records in one transaction. Move one side to async Apex." },
  { topic: "Apex", q: "From Winter '27, what is the synchronous Apex heap size limit?",
    o: ["6 MB", "10 MB", "12 MB", "25 MB"], a: 1,
    e: "Winter '27 raises the synchronous heap from 6 MB to 10 MB, and asynchronous heap from 12 MB to 25 MB." },

  // ---------- LWC ----------
  { topic: "LWC", q: "Which decorator makes a Lightning Web Component property public so a parent can set it?",
    o: ["@track", "@wire", "@api", "@public"], a: 2,
    e: "`@api` exposes a public property or method. `@track` is for deep reactivity on objects and arrays; `@public` doesn't exist." },
  { topic: "LWC", q: "What must an Apex method have to be called with `@wire`?",
    o: ["@AuraEnabled(cacheable=true)", "@InvocableMethod", "@RemoteAction", "@HttpGet"], a: 0,
    e: "Wired Apex must be `@AuraEnabled(cacheable=true)`, which also means it can't perform DML." },
  { topic: "LWC", q: "What's the standard way for a child component to send data up to its parent?",
    o: ["Set a property on the parent directly", "Dispatch a CustomEvent", "Use a global variable", "Call `refreshApex`"], a: 1,
    e: "The child dispatches a `CustomEvent` (optionally with a `detail` payload) and the parent listens with an `on<eventname>` handler." },
  { topic: "LWC", q: "Two components on the same Lightning page have no parent-child relationship. What should they use to communicate?",
    o: ["Lightning Message Service", "Application events", "`@api` methods", "Platform Events"], a: 0,
    e: "Lightning Message Service works across the DOM, and even between LWC, Aura and Visualforce on the same page." },

  // ---------- Integration ----------
  { topic: "Integration", q: "What is the main purpose of a Named Credential?",
    o: ["Store a user's password for login", "Define a callout endpoint and its authentication in one place", "Grant API access to a profile", "Encrypt field data at rest"], a: 1,
    e: "Named Credentials (with External Credentials) hold the endpoint and auth, so no URLs or secrets are hard-coded in Apex." },
  { topic: "Integration", q: "What is the maximum number of callouts in a single Apex transaction?",
    o: ["10", "50", "100", "Unlimited"], a: 2,
    e: "100 callouts per transaction, with a combined maximum timeout of 120 seconds." },
  { topic: "Integration", q: "You need to load several million records into Salesforce overnight. Which API fits best?",
    o: ["REST API", "SOAP API", "Bulk API 2.0", "Streaming API"], a: 2,
    e: "Bulk API 2.0 processes large data sets asynchronously in batches, designed for exactly this volume." },
  { topic: "Integration", q: "An external system must react to changes in Salesforce in near real time without polling. Which is the best fit?",
    o: ["Scheduled export to FTP", "Change Data Capture or Platform Events via the Pub/Sub API", "A report subscription", "Outbound email"], a: 1,
    e: "Event-driven integration with Change Data Capture or Platform Events lets subscribers receive changes as they happen." },

  // ---------- Security ----------
  { topic: "Security", q: "Which Apex class keyword enforces the running user's sharing rules?",
    o: ["without sharing", "with sharing", "inherited sharing", "global"], a: 1,
    e: "`with sharing` enforces record sharing. `inherited sharing` takes the caller's mode, and `without sharing` ignores it." },
  { topic: "Security", q: "Which SOQL clause enforces the running user's object permissions, field-level security and sharing?",
    o: ["WITH USER_MODE", "FOR VIEW", "WITH SYSTEM_MODE", "USING SCOPE mine"], a: 0,
    e: "`WITH USER_MODE` runs the query with the user's permissions, FLS and sharing applied." },
  { topic: "Security", q: "What should Organization-Wide Defaults be set to?",
    o: ["The most open access any user needs", "The most restrictive access, then open up with sharing", "Always Public Read/Write", "Private for every object"], a: 1,
    e: "Set OWDs to the most restrictive level needed, then grant wider access with the role hierarchy, sharing rules and teams." },

  // ---------- Architecture ----------
  { topic: "Architecture", q: "Which configuration store lets you deploy its records as metadata between orgs?",
    o: ["List Custom Settings", "Hierarchy Custom Settings", "Custom Metadata Types", "Custom Labels only"], a: 2,
    e: "Custom Metadata Type records are metadata, so they move with change sets, packages and the Metadata API." },
  { topic: "Architecture", q: "On an object with millions of records, what most improves SOQL performance?",
    o: ["Adding more fields to the SELECT", "Selective filters on indexed fields", "Using ORDER BY on every query", "Sorting results in Apex"], a: 1,
    e: "Selective filters on indexed fields (Id, Name, external IDs, custom indexes) let the query optimiser avoid full scans." },
  { topic: "Architecture", q: "What's the main benefit of a trigger framework such as the trigger handler / factory pattern?",
    o: ["It removes all governor limits", "One trigger per object with logic in testable handler classes and controlled order of execution", "It makes triggers run asynchronously", "It replaces the need for unit tests"], a: 1,
    e: "A single trigger delegating to handlers keeps logic organised, testable and easy to switch off, and makes execution order predictable." },

  // ---------- Flow & OmniStudio ----------
  { topic: "Flow & OmniStudio", q: "Which record-triggered flow option runs before the record is saved and is fastest for same-record field updates?",
    o: ["Actions and Related Records", "Fast Field Updates", "Run Asynchronously", "Scheduled Paths"], a: 1,
    e: "Fast Field Updates runs before save, updating the triggering record without an extra DML." },
  { topic: "Flow & OmniStudio", q: "In OmniStudio, which tool runs several server-side actions (data mappers, HTTP calls, Apex) in a single call?",
    o: ["FlexCard", "OmniScript", "Integration Procedure", "Data Mapper Turbo Extract"], a: 2,
    e: "Integration Procedures orchestrate multiple server-side steps in one round trip, with optional caching." },
  { topic: "Flow & OmniStudio", q: "What does an OmniStudio Data Mapper (formerly DataRaptor) Extract do?",
    o: ["Renders a UI card", "Reads Salesforce data and maps it to a JSON structure", "Schedules batch jobs", "Deploys metadata"], a: 1,
    e: "A Data Mapper Extract reads from one or more objects and shapes the output into JSON for OmniScripts, FlexCards or Integration Procedures." }
];
