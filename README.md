# Amlak Arad — React Admin Panel

## Overview

A React-based administrative panel for real-estate operations, including authentication, personnel management, property-related workflows, settings, and API-backed data management.

## Technical Stack

- React 18
- React Router 6
- Axios
- Formik + Yup
- JWT decoding
- Tailwind CSS
- React Toastify / SweetAlert2
- Jalali date handling

## Architecture

The application is organized as a client-side React application with routed pages, reusable components, service helpers, form validation, authentication state stored in browser storage, and HTTP calls to a backend API.

## Verified Features

- Authentication and login flow
- JWT-based client session handling
- Personnel management
- Settings management
- Real-estate data workflows
- Form validation with Formik/Yup
- API abstraction through Axios
- Persian/Jalali date handling

## Development

Install dependencies with `npm install`, then run `npm start`.

Create a production build with `npm run build`.

## Configuration

SMS delivery now requires a server-side proxy configured through `REACT_APP_SMS_PROXY_URL`. Provider credentials must remain on the server and must **not** be placed in React environment variables or browser code.

## Security

The public snapshot previously contained an SMS-provider credential in browser-side source. The current branch removes that credential from the client and routes SMS requests through a configurable server-side proxy.

**Important:** removing a credential from the current source does not invalidate copies that may exist in Git history. Any credential that was exposed in the historical repository should be revoked/rotated with the provider before this project is treated as a safe public deployment.

Client-side JWT storage and the existing authentication design should also be reviewed before production use.

## Repository Scope

This repository is a historical frontend application snapshot. Backend services, production infrastructure, customer data, and third-party credentials are not included.

## Project Status

Historical portfolio snapshot. The source is useful for demonstrating React application structure and API-driven admin workflows, but a clean end-to-end production deployment is not claimed.

## License

No first-party license has been established for this historical source. Public visibility does not by itself grant reuse rights.
