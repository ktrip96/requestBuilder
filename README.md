# Request Builder Documentation

**[Use case](#what-problem-does-it-solve)**<br>
**[Folder Structure](#folder-structure)**<br>

## What problem does it solve?

The user of this app can specify excactly the type-schema of some data.<br>
_e.g I will give you a JSON with this format: <br>_

```javascript
[
    {
        name:"Password",
        type:"string",
    },
    {
        name:"Account Details",
        type:"JSON"
        content: [
            {
                name:"Email",
                type:"string",
            },
            {
                name:"Age",
                type:"number",
            },
        ]
    }
]
```

This can be very helpful for a lot of usecases. One of the main usecases is definetely **backend validation**. The backend knows excactly what to expect and this makes a lot of its operations easier and faster.

## Folder Structure

- **Components**:

  - `Select.tsx`: It's the component that lets the user define the **Name** and the **Type** of one data field.
    When a change is happening on Select component (for example we change the Type or we type the Name of the input), the global State of the app is updated.
  - `FormContainer.tsx`:

- **Context**: Contains `formContext.tsx`, which the **source of truth** of the application. Every input field that is rendered in this app, occurs from this global State that formContext provides.<br>
  e.g.

```javascript
builderState: [
	{
		fatherContainerId: 'root',
		id: 'random Unique id number',
		level: 0,
		name: 'Password',
		type: 'String',
	},
	{
		fatherContainerId: 'root',
		id: 'random Unique id number',
		level: 0,
		name: 'Age',
		type: 'Number',
	},
]

// This state results in rendering two <Select/> components.
// No matter how deep our react tree is, this state is the source of truth of the app
```
