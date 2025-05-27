# Contact Us Forms Using Payload CMS

## Overview

1. This application has 3 types of user:

- Super Admin (Can access every fields of the application)
- Tenant Admin (Specially made to handle tenants)
- User (Normal user with restricted permissions)

2. `Supabase` is used as database provider.
3. `FormBuilder` plugin has been used to generate forms and handling form submission.
4. This application has an interactive UI for navigating to different forms.
5. This application uses `multi-tenancy` for form creation and form submission.
6. Every tenants has differnt types of users. Each tenant can only access their forms and form submissions.

## Steps Followed to Implement Form Builder and Multitenancy

1. Installed the required dependencies.

```
npm install @payloadcms/plugin-form-builder @payloadcms/plugin-multi-tenant
```

2. Added roles field (super-admin, tenant-admin, user) in the `Users` collection.
3. Created a `Tenant` collection with basic field requirements (name, slug, domain).
4. Added the form builder plugin and multi tenant plugin in the `payload.config.ts` file's plugin section.
5. Configured the formbuilder plugin (Only text, email and placeholder field will be available to create a form).
6. Gave the form creation and updation access to the super-admin and tenant-admin only.
7. Created a form UI to fetch and show the form and submit the response through the form using correspondig APIs.
8. Configured the multi tenant plugin. Integrated it with the Tenant collection for choosing the tenant.
9. Enbled auto tenant enabling feature for form creation and submission.
10. Gave the tenant creation access to super-admin and tenant-admin. Only super-admin can update a tenant.
11. Set the logic to give full access to the super admin to view every tenants, forms and form submissions.
12. Set the access type (admin, editor, viewer) for the tenant.

## Prerequisites

1. `Node.js` should be installed (v20.0.9+).
2. `Supabase` setup.

## Installation Guide

1. Clone the repository

```
git clone https://github.com/asheshmandal2003/CRM.git
```

2. Navigate to the repository

```
cd ./CRM
```

3. Install the dependencies.

```
npm install
```

4. Setup environment variables as per the `.env.example` file.
5. Run the application

```
npm run dev
```

6. Access the application at `http://localhost:3000`

## API Endpoints:

1. For fetching the form details:

```
GET http://localhost:3000/api/forms/[id]
```

Here [id] is the form ID.

2. For the form submission:

```
POST http://localhost:3000/api/form-submissions
```

Access the API endpoints from Postman: [LINK](https://bold-resonance-366154.postman.co/workspace/Team-Workspace~e95a3359-7e45-4241-8fc4-4809c33c28d5/collection/24146533-46190239-dd05-4ffd-bc20-511239d906fc?action=share&creator=24146533)

## Permissions

1. **Super Admin**

- Super admin can track every users, tenats, forms and form-submissions.
- Super admin can only create, update and delete anything in the application.

2. **Tenant Admin**

- Tenat admin can view only the assigned forms and corresponding form submissions.

3. **User**

- Users have only form submission access.
