# To Do
<!-- ON LINE 75: CHECKING IF EDIT TASK BUTTON WAS CLICKED  -->
- [ ] Go through every function and fix it one by one
  - [ ] Delete list button clicked: Line 36 prints empty completedTasks array
- [ ] Convert every for in loop to a forEach or whatever is most applicable
- [ ] Sometimes clearing completedTasks does not clear all, might be an issue with completedTasks array and currentList.items array
  - Sometimes when console logging completedTasks and currentList.items it will claim it has multiple items in array but will only display one of them
  - Might need to convert all splices to filters to fix the issue
- [ ] Re-enable save() and retrieve() functions
- [ ] Add clickable buttons
## Potential Future Features
- Search List
- Add text to listList and taskList encouraging people to add list/task by pressing enter if they are empty
- Clean up completedTasks so it removes any tasks that were marked when a list or task is deleted