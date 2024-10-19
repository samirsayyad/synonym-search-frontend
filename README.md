# **Synonym Search Tool Frontend**

This is the frontend of the Synonym Search Tool, built using **React.js**. The frontend provides a user-friendly interface to search for synonyms and add new synonyms. It is designed to be responsive and easily extensible.

[Live demo](https://synonym-search-frontend-14e02c2a5a9d.herokuapp.com)

[Api Repo](https://github.com/samirsayyad/synonym-search-api)

## **Table of Contents**

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Component Breakdown](#component-breakdown)
- [Run Locally](#run-locally)

---

## **Features**

- Search for synonyms of a word.
- Add new synonyms.
- Delete Synonym
- Clear and responsive design.
- State management using **React Hooks**.
- Optimized UX with **loading indicators** and **error handling**.

## **Technologies**

- **React.js** (frontend framework)
- **Axios** (for HTTP requests)
- **Tailwind CSS** (for styling)
- **Jest** (for testing)

---

## **Project Structure**

```bash
├── src
│   ├── components
│   │   ├── SynonymSearch.js        # Main component for searching synonyms
│   │   ├── ManageSynonyms.js       # Component for adding/deleting synonyms
│   │   └── Header.js               # Component to display header of page
│   ├── services
│   │   └── api.js                  # Axios service for handling API requests
│   ├── App.js                      # Main entry component
│   ├── index.js                    # Main entry point for React
│   └── styles.css                  # Tailwind and custom CSS styles
├── public
│   └── index.html                  # Main HTML file for React
├── tests
│   ├── ManageSynonyms.test.js      # Unit tests for Manage component
│   └── SynonymSearch.test.js       # Unit tests for SynonymSearch component
├── package.json                    # React dependencies and scripts
└── README.md                       # Project documentation
```

---

## **Component Breakdown**

### **1. SynonymSearch Component**

- **Description:** This component handles searching for synonyms. It takes user input, sends it to the backend, and displays the results.
- **State:**
  - `word`: The word the user wants to find synonyms for.
  - `synonyms`: The synonyms returned from the API.
  - `loading`: Boolean to show a loading state while waiting for the API response.
  - `error`: Error message to display if the API request fails.
  - `message`: Success message when synonyms are found.

### **2. ManageSynonym Component**

- **Description:** This component allows users to add/delete synonyms to the backend.
- **State:**
  - `word`: The word for which the user wants to add/delete a synonym.
  - `synonym`: The synonym that will be added.
  - `message`: Success message upon successful addition of the synonym.
  - `error`: Error message if the API request fails.
  - `loading`: Loading state while the API processes the request.

### **3. SynonymSearch Component**

- **Description:** Displays a list of synonyms for a given word.
- **Props:**
  - `synonyms`: Array of synonyms to display.

## **Run Locally**

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate into the project directory:
   ```bash
   cd synonym-search-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and go to `http://localhost:3000`.
