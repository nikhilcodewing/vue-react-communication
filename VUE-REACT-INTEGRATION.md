# Vue + React Integration

This project demonstrates how to run a React application inside a Vue project with full control and communication between the two frameworks.

## Architecture

The integration uses a micro-frontend approach where:

- **Vue** is the main application (host)
- **React** runs as a micro-frontend (client)
- Communication happens through custom events and props

## Project Structure

```
src/
├── App.vue                 # Main Vue application with controls
├── components/
│   └── ReactWrapper.vue   # Vue wrapper component for React
├── react-app/
│   ├── App.jsx            # React application component
│   └── index.js           # React mounting/unmounting logic
└── main.js                # Vue entry point
```

## Features

### Vue Controls

- **Message Input**: Send messages to React component
- **Show/Hide Toggle**: Control React component visibility
- **Reset Button**: Reset React component state
- **Response Display**: Show messages and data from React

### React Component

- **Counter**: Interactive counter with click tracking
- **Message Display**: Shows messages from Vue
- **Input Field**: Send messages back to Vue
- **Event Communication**: Bidirectional communication with Vue

## Communication Methods

### 1. Props (Vue → React)

- `message`: String message from Vue to React
- `isVisible`: Boolean to show/hide React component

### 2. Events (React → Vue)

- `react-message`: Custom event for messages from React
- `react-count`: Custom event for counter updates

### 3. Custom Events (Bidirectional)

- `vue-to-react`: Vue sends data to React
- `react-to-vue`: React sends data to Vue

## How to Use

1. **Start the development server**:

   ```bash
   npm run dev
   ```

2. **Control React from Vue**:

   - Type messages in the "Message to React" input
   - Toggle React component visibility with the checkbox
   - Reset React counter with the "Reset React Counter" button

3. **Interact with React**:
   - Click the "Click Me" button to increment counter
   - Type in the React input field to send messages back to Vue
   - Watch real-time communication between frameworks

## Technical Implementation

### Vue Side

- Uses `ReactWrapper.vue` component to mount React
- Manages React lifecycle (mount/unmount)
- Handles event communication
- Provides reactive controls

### React Side

- Mounts/unmounts based on Vue props
- Listens for Vue events via `window.addEventListener`
- Sends events back to Vue via `window.dispatchEvent`
- Maintains its own state independently

### Vite Configuration

- Supports both Vue and React with respective plugins
- Configured for micro-frontend architecture
- Handles JSX compilation for React components

## Benefits

1. **Framework Independence**: Each framework maintains its own ecosystem
2. **Gradual Migration**: Can migrate from Vue to React or vice versa
3. **Team Separation**: Different teams can work on Vue and React parts
4. **Reusability**: React components can be reused in other Vue projects
5. **Performance**: Only loads what's needed when needed

## Customization

### Adding More React Components

1. Create new React components in `src/react-app/`
2. Import and use them in `ReactWrapper.vue`
3. Add communication logic as needed

### Extending Communication

1. Add new custom event types
2. Extend the event data structure
3. Handle new events in both Vue and React

### Styling

- Vue styles are in `App.vue`
- React styles are inline in `App.jsx`
- Both can use external CSS files

## Troubleshooting

### React Not Mounting

- Check browser console for errors
- Ensure `react-app-container` div exists
- Verify React dependencies are installed

### Communication Issues

- Check event names match exactly
- Verify event listeners are properly set up
- Use browser dev tools to inspect events

### Build Issues

- Ensure Vite config includes React plugin
- Check file extensions (.jsx for React, .vue for Vue)
- Verify all imports are correct

## Next Steps

1. **Add State Management**: Integrate Redux/Zustand for React
2. **Add Routing**: Implement React Router within Vue
3. **Add Testing**: Set up Jest/Vitest for both frameworks
4. **Add Styling**: Integrate Tailwind CSS or styled-components
5. **Add More Features**: Expand the communication patterns
