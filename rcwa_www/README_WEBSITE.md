# RCWA Website

This provides a user friendly GUI for interacting with the RCWA algorithm.

The backend is built using python's fast api with layer stacks passed as JSON from the front end

The front end uses the well known Javascript framework, React.

# Running the frontend

- Install the latest version of [Node](https://nodejs.org/en/), which should have node and npm
- From your cli in the frontend dir, run `npm install`
- Still in the frontend dir run `npm run start`. The web page should appear in a new window of your default browser

# Running the backend

- create the rcwa virtual environment by following the tutorial steps in the top directory instructions
- activate that enviornment
- `pip install "fastapi[all]"`
- In the backend dir, run `python -m uvicorn api:app --reload` 
- The backend should now be running and the calculate button on the web page should work

You

# To Dos
- Write Jest tests
- Create drawable crystal structure instead of CSV
