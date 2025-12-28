# SWR Guidelines  
  
## 1. Overview  
  
SWR (stale-while-revalidate) is the primary data fetching library for client-side data management. Use Context7 MCP to access up-to-date SWR documentation when implementing data fetching patterns.  
  
---  
  
## 2. When to Use SWR  
  
| Scenario                  | Use SWR | Alternative          |
| ------------------------- | ------- | -------------------- |
| Client-side data fetching | ✅ Yes   | -                    |
| Real-time data updates    | ✅ Yes   | -                    |
| Paginated lists           | ✅ Yes   | -                    |
| Infinite scroll           | ✅ Yes   | -                    |
| Server Components data    | ❌ No    | Direct fetch         |
| Server Actions mutations  | ❌ No    | Server Actions       |
| Static data               | ❌ No    | Next.js static fetch |
  
---  
  
## 3. Hook Organization  
  
### File Structure  
  

src/
├── hooks/
│ └── swr/
│ ├── use-users.ts
│ ├── use-user-by-id.ts
│ ├── use-products.ts
│ └── use-infinite-products.ts

  
### Naming Conventions  
  
| Element       | Pattern                 | Example               |
| ------------- | ----------------------- | --------------------- |
| Hook file     | `use-[resource].ts`     | `use-users.ts`        |
| Hook function | `use[Resource]`         | `useUsers`            |
| Infinite hook | `useInfinite[Resource]` | `useInfiniteProducts` |
| Key generator | `get[Resource]Key`      | `getUsersKey`         |
  
---  
  
## 4. Cache Key Management  
  
### Key Patterns  
  
| Pattern      | Use Case                  |
| ------------ | ------------------------- |
| String key   | Simple static resources   |
| Array key    | Resources with parameters |
| Function key | Conditional fetching      |
| Null key     | Disable fetching          |
  
### Key Naming Convention  
  
| Resource    | Key Pattern                           |
| ----------- | ------------------------------------- |
| List        | `/api/[resource]`                     |
| Single item | `/api/[resource]/[id]`                |
| Filtered    | `/api/[resource]?[params]`            |
| Nested      | `/api/[parent]/[parentId]/[resource]` |
  
---  
  
## 5. Configuration Options  
  
### Global Configuration  
  
| Option                | Recommended Value | Purpose                       |
| --------------------- | ----------------- | ----------------------------- |
| revalidateOnFocus     | false             | Prevent unnecessary refetches |
| revalidateOnReconnect | true              | Sync after network recovery   |
| dedupingInterval      | 2000              | Prevent duplicate requests    |
| errorRetryCount       | 3                 | Limit retry attempts          |
| errorRetryInterval    | 5000              | Delay between retries         |
  
### Per-Hook Configuration  
  
| Option            | Use Case                      |
| ----------------- | ----------------------------- |
| refreshInterval   | Polling for real-time data    |
| revalidateIfStale | Control stale data behavior   |
| keepPreviousData  | Smooth pagination transitions |
| suspense          | React Suspense integration    |
  
---  
  
## 6. Fetcher Functions  
  
### Fetcher Organization  
  
| Location                       | Purpose                             |
| ------------------------------ | ----------------------------------- |
| `src/lib/fetchers/base.ts`     | Generic fetcher with error handling |
| `src/lib/fetchers/[domain].ts` | Domain-specific fetchers            |
  
### Fetcher Requirements  
  
| Requirement    | Description                        |
| -------------- | ---------------------------------- |
| Error handling | Throw errors for non-2xx responses |
| Type safety    | Return typed responses             |
| Authentication | Include auth headers when needed   |
| Timeout        | Configure request timeouts         |
  
---  
  
## 7. Error Handling  
  
### Error States  
  
| State         | Handling                       |
| ------------- | ------------------------------ |
| Network error | Retry with exponential backoff |
| 4xx errors    | Display user-friendly message  |
| 5xx errors    | Retry with limit               |
| Timeout       | Retry once, then show error    |
  
### Error Boundary Integration  
  
| Approach         | Use Case                    |
| ---------------- | --------------------------- |
| Hook-level error | Component-specific error UI |
| Error boundary   | Page-level error fallback   |
| Global handler   | Toast notifications         |
  
---  
  
## 8. Loading States  
  
### Loading Indicators  
  
| State           | UI Pattern                     |
| --------------- | ------------------------------ |
| Initial load    | Skeleton components            |
| Revalidation    | Subtle indicator (no skeleton) |
| Pagination      | Inline loading                 |
| Infinite scroll | Bottom loader                  |
  
### State Detection  
  
| Property       | Meaning                           |
| -------------- | --------------------------------- |
| isLoading      | First load, no data yet           |
| isValidating   | Fetching (including revalidation) |
| data undefined | No data received                  |
| error defined  | Request failed                    |
  
---  
  
## 9. Mutation Patterns  
  
### Mutation Strategies  
  
| Strategy          | Use Case                       |
| ----------------- | ------------------------------ |
| Optimistic update | Immediate UI feedback          |
| Revalidation      | Ensure data consistency        |
| Bounded mutate    | Update specific cache keys     |
| Global mutate     | Update multiple related caches |
  
### Mutation Flow  
  
| Step | Action                      |
| ---- | --------------------------- |
| 1    | Optimistically update cache |
| 2    | Perform server mutation     |
| 3    | Revalidate on success       |
| 4    | Rollback on error           |
  
---  
  
## 10. Pagination  
  
### Pagination Types  
  
| Type         | Hook           | Use Case               |
| ------------ | -------------- | ---------------------- |
| Offset-based | useSWR         | Traditional pagination |
| Cursor-based | useSWRInfinite | Infinite scroll        |
| Page-based   | useSWR         | Numbered pages         |
  
### Pagination Guidelines  
  
| Guideline              | Description                    |
| ---------------------- | ------------------------------ |
| Keep previous data     | Prevent layout shift           |
| Prefetch next page     | Improve perceived performance  |
| Cache all pages        | Enable instant back navigation |
| Reset on filter change | Clear stale paginated data     |
  
---  
  
## 11. Infinite Loading  
  
### Configuration  
  
| Option              | Purpose                            |
| ------------------- | ---------------------------------- |
| getKey              | Generate key for each page         |
| initialSize         | Number of pages to load initially  |
| revalidateFirstPage | Refresh first page on revalidation |
| persistSize         | Remember loaded pages count        |
  
### Performance Considerations  
  
| Consideration     | Recommendation                              |
| ----------------- | ------------------------------------------- |
| Page size         | 10-20 items per page                        |
| Parallel requests | Disable for ordered data                    |
| Memory management | Implement virtual scrolling for large lists |
  
---  
  
## 12. Conditional Fetching  
  
### Patterns  
  
| Pattern            | Condition                   |
| ------------------ | --------------------------- |
| Null key           | Pass null to disable        |
| Dependent fetching | Wait for prerequisite data  |
| Auth-gated         | Check authentication status |
| Feature flag       | Check feature availability  |
  
---  
  
## 13. Revalidation Strategies  
  
### Trigger Types  
  
| Trigger  | Method                |
| -------- | --------------------- |
| Manual   | mutate() call         |
| Focus    | revalidateOnFocus     |
| Interval | refreshInterval       |
| Network  | revalidateOnReconnect |
| Event    | Custom event listener |
  
### Revalidation Guidelines  
  
| Scenario              | Strategy               |
| --------------------- | ---------------------- |
| User-initiated action | Immediate revalidation |
| Background sync       | Interval polling       |
| Critical data         | Focus revalidation     |
| Static data           | Manual only            |
  
---  
  
## 14. Cache Management  
  
### Cache Behaviors  
  
| Behavior               | Description                         |
| ---------------------- | ----------------------------------- |
| Deduplication          | Merge concurrent identical requests |
| Stale-while-revalidate | Serve cache, fetch in background    |
| Error retention        | Keep last valid data on error       |
| Garbage collection     | Automatic cleanup of unused data    |
  
### Cache Invalidation  
  
| Method             | Use Case                     |
| ------------------ | ---------------------------- |
| mutate(key)        | Invalidate specific resource |
| mutate(filter)     | Invalidate matching keys     |
| mutate(() => true) | Clear entire cache           |
  
---  
  
## 15. Performance Optimization  
  
### Optimization Techniques  
  
| Technique          | Benefit                   |
| ------------------ | ------------------------- |
| Deduping interval  | Reduce duplicate requests |
| Keep previous data | Prevent loading flicker   |
| Preload            | Faster navigation         |
| Suspense mode      | Cleaner loading states    |
  
### Anti-Patterns  
  
| Anti-Pattern            | Issue                        |
| ----------------------- | ---------------------------- |
| Over-fetching           | Unnecessary network requests |
| Missing error handling  | Poor user experience         |
| Ignoring loading states | Layout shift                 |
| Unbounded cache         | Memory leaks                 |
| Polling without cleanup | Resource waste               |
| Missing deduplication   | Redundant requests           |
  
---  
  
## 16. Integration with Server Actions  
  
### Workflow  
  
| Step | Action                          |
| ---- | ------------------------------- |
| 1    | Call Server Action for mutation |
| 2    | Handle Server Action response   |
| 3    | Revalidate SWR cache on success |
| 4    | Display error on failure        |
  
### Revalidation After Mutations  
  
| Mutation Type   | Revalidation Strategy              |
| --------------- | ---------------------------------- |
| Create          | Revalidate list cache              |
| Update          | Revalidate item and list cache     |
| Delete          | Remove from cache, revalidate list |
| Bulk operations | Revalidate all affected caches     |
  
---  
  
## 17. Provider Configuration  
  
### Provider Hierarchy  
  
| Level              | Purpose                    |
| ------------------ | -------------------------- |
| Root provider      | Global configuration       |
| Feature provider   | Feature-specific overrides |
| Component provider | Local overrides            |
  
### Provider Options  
  
| Option                | Scope                           |
| --------------------- | ------------------------------- |
| fetcher               | Default fetcher for all hooks   |
| dedupingInterval      | Request deduplication window    |
| revalidateOnFocus     | Focus revalidation behavior     |
| revalidateOnReconnect | Reconnect revalidation behavior |
| errorRetryCount       | Global retry limit              |
| onError               | Global error handler            |
| onSuccess             | Global success handler          |
  
---  
  
## 18. DevTools Integration  
  
### Debugging Tools  
  
| Tool            | Purpose               |
| --------------- | --------------------- |
| SWR DevTools    | Cache inspection      |
| React DevTools  | Hook state inspection |
| Network tab     | Request monitoring    |
| Console logging | Custom debug output   |
  
### Debug Configuration  
  
| Environment | Behavior               |
| ----------- | ---------------------- |
| Development | Enable verbose logging |
| Production  | Disable debug features |
| Testing     | Mock fetchers          |
  
---  
  
## 19. Testing SWR Hooks  
  
### Testing Strategies  
  
| Strategy         | Use Case                |
| ---------------- | ----------------------- |
| Mock fetcher     | Unit testing hooks      |
| MSW handlers     | Integration testing     |
| Cache seeding    | Preloaded state testing |
| Error simulation | Error handling testing  |
  
### Test Considerations  
  
| Consideration   | Approach                   |
| --------------- | -------------------------- |
| Async behavior  | Use waitFor utilities      |
| Cache isolation | Reset cache between tests  |
| Loading states  | Assert intermediate states |
| Error states    | Verify error UI rendering  |
  
---  
  
## 20. TypeScript Integration  
  
### Type Safety  
  
| Element     | Typing Approach         |
| ----------- | ----------------------- |
| Hook return | Generic type parameter  |
| Error type  | Custom error interface  |
| Key type    | String literal or tuple |
| Fetcher     | Typed response          |
  
### Type Patterns  
  
| Pattern              | Purpose                      |
| -------------------- | ---------------------------- |
| Generic hooks        | Reusable typed hooks         |
| Discriminated unions | Loading/error/success states |
| Strict null checks   | Handle undefined data        |
| Const assertions     | Literal key types            |
  
---  
  
## 21. Common Patterns  
  
### Data Dependencies  
  
| Pattern              | Description                   |
| -------------------- | ----------------------------- |
| Serial fetching      | Fetch B after A completes     |
| Parallel fetching    | Fetch A and B simultaneously  |
| Conditional fetching | Fetch B only if condition met |
| Derived data         | Compute from cached data      |
  
### UI Patterns  
  
| Pattern         | Implementation                      |
| --------------- | ----------------------------------- |
| Optimistic UI   | Update cache before server response |
| Stale indicator | Show data freshness status          |
| Retry button    | Manual revalidation trigger         |
| Pull to refresh | Mobile refresh pattern              |
  
---  
  
## 22. Migration Guidelines  
  
### From React Query  
  
| React Query              | SWR Equivalent          |
| ------------------------ | ----------------------- |
| useQuery                 | useSWR                  |
| useInfiniteQuery         | useSWRInfinite          |
| useMutation              | Server Actions + mutate |
| queryClient.invalidate   | mutate                  |
| queryClient.setQueryData | mutate with data        |
  
### From Fetch/useEffect  
  
| Pattern           | Migration              |
| ----------------- | ---------------------- |
| useEffect + fetch | Replace with useSWR    |
| Manual caching    | Remove, use SWR cache  |
| Loading state     | Use isLoading from SWR |
| Error state       | Use error from SWR     |
  
---  
  
## 23. Context7 Reference  
  
### Documentation Access  
  
| Query              | Purpose                     |
| ------------------ | --------------------------- |
| SWR basic usage    | Core hook patterns          |
| SWR mutation       | Cache mutation strategies   |
| SWR infinite       | Infinite loading setup      |
| SWR configuration  | Global/local config options |
| SWR typescript     | Type definitions            |
| SWR error handling | Error retry and handling    |
  
### Recommended Queries  
  
| Scenario      | Context7 Query                               |
| ------------- | -------------------------------------------- |
| Initial setup | "SWR getting started configuration"          |
| Pagination    | "SWR pagination infinite loading"            |
| Mutations     | "SWR mutate revalidate cache"                |
| Performance   | "SWR performance optimization deduplication" |
| Testing       | "SWR testing mock fetcher"                   |
  
---  
  
## 24. Quick Reference  
  
### Hook Selection  
  
| Need            | Hook               |
| --------------- | ------------------ |
| Single resource | useSWR             |
| Infinite list   | useSWRInfinite     |
| Mutation only   | useSWRMutation     |
| Subscription    | useSWRSubscription |
| Immutable data  | useSWRImmutable    |
  
### State Mapping  
  
| State      | Condition                                 |
| ---------- | ----------------------------------------- |
| Loading    | `isLoading === true`                      |
| Validating | `isValidating === true`                   |
| Success    | `data !== undefined && !error`            |
| Error      | `error !== undefined`                     |
| Empty      | `data !== undefined && data.length === 0` |
  
### Cache Operations  
  
| Operation  | Method                          |
| ---------- | ------------------------------- |
| Revalidate | `mutate(key)`                   |
| Update     | `mutate(key, newData)`          |
| Delete     | `mutate(key, undefined)`        |
| Clear all  | `mutate(() => true, undefined)` |