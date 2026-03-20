# Blinkit

Blinkit is a full-stack e-commerce web application inspired by quick-commerce experiences.
It allows users to browse products, search in real time, add items to a cart, and manage
quantities with a responsive cart flow that works on both desktop and mobile.

## Project Overview

This repository is organized into two main parts:

- Frontend: A React + Vite application with Zustand for state management.
- Backend: A Node.js + Express API for user-related operations.

The UI includes a dynamic product catalog, authentication flow, and a cart modal
experience similar to modern grocery delivery platforms.

## Main Features

- Product listing and search experience.
- Add, increase, and decrease product quantities from product cards.
- Cart state with total items and total price calculation.
- Responsive cart UI:
- Mobile: bottom fixed cart bar and full-screen cart modal.
- Desktop: cart summary in header and side modal/cart panel behavior.
- Basic login/register flow integration.

## Built with
- Mobile-first workflow
- Zustand
- Vite
- React - JS library
- Tailwind CSS
- Node.js
- Express
- [Platzi Fake Store API](https://fakeapi.platzi.com/)

## API Data Disclaimer

This project uses the public Platzi Fake Store API.
Because it is shared and writable by many users, the data can change at any time.

You may occasionally find issues such as:

- Products with missing or broken images.
- Products renamed with unexpected or inconsistent titles.
- Products removed or newly added without notice.
- Invalid or unusual prices, descriptions, or categories.
- Temporary API instability, slow responses, or inconsistent payloads.

If something looks incorrect in the catalog, it is usually caused by upstream API data changes rather than this application's UI logic. Those problems are resolved after a while. 