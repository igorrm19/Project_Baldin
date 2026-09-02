#!/bin/bash

echo "Creating GitHub issues to address SPA Memory Leaks and Component Lifecycle..."

# Issue 1
gh issue create \
  --title "Formalize Component Lifecycle: Implement unmount / destroy in Base Component" \
  --body "Define a standard lifecycle for components to prevent memory leaks during SPA navigation. Ensure IBaseModel and BaseModel declare an unmount() method designed to explicitly nullify DOM references and clean up resources." \
  --label "enhancement"

# Issue 2
gh issue create \
  --title "Implement Global actionStack Cleanup Utility" \
  --body "Components often attach event listeners stored in the global actionStack. We need a mechanism or utility function that safely iterates and removes these event bindings when a component is unmounted." \
  --label "enhancement"

# Issue 3
gh issue create \
  --title "Integrate Unmount Lifecycle with FoxRouter" \
  --body "Modify FoxRouter so that before calling replaceChildren() to render a new route, it triggers the unmount() method on the currently active component (if one exists). This ensures DOM nodes and event listeners are properly garbage collected." \
  --label "bug"

# Issue 4
gh issue create \
  --title "Refactor Existing Main Components to use unmount" \
  --body "Update existing page components (e.g., login.ts, mainPage.ts, UserConfigPage.ts) to implement the new unmount() lifecycle hook. They should explicitly clear references like this.activeDomContainer and remove custom event listeners (like form submissions) to fix memory leaks." \
  --label "bug"

echo "All issues created successfully!"
