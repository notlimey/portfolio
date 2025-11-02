export interface BlogPost {
	id: number;
	title: string;
	excerpt: string;
	date: string;
	readTime: string;
	tags: string[];
	category: string;
	content?: string;
	codeExamples?: Array<{
		title: string;
		language: string;
		code: string;
	}>;
}

export const blogPosts: BlogPost[] = [
	{
		id: 1,
		title: 'Building Type-Safe APIs with TypeScript and .NET',
		excerpt:
			'Exploring how to maintain type safety across the entire stack when working with TypeScript frontends and .NET backends. Learn about contracts, code generation, and best practices.',
		date: '2024-10-15',
		readTime: '8 min',
		tags: ['TypeScript', '.NET', 'API Design'],
		category: 'Full-Stack',
		content: `
  # Building Type-Safe APIs with TypeScript and .NET
  
  Type safety across your entire stack isn't just a nice-to-have—it's essential for building maintainable applications. In this article, I'll share how we achieve end-to-end type safety when working with TypeScript frontends and .NET backends.
  
  ## The Problem
  
  When building full-stack applications, one of the biggest challenges is keeping your frontend and backend in sync. API contracts change, properties get renamed, and suddenly your application breaks in production.
  
  ## The Solution: Shared Type Contracts
  
  The key is establishing a single source of truth for your data models. Here's how we do it at Crayon.
  
  ### Step 1: Define Your .NET Models
  
  Start with clean, well-defined C# models that represent your domain:
  
  \`\`\`csharp
  public class UserProfile
  {
      public Guid Id { get; set; }
      public string Name { get; set; }
      public string Email { get; set; }
      public DateTime CreatedAt { get; set; }
      public List<string> Roles { get; set; }
  }
  \`\`\`
  
  ### Step 2: Generate TypeScript Types
  
  Use tools like NSwag or Kiota to automatically generate TypeScript types from your .NET API:
  
  \`\`\`typescript
  // Generated from .NET models
  export interface UserProfile {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    roles: string[];
  }
  
  // Type-safe API client
  export class UserApiClient {
    async getProfile(userId: string): Promise<UserProfile> {
      const response = await fetch(\`/api/users/\${userId}\`);
      return response.json();
    }
  }
  \`\`\`
  
  ### Step 3: Use Validation Libraries
  
  Add runtime validation with Zod or similar libraries:
  
  \`\`\`typescript
  import { z } from 'zod';
  
  const UserProfileSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    email: z.string().email(),
    createdAt: z.string().datetime(),
    roles: z.array(z.string())
  });
  
  type UserProfile = z.infer<typeof UserProfileSchema>;
  \`\`\`
  
  ## Best Practices
  
  1. **Automate Code Generation**: Set up CI/CD to regenerate types on every API change
  2. **Version Your APIs**: Use API versioning to avoid breaking changes
  3. **Test Your Contracts**: Write integration tests that verify type contracts
  4. **Document Everything**: Use OpenAPI/Swagger for comprehensive API documentation
  
  ## Real-World Benefits
  
  Since implementing this approach, we've seen:
  - 40% reduction in runtime type errors
  - Faster onboarding for new developers
  - Better IDE support and autocomplete
  - Easier refactoring across the stack
  
  ## Conclusion
  
  Type safety across your stack is achievable and worth the investment. Start small, automate what you can, and watch your bug count drop.
  
  ---
  
  *Have questions about implementing type-safe APIs? Feel free to reach out!*
      `,
		codeExamples: [
			{
				title: 'C# API Controller',
				language: 'csharp',
				code: `[ApiController]
  [Route("api/[controller]")]
  public class UsersController : ControllerBase
  {
      private readonly IUserService _userService;
  
      public UsersController(IUserService userService)
      {
          _userService = userService;
      }
  
      [HttpGet("{id}")]
      [ProducesResponseType(typeof(UserProfile), 200)]
      [ProducesResponseType(404)]
      public async Task<IActionResult> GetProfile(Guid id)
      {
          var profile = await _userService.GetProfileAsync(id);
          if (profile == null)
              return NotFound();
          
          return Ok(profile);
      }
  }`,
			},
			{
				title: 'TypeScript API Client',
				language: 'typescript',
				code: `import { UserProfile, UserProfileSchema } from './types';
  
  export class UserApiClient {
    private baseUrl: string;
  
    constructor(baseUrl: string = '/api') {
      this.baseUrl = baseUrl;
    }
  
    async getProfile(userId: string): Promise<UserProfile> {
      const response = await fetch(\`\${this.baseUrl}/users/\${userId}\`);
      
      if (!response.ok) {
        throw new Error(\`Failed to fetch profile: \${response.statusText}\`);
      }
  
      const data = await response.json();
      
      // Runtime validation
      return UserProfileSchema.parse(data);
    }
  
    async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
      const response = await fetch(\`\${this.baseUrl}/users/\${userId}\`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
  
      if (!response.ok) {
        throw new Error(\`Failed to update profile: \${response.statusText}\`);
      }
  
      return UserProfileSchema.parse(await response.json());
    }
  }`,
			},
		],
	},
	{
		id: 2,
		title: 'Optimizing Next.js Performance for Enterprise Apps',
		excerpt:
			'Deep dive into Next.js optimization techniques for large-scale applications. From static generation to incremental static regeneration and edge functions.',
		date: '2024-09-28',
		readTime: '12 min',
		tags: ['Next.js', 'Performance', 'React'],
		category: 'Frontend',
		content: `
  # Optimizing Next.js Performance for Enterprise Apps
  
  Performance optimization in Next.js requires understanding the different rendering strategies and when to apply them. Here's what I've learned building enterprise-scale applications.
  
  ## Rendering Strategies
  
  Next.js offers multiple rendering approaches:
  
  1. **Static Site Generation (SSG)** - Pre-render at build time
  2. **Incremental Static Regeneration (ISR)** - Update static content on-demand
  3. **Server-Side Rendering (SSR)** - Render on each request
  4. **Client-Side Rendering (CSR)** - Render in the browser
  
  ## When to Use What
  
  Choose your strategy based on your data:
  
  - **Marketing pages**: SSG
  - **Blog posts**: ISR
  - **User dashboards**: SSR + Client hydration
  - **Real-time data**: CSR with SWR/React Query
  
  ## Performance Wins
  
  Key optimizations that made the biggest impact in our projects:
  
  ### Image Optimization
  
  Use Next.js Image component everywhere:
  
  \`\`\`tsx
  import Image from 'next/image';
  
  export function ProductCard({ product }: Props) {
    return (
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={400}
        height={300}
        priority={false} // Only true for above-the-fold images
        placeholder="blur"
      />
    );
  }
  \`\`\`
  
  ### Bundle Analysis
  
  Always measure your bundle size:
  
  \`\`\`bash
  npm run build
  # Use @next/bundle-analyzer
  ANALYZE=true npm run build
  \`\`\`
  
  ### Code Splitting
  
  Lazy load heavy components:
  
  \`\`\`tsx
  import dynamic from 'next/dynamic';
  
  const HeavyChart = dynamic(() => import('./HeavyChart'), {
    loading: () => <ChartSkeleton />,
    ssr: false
  });
  \`\`\`
  
  ## Results
  
  After optimization:
  - First Contentful Paint: 0.8s → 0.3s
  - Time to Interactive: 2.1s → 1.2s
  - Lighthouse Score: 78 → 97
  
  ## Conclusion
  
  Performance is not just about speed—it's about user experience and business metrics. Measure everything, optimize intentionally.
      `,
	},
	{
		id: 3,
		title: 'DevOps Best Practices: Docker, CI/CD, and Azure',
		excerpt:
			'A practical guide to setting up robust CI/CD pipelines with Docker containers and Azure DevOps. Automating deployments and ensuring reliability.',
		date: '2024-09-10',
		readTime: '10 min',
		tags: ['DevOps', 'Docker', 'Azure'],
		category: 'Infrastructure',
		content: `
  # DevOps Best Practices: Docker, CI/CD, and Azure
  
  Modern application deployment requires reliable, automated pipelines. Here's how we set up our infrastructure at Crayon using Docker and Azure.
  
  ## The Docker Foundation
  
  Everything starts with a good Dockerfile:
  
  \`\`\`dockerfile
  # Multi-stage build for optimization
  FROM node:20-alpine AS builder
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci
  COPY . .
  RUN npm run build
  
  FROM node:20-alpine AS runner
  WORKDIR /app
  ENV NODE_ENV production
  COPY --from=builder /app/next.config.js ./
  COPY --from=builder /app/public ./public
  COPY --from=builder /app/.next ./.next
  COPY --from=builder /app/node_modules ./node_modules
  COPY --from=builder /app/package.json ./package.json
  
  EXPOSE 3000
  CMD ["npm", "start"]
  \`\`\`
  
  ## Azure Pipeline Configuration
  
  Our CI/CD pipeline in Azure DevOps:
  
  \`\`\`yaml
  trigger:
    - main
    - develop
  
  pool:
    vmImage: 'ubuntu-latest'
  
  stages:
    - stage: Build
      jobs:
        - job: BuildAndTest
          steps:
            - task: NodeTool@0
              inputs:
                versionSpec: '20.x'
            
            - script: npm ci
              displayName: 'Install dependencies'
            
            - script: npm run test
              displayName: 'Run tests'
            
            - script: npm run build
              displayName: 'Build application'
            
            - task: Docker@2
              displayName: 'Build and push image'
              inputs:
                command: buildAndPush
                repository: myapp
                dockerfile: Dockerfile
                tags: |
                  $(Build.BuildId)
                  latest
  
    - stage: Deploy
      dependsOn: Build
      condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
      jobs:
        - deployment: DeployToProduction
          environment: 'production'
          strategy:
            runOnce:
              deploy:
                steps:
                  - task: AzureWebAppContainer@1
                    inputs:
                      azureSubscription: 'Azure-Subscription'
                      appName: 'myapp-prod'
                      containers: 'myregistry.azurecr.io/myapp:$(Build.BuildId)'
  \`\`\`
  
  ## Infrastructure as Code
  
  Using Bicep for Azure resources:
  
  \`\`\`bicep
  param location string = resourceGroup().location
  param appName string
  
  resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
    name: '\${appName}-plan'
    location: location
    sku: {
      name: 'P1V2'
      tier: 'PremiumV2'
    }
    kind: 'linux'
    properties: {
      reserved: true
    }
  }
  
  resource webApp 'Microsoft.Web/sites@2022-03-01' = {
    name: appName
    location: location
    properties: {
      serverFarmId: appServicePlan.id
      siteConfig: {
        linuxFxVersion: 'DOCKER|myregistry.azurecr.io/myapp:latest'
        alwaysOn: true
        healthCheckPath: '/api/health'
      }
    }
  }
  \`\`\`
  
  ## Monitoring and Alerts
  
  Set up Application Insights for monitoring:
  
  - Performance tracking
  - Error logging
  - User analytics
  - Custom metrics
  
  ## Best Practices Checklist
  
  ✅ Use multi-stage Docker builds
  ✅ Implement health check endpoints
  ✅ Set up automated testing in CI
  ✅ Use infrastructure as code
  ✅ Implement blue-green deployments
  ✅ Monitor everything
  ✅ Have rollback procedures
  
  ## Conclusion
  
  Good DevOps practices save time, reduce errors, and improve reliability. Invest in automation early.
      `,
	},
	{
		id: 4,
		title: 'Systems Programming Fundamentals for Web Developers',
		excerpt:
			'Why every web developer should understand systems programming. Exploring memory management, performance optimization, and lower-level concepts that make you a better developer.',
		date: '2024-08-22',
		readTime: '15 min',
		tags: ['Systems', 'Performance', 'Fundamentals'],
		category: 'Systems',
		content: `
  # Systems Programming Fundamentals for Web Developers
  
  Understanding how computers work at a lower level makes you a better web developer. Here's what every developer should know about systems programming.
  
  ## Memory Management Basics
  
  While JavaScript and C# have garbage collection, understanding memory is crucial:
  
  ### Stack vs Heap
  
  \`\`\`
  Stack:
  - Fast allocation/deallocation
  - Fixed size
  - LIFO (Last In, First Out)
  - Automatic management
  
  Heap:
  - Flexible size
  - Manual management (in some languages)
  - Slower access
  - Can fragment
  \`\`\`
  
  ### Why This Matters for Web Dev
  
  Understanding memory helps you:
  1. Avoid memory leaks in closures
  2. Optimize large data structures
  3. Understand why some operations are slow
  4. Write better async code
  
  ## Performance Concepts
  
  ### CPU Cache
  
  Modern CPUs have multiple cache levels:
  
  \`\`\`
  L1 Cache: ~1 cycle latency
  L2 Cache: ~4 cycles
  L3 Cache: ~10-20 cycles
  RAM: ~100-300 cycles
  \`\`\`
  
  **Practical application**: Keep hot data close together. Process data in chunks that fit in cache.
  
  ### Example: Array Processing
  
  \`\`\`javascript
  // Cache-friendly: iterate in memory order
  for (let i = 0; i < array.length; i++) {
    process(array[i]);
  }
  
  // Less efficient: random access patterns
  for (let i = 0; i < array.length; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);
    process(array[randomIndex]);
  }
  \`\`\`
  
  ## Concurrency Models
  
  Understanding different concurrency approaches:
  
  ### Single-threaded Event Loop (JavaScript)
  
  \`\`\`javascript
  // Non-blocking operations
  async function fetchData() {
    const data = await fetch('/api/data');
    return data.json();
  }
  
  // Use Promise.all for parallel requests
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);
  \`\`\`
  
  ### Multi-threading (C#)
  
  \`\`\`csharp
  // Parallel processing
  var results = await Task.WhenAll(
      ProcessDataAsync(data1),
      ProcessDataAsync(data2),
      ProcessDataAsync(data3)
  );
  
  // Parallel LINQ
  var processed = largeDataset
      .AsParallel()
      .Where(x => x.IsValid)
      .Select(x => Transform(x))
      .ToList();
  \`\`\`
  
  ## I/O Patterns
  
  ### Buffering
  
  Buffer I/O operations to reduce system calls:
  
  \`\`\`typescript
  // Bad: Multiple small writes
  for (const line of lines) {
    await fs.appendFile('log.txt', line + '\\n');
  }
  
  // Good: Batch writes
  const buffer: string[] = [];
  for (const line of lines) {
    buffer.push(line);
    if (buffer.length >= 100) {
      await fs.appendFile('log.txt', buffer.join('\\n') + '\\n');
      buffer.length = 0;
    }
  }
  \`\`\`
  
  ## Data Structures and Algorithms
  
  Know your Big O complexity:
  
  \`\`\`
  Array access: O(1)
  Array search: O(n)
  Hash table access: O(1) average
  Binary search: O(log n)
  Sort: O(n log n)
  \`\`\`
  
  ### Practical example:
  
  \`\`\`typescript
  // O(n²) - avoid for large datasets
  function findDuplicates(arr: number[]): number[] {
    const duplicates: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          duplicates.push(arr[i]);
        }
      }
    }
    return duplicates;
  }
  
  // O(n) - much better
  function findDuplicatesOptimized(arr: number[]): number[] {
    const seen = new Set<number>();
    const duplicates = new Set<number>();
    
    for (const num of arr) {
      if (seen.has(num)) {
        duplicates.add(num);
      }
      seen.add(num);
    }
    
    return Array.from(duplicates);
  }
  \`\`\`
  
  ## Why This Matters
  
  Understanding systems concepts helps you:
  - Write more efficient code
  - Debug performance issues
  - Make better architectural decisions
  - Understand framework internals
  - Communicate better with systems engineers
  
  ## Resources for Learning More
  
  1. **Books**: "Computer Systems: A Programmer's Perspective"
  2. **Courses**: CS50, Nand2Tetris
  3. **Practice**: Write performance-critical code
  4. **Profile**: Use profiling tools to understand bottlenecks
  
  ## Conclusion
  
  You don't need to be a systems programmer, but understanding these fundamentals will make you a better developer at any level of the stack.
      `,
	},
	{
		id: 5,
		title: 'Building a Handball Analytics Platform: Lessons Learned',
		excerpt:
			'Technical deep-dive into building 3Steps - a real-time sports analytics platform. Architecture decisions, data modeling, and handling live game statistics.',
		date: '2024-08-05',
		readTime: '11 min',
		tags: ['React', 'Real-time', 'Architecture'],
		category: 'Case Study',
		content: `
  # Building a Handball Analytics Platform: Lessons Learned
  
  Building 3Steps taught me more about software architecture than any course or book. Here's the story of building a real-time sports analytics platform.
  
  ## The Challenge
  
  Create a platform that:
  - Tracks live game statistics
  - Provides real-time updates to coaches and analysts
  - Handles complex handball-specific metrics
  - Works on tablets courtside with spotty connectivity
  - Stores historical data for analysis
  
  ## Architecture Decisions
  
  ### Real-time Updates: WebSockets
  
  We chose WebSockets over polling for real-time features:
  
  \`\`\`typescript
  // Client-side WebSocket manager
  class GameStatisticsSocket {
    private ws: WebSocket | null = null;
    private reconnectAttempts = 0;
  
    connect(gameId: string) {
      this.ws = new WebSocket(\`wss://api.3steps.no/games/\${gameId}\`);
      
      this.ws.onmessage = (event) => {
        const update = JSON.parse(event.data);
        this.handleStatisticUpdate(update);
      };
  
      this.ws.onclose = () => {
        this.reconnect(gameId);
      };
    }
  
    private reconnect(gameId: string) {
      if (this.reconnectAttempts < 5) {
        setTimeout(() => {
          this.reconnectAttempts++;
          this.connect(gameId);
        }, 1000 * Math.pow(2, this.reconnectAttempts));
      }
    }
  
    sendStatistic(stat: GameStatistic) {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(stat));
      } else {
        // Queue for later
        this.queueStatistic(stat);
      }
    }
  }
  \`\`\`
  
  ### Data Model
  
  Complex domain with many relationships:
  
  \`\`\`typescript
  interface Game {
    id: string;
    homeTeam: Team;
    awayTeam: Team;
    startTime: Date;
    status: 'scheduled' | 'live' | 'finished';
    periods: Period[];
  }
  
  interface Period {
    number: 1 | 2;
    startTime: Date;
    endTime?: Date;
    events: GameEvent[];
  }
  
  interface GameEvent {
    id: string;
    timestamp: Date;
    type: 'goal' | 'save' | 'penalty' | 'timeout' | 'suspension';
    player: Player;
    team: Team;
    details: EventDetails;
  }
  
  interface Player {
    id: string;
    number: number;
    name: string;
    position: Position;
    statistics: PlayerStatistics;
  }
  \`\`\`
  
  ### Offline Support
  
  Critical for courtside use:
  
  \`\`\`typescript
  // Service Worker for offline caching
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
  
        return fetch(event.request).then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open('game-data').then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        });
      })
    );
  });
  
  // Queue offline actions
  class OfflineQueue {
    private queue: Action[] = [];
  
    async addAction(action: Action) {
      this.queue.push(action);
      await this.saveToIndexedDB();
      
      if (navigator.onLine) {
        await this.processQueue();
      }
    }
  
    async processQueue() {
      while (this.queue.length > 0) {
        const action = this.queue[0];
        try {
          await this.executeAction(action);
          this.queue.shift();
          await this.saveToIndexedDB();
        } catch (error) {
          // Stop processing on error
          break;
        }
      }
    }
  }
  \`\`\`
  
  ## Performance Optimizations
  
  ### Virtual Scrolling
  
  For long lists of historical games:
  
  \`\`\`tsx
  import { useVirtualizer } from '@tanstack/react-virtual';
  
  function GameList({ games }: { games: Game[] }) {
    const parentRef = useRef<HTMLDivElement>(null);
  
    const virtualizer = useVirtualizer({
      count: games.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 80,
    });
  
    return (
      <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
        <div style={{ height: \`\${virtualizer.getTotalSize()}px\` }}>
          {virtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: \`\${virtualItem.size}px\`,
                transform: \`translateY(\${virtualItem.start}px)\`,
              }}
            >
              <GameCard game={games[virtualItem.index]} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  \`\`\`
  
  ### State Management
  
  Using Zustand for simple, fast state:
  
  \`\`\`typescript
  import create from 'zustand';
  
  interface GameStore {
    currentGame: Game | null;
    events: GameEvent[];
    addEvent: (event: GameEvent) => void;
    updateScore: (team: 'home' | 'away', score: number) => void;
  }
  
  export const useGameStore = create<GameStore>((set) => ({
    currentGame: null,
    events: [],
    
    addEvent: (event) =>
      set((state) => ({
        events: [...state.events, event],
      })),
    
    updateScore: (team, score) =>
      set((state) => ({
        currentGame: state.currentGame
          ? {
              ...state.currentGame,
              [\`\${team}Score\`]: score,
            }
          : null,
      })),
  }));
  \`\`\`
  
  ## Lessons Learned
  
  1. **Design for offline first** - Network issues are common in sports venues
  2. **Real-time is hard** - WebSockets need careful error handling
  3. **Domain complexity matters** - Spend time modeling your domain correctly
  4. **Performance at scale** - Virtual scrolling and memoization are your friends
  5. **User feedback is gold** - Coaches had insights we never would have thought of
  
  ## Results
  
  After 2 years of development:
  - Used by 50+ handball teams
  - Processing 1000+ games per season
  - 99.9% uptime
  - Average event latency: 100ms
  
  ## Conclusion
  
  Building 3Steps was the best learning experience of my career. The combination of real-time requirements, complex domain logic, and offline-first architecture forced me to level up in every area.
  
  *Want to learn more about 3Steps? Check out [3steps.no](https://3steps.no)*
      `,
	},
	{
		id: 6,
		title: 'Headless CMS Architecture with Sanity and Optimizely',
		excerpt:
			'Comparing headless CMS solutions and how to architect content-driven applications. Real-world experiences from client projects.',
		date: '2024-07-18',
		readTime: '9 min',
		tags: ['CMS', 'Sanity', 'Optimizely'],
		category: 'Content',
		content: `
  # Headless CMS Architecture with Sanity and Optimizely
  
  At Crayon, we work extensively with both Sanity and Optimizely. Here's what I've learned about architecting content-driven applications with headless CMS platforms.
  
  ## Why Headless?
  
  Traditional CMS platforms couple content management with presentation. Headless CMS separates them, giving you:
  
  - Freedom to use any frontend framework
  - Better performance (static generation, edge caching)
  - Multi-channel content delivery (web, mobile, IoT)
  - Developer-friendly workflows
  
  ## Sanity vs Optimizely
  
  Both are excellent, but serve different needs:
  
  ### Sanity: Developer-First
  
  **Pros:**
  - Flexible schema definitions
  - Real-time collaboration
  - Excellent DX with GROQ
  - Portable Text for rich content
  - Free tier for small projects
  
  **Best for:**
  - Startups and agencies
  - Projects requiring custom schemas
  - Real-time collaborative editing
  
  ### Optimizely: Enterprise-Ready
  
  **Pros:**
  - Mature platform with extensive features
  - A/B testing and experimentation built-in
  - Strong personalization
  - Enterprise support and SLAs
  - Powerful marketing tools
  
  **Best for:**
  - Large enterprises
  - Marketing-heavy organizations
  - Complex personalization needs
  
  ## Architecture Patterns
  
  ### Pattern 1: Static Generation (Sanity)
  
  \`\`\`typescript
  // Next.js with Sanity
  import { createClient } from '@sanity/client';
  
  const client = createClient({
    projectId: 'your-project-id',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-01-01',
  });
  
  // Fetch all blog posts
  export async function getAllPosts() {
    const posts = await client.fetch(\`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        "author": author->name,
        "categories": categories[]->title,
        excerpt,
        mainImage {
          asset-> {
            url,
            metadata {
              dimensions
            }
          }
        }
      }
    \`);
    return posts;
  }
  
  // Static Site Generation
  export async function getStaticProps() {
    const posts = await getAllPosts();
    return {
      props: { posts },
      revalidate: 60, // ISR: revalidate every 60 seconds
    };
  }
  \`\`\`
  
  ### Pattern 2: Server-Side Rendering (Optimizely)
  
  \`\`\`typescript
  // Next.js with Optimizely Content Delivery API
  import { ContentDeliveryAPI } from '@episerver/content-delivery';
  
  const contentApi = new ContentDeliveryAPI({
    baseURL: 'https://your-site.com',
    language: 'en',
  });
  
  export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { slug } = context.params;
  
    const content = await contentApi.getContentByRoute(\`/\${slug}\`);
  
    return {
      props: {
        content,
      },
    };
  }
  \`\`\`
  
  ### Pattern 3: Hybrid (Best of Both)
  
  Use static generation for most pages, server-side for personalized content:
  
  \`\`\`typescript
  // Static for public pages
  export async function getStaticProps() {
    const page = await fetchPublicPage();
    return { props: { page }, revalidate: 300 };
  }
  
  // Server-side for authenticated/personalized
  export async function getServerSideProps(context) {
    const user = await getUser(context.req);
    const personalizedContent = await fetchPersonalized(user.id);
    return { props: { content: personalizedContent } };
  }
  \`\`\`
  
  ## Content Modeling Best Practices
  
  ### Sanity Schema Example
  
  \`\`\`javascript
  export default {
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule) => Rule.required().max(80),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{ type: 'author' }],
      },
      {
        name: 'mainImage',
        title: 'Main Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'category' }] }],
      },
      {
        name: 'body',
        title: 'Body',
        type: 'blockContent',
      },
    ],
  };
  \`\`\`
  
  ## Performance Optimization
  
  ### Image Optimization
  
  Use Next.js Image with CMS assets:
  
  \`\`\`tsx
  import Image from 'next/image';
  import imageUrlBuilder from '@sanity/image-url';
  
  const builder = imageUrlBuilder(client);
  
  function urlFor(source: any) {
    return builder.image(source);
  }
  
  export function BlogImage({ image, alt }: Props) {
    return (
      <Image
        src={urlFor(image).width(800).height(600).url()}
        alt={alt}
        width={800}
        height={600}
        placeholder="blur"
        blurDataURL={urlFor(image).width(20).blur(10).url()}
      />
    );
  }
  \`\`\`
  
  ### Caching Strategy
  
  \`\`\`typescript
  // Edge caching with Vercel
  export const config = {
    runtime: 'edge',
  };
  
  // CDN caching headers
  export function getServerSideProps({ res }) {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=300'
    );
    
    return {
      props: { /* data */ },
    };
  }
  \`\`\`
  
  ## Monitoring and Analytics
  
  Track CMS performance:
  
  \`\`\`typescript
  // Track API response times
  const startTime = Date.now();
  const data = await client.fetch(query);
  const duration = Date.now() - startTime;
  
  analytics.track('CMS Query', {
    query: query,
    duration: duration,
    resultCount: data.length,
  });
  \`\`\`
  
  ## Conclusion
  
  Both Sanity and Optimizely are powerful platforms. Choose based on your needs:
  - **Sanity**: Flexible, modern, developer-friendly
  - **Optimizely**: Enterprise features, marketing power, A/B testing
  
  Either way, headless CMS architecture gives you the flexibility to build fast, scalable content-driven applications.
      `,
	},
];
