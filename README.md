## SQL - Editor

Users can query easily on a table using SQL, and see the results.

**Ideal User:** Data analysts of a business organization who will query the data and pass on the results to their business team

**Page Load Time:** 1947.6 ms
Page Load Time was calculated after deployment using Lighthouse

- First Contentful Paint: 0.9 s
- Speed Index: 1.5 s
- Largest Contentful Paint: 1.3 s
- Time to Interactive: 1.0 s
- Total Blocking Time: 70 ms
- Cumulative Layout Shift: 0

To optimize for page load time:

- I deployed the build folder which correctly bundles React in production mode and optimizes the build for the best performance.
- I used React.useMemo for the table to avoid unnecessary rendering
