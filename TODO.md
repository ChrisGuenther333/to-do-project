# To Do
- [ ] Sometimes clearing completedTasks does not clear all, might be an issue with completedTasks array and currentList.items array
  - Sometimes when console logging completedTasks and currentList.items it will claim it has multiple items in array but will only display one of them
  - Might need to convert all splices to filters to fix the issue
- [ ] Re-enable save() and retrieve() functions
## Potential Future Features
- Search List
- Add text to listList and taskList encouraging people to add list/task by pressing enter if they are empty
- Clean up completedTasks so it removes any tasks that were marked when a list or task is deleted