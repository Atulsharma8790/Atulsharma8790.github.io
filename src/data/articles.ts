export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  date: string
  readTime: string
  content: Section[]
}

export interface Section {
  type: 'heading' | 'paragraph' | 'list' | 'callout' | 'divider'
  text?: string
  items?: string[]
  variant?: 'tip' | 'insight' | 'warning'
}

export const articles: Article[] = [
  {
    id: 'ai-future-testing',
    slug: 'ai-assisted-automation-testing-future',
    title: 'AI-Assisted Automation Testing: What the Future Actually Looks Like',
    excerpt: 'Everyone is talking about AI in testing. Here is what it actually means for testers, architects, and quality teams — written from real experience, not hype.',
    category: 'AI & Testing',
    tags: ['AI', 'Automation', 'Future of Testing', 'LLM'],
    date: '2025-06-01',
    readTime: '7 min',
    content: [
      {
        type: 'paragraph',
        text: "Let me be honest with you. When AI started appearing in the testing world, I had the same reaction most engineers had — a mix of curiosity and mild panic. Is this going to replace my job? Is it actually useful, or just another buzzword? After working with it hands-on for the past couple of years, I have a clearer picture now.",
      },
      {
        type: 'heading',
        text: 'What AI in testing actually means today',
      },
      {
        type: 'paragraph',
        text: "Right now, AI in testing is not about replacing testers. It is about removing the boring parts of the job so engineers can focus on the thinking parts. The most useful thing I have seen AI do is read an API specification and produce a first draft of test cases. Not perfect test cases — a starting point. That alone saves hours.",
      },
      {
        type: 'paragraph',
        text: "We built a pipeline at work where an LLM reads our OpenAPI specs, understands what each endpoint does, and generates test skeletons in Playwright and RestAssured. Engineers then review, adjust, and approve before anything goes into the codebase. The result? What used to take a day now takes a couple of hours.",
      },
      {
        type: 'callout',
        variant: 'insight',
        text: 'AI does not write your tests. It writes the first draft. You still need an engineer who understands what "correct behaviour" means for your product.',
      },
      {
        type: 'heading',
        text: 'The three things AI is genuinely good at in testing',
      },
      {
        type: 'list',
        items: [
          'Generating test cases from documentation — give it a spec, get back test scenarios you can then refine',
          'Categorising and explaining test failures — instead of reading stack traces, get a plain English summary of what went wrong',
          'Suggesting what to test when code changes — AI can look at a diff and flag which areas are higher risk',
        ],
      },
      {
        type: 'heading',
        text: 'Where AI struggles right now',
      },
      {
        type: 'paragraph',
        text: "AI does not understand business context. It can read your code but it does not know that if a user's subscription lapses on a Friday evening, there is a specific grace period rule that was agreed three years ago with the legal team. That context lives in someone's head, not in a spec file. So if you let AI write tests without human oversight, it will produce technically correct but functionally incomplete tests.",
      },
      {
        type: 'paragraph',
        text: "It also struggles with anything that requires visual judgment, end-to-end user flows with complex state, and anything where the correctness depends on business rules that have never been written down.",
      },
      {
        type: 'heading',
        text: 'What the next few years will bring',
      },
      {
        type: 'paragraph',
        text: "I think we are heading towards a world where AI handles routine test maintenance — fixing broken selectors, regenerating tests after UI changes, flagging redundant tests. The engineer's job becomes more about strategy: deciding what to test, reviewing AI output, and owning the test architecture.",
      },
      {
        type: 'list',
        items: [
          'Self-healing tests that fix themselves when a UI element moves',
          'Intelligent test selection that picks the right 20% of tests to run before a release',
          'AI-generated exploratory test sessions based on usage patterns',
          'Automated root cause analysis when a test fails in production',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        text: 'The testers who will thrive are the ones who learn to work with AI — reviewing its output, catching its mistakes, and using it to go faster. Not the ones who ignore it.',
      },
      {
        type: 'heading',
        text: 'My honest take',
      },
      {
        type: 'paragraph',
        text: "AI will not replace good quality engineers. It will replace the ones who are only doing repetitive scripting without understanding the bigger picture. If your value is writing boilerplate test code, that is at risk. If your value is understanding risk, architecture, business impact, and quality strategy — you are more valuable than ever, because now you have a tool that removes the grunt work.",
      },
    ],
  },

  {
    id: 'automation-architect-path',
    slug: 'how-to-become-automation-test-architect',
    title: 'How to Become an Automation Test Architect (From Someone Who Did It)',
    excerpt: 'The path from writing tests to architecting them is not about learning more tools. It is about changing how you think. Here is what that shift looks like.',
    category: 'Architecture',
    tags: ['Career', 'Architecture', 'Leadership', 'Growth'],
    date: '2025-05-15',
    readTime: '8 min',
    content: [
      {
        type: 'paragraph',
        text: "When I was five years into my career, someone asked me to design an automation framework from scratch for a new project. I said yes confidently and then spent the next week quietly panicking. I had been writing automation for years but I had never designed the system that automation lived inside.",
      },
      {
        type: 'paragraph',
        text: "That panic was the beginning of me becoming an architect. This article is about that journey — what changed, what I had to learn, and what no one tells you about making that shift.",
      },
      {
        type: 'heading',
        text: 'The difference between an automation engineer and an architect',
      },
      {
        type: 'paragraph',
        text: "An automation engineer asks: how do I test this feature? An architect asks: how do we build a system that can test everything reliably, at scale, over the next three years — and can be maintained by a team of people with varying skill levels.",
      },
      {
        type: 'paragraph',
        text: "That is the core difference. One is about the test. The other is about the system the tests live in.",
      },
      {
        type: 'callout',
        variant: 'insight',
        text: "An architect's job is to make the right choices today so the team does not suffer for them two years from now.",
      },
      {
        type: 'heading',
        text: 'What you actually need to learn',
      },
      {
        type: 'paragraph',
        text: "People often think becoming an architect means learning more tools. It does not. Here is what actually matters:",
      },
      {
        type: 'list',
        items: [
          'Design patterns — not just Page Object Model, but understanding why patterns exist and when to use them',
          'How CI/CD pipelines work at a deep level — not just triggering Jenkins, but understanding parallelism, flakiness isolation, reporting pipelines',
          'The product and business — you cannot make good architecture decisions without understanding what you are protecting',
          'How to say no — architects constantly get requests to add things to frameworks, and knowing what not to build is critical',
          'How to document decisions — your architecture needs to survive without you explaining it every day',
        ],
      },
      {
        type: 'heading',
        text: 'The three phases I went through',
      },
      {
        type: 'paragraph',
        text: "Phase one was about tools. I learned Selenium, then Appium, then RestAssured. I got good at writing tests. I thought that was the job. It is not — it is the foundation.",
      },
      {
        type: 'paragraph',
        text: "Phase two was about frameworks. I stopped writing tests and started building the system tests run inside. Data-driven execution, utility libraries, CI integration, reporting. This is where most people plateau. I did too, for a while.",
      },
      {
        type: 'paragraph',
        text: "Phase three was about strategy. What do we test? How much coverage is enough? What is the cost of a false negative vs a false positive? How does quality fit into the delivery pipeline? This is the architect level. It is less about code and more about judgment.",
      },
      {
        type: 'heading',
        text: 'Practical steps to make the shift',
      },
      {
        type: 'list',
        items: [
          'Stop asking "how do I automate this" and start asking "should we automate this, and what is the cost if we do not"',
          'Read the product roadmap, not just the sprint tickets — understand where the product is going',
          'Volunteer to design the next framework, even if it is small — you learn by doing',
          'Study existing frameworks critically — do not just use them, ask why they are designed the way they are',
          'Talk to developers about their architecture — quality and development architecture are not separate topics',
          'Start writing down your decisions and the reasons for them — this is the first skill of an architect',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        text: "The fastest way to grow is to work on a messy, legacy framework that no one wants to touch. You will learn more from untangling that than from starting from scratch.",
      },
      {
        type: 'heading',
        text: 'What no one tells you',
      },
      {
        type: 'paragraph',
        text: "The hardest part of being an architect is not the technical work. It is convincing people — developers, product managers, stakeholders — that your decisions are correct, before the results prove it. You have to make the case for investments in quality infrastructure that will not show obvious results for months.",
      },
      {
        type: 'paragraph',
        text: "And sometimes you will make the wrong call. A framework decision that seemed smart will become a bottleneck later. That is fine. Document why you made it, learn from it, and change direction when the evidence is clear. Architects who cannot change their minds are dangerous.",
      },
      {
        type: 'heading',
        text: 'The honest timeline',
      },
      {
        type: 'paragraph',
        text: "It took me about five to six years of serious practice to feel genuinely confident at the architect level. Not because it is that hard, but because you need time with real-world scale, real teams, and real production failures to develop the judgment that architecture requires. Shortcuts here are risky.",
      },
    ],
  },

  {
    id: 'ai-test-generation-2025',
    slug: 'ai-test-generation-openapi-to-runnable-tests',
    title: 'AI-Powered Test Generation: From API Spec to Runnable Tests in Minutes',
    excerpt: 'How I built an LLM pipeline that reads API specifications and generates ready-to-review test cases — saving 40% of test authoring time at a Fortune 500 client.',
    category: 'AI & Testing',
    tags: ['AI', 'LLM', 'Test Automation', 'OpenAI', 'Playwright'],
    date: '2025-03-15',
    readTime: '8 min',
    content: [
      {
        type: 'paragraph',
        text: "A client I work with has over 200 microservices. Every sprint, new endpoints get added. Every sprint, someone has to sit down and write tests for those endpoints. That someone was always a QA engineer with a backlog already longer than their week.",
      },
      {
        type: 'paragraph',
        text: "The question I wanted to answer was simple: what if the first draft of those tests wrote itself?",
      },
      {
        type: 'heading',
        text: 'The problem with manual test authoring at scale',
      },
      {
        type: 'paragraph',
        text: "Writing API tests is not hard. But it is repetitive. For every endpoint, you need happy path coverage, error cases, boundary conditions, and authentication checks. Doing that for 200 services, with new ones added regularly, is a grind. Engineers start cutting corners. Coverage drops. Things slip.",
      },
      {
        type: 'heading',
        text: 'What we built',
      },
      {
        type: 'paragraph',
        text: "We built a pipeline that takes an OpenAPI specification as input and produces test case skeletons in Playwright and Python as output. The process has three steps.",
      },
      {
        type: 'list',
        items: [
          'Parse the OpenAPI spec — extract endpoints, methods, request bodies, expected response codes, and any examples',
          'Feed that to an LLM with a structured prompt that says "generate test cases covering happy paths, error scenarios, and boundary conditions"',
          'Output clean, runnable test files that engineers review, adjust, and approve before merging',
        ],
      },
      {
        type: 'callout',
        variant: 'insight',
        text: "The key word is review. AI writes the draft. An engineer approves it. We never let generated tests go straight to the codebase without a human eye on them.",
      },
      {
        type: 'heading',
        text: 'What the prompt looks like',
      },
      {
        type: 'paragraph',
        text: "The prompt is not magic. We give the LLM the endpoint details, tell it the test framework we are using, give it an example of a well-written test from our codebase, and ask it to follow that style. Consistency matters more than cleverness here.",
      },
      {
        type: 'heading',
        text: 'What the results looked like',
      },
      {
        type: 'list',
        items: [
          'Test authoring time dropped by about 40% across the team',
          'New microservices went from zero test coverage to basic coverage in under four hours',
          'Engineers started spending time on edge cases and business logic rather than boilerplate',
          'Zero critical production escapes in the two quarters after we rolled it out',
        ],
      },
      {
        type: 'heading',
        text: 'Where it fell short',
      },
      {
        type: 'paragraph',
        text: "The AI did not know about our business rules. It generated technically correct tests — if the spec said an endpoint returns 200 on success, it tested for 200. But it did not know that a particular endpoint should only return certain data for certain user roles, or that a specific combination of parameters triggers a special workflow. Those tests had to be written by hand.",
      },
      {
        type: 'callout',
        variant: 'tip',
        text: "Use AI generation for the skeleton, then add your business logic tests manually. It is not either-or — it is both.",
      },
      {
        type: 'heading',
        text: 'Is it worth building?',
      },
      {
        type: 'paragraph',
        text: "Yes, if you have more than a handful of services and a team that is constantly behind on test coverage. The investment to build the pipeline was maybe two weeks of engineering time. The ongoing benefit is visible every sprint. For larger organisations, this is a no-brainer.",
      },
    ],
  },

  {
    id: 'qa-architect-mindset',
    slug: 'qa-architect-mindset-why-just-automate-it-is-never-the-answer',
    title: 'The QA Architect Mindset: Why "Just Automate It" Is Never the Answer',
    excerpt: 'The difference between a test engineer and a QA architect is not seniority. It is a fundamentally different way of thinking about systems, risk, and business outcomes.',
    category: 'Architecture',
    tags: ['Architecture', 'Leadership', 'Quality Strategy'],
    date: '2025-02-10',
    readTime: '6 min',
    content: [
      {
        type: 'paragraph',
        text: 'I hear "just automate it" at least once a week. It usually comes from a well-meaning product manager or a developer who wants faster feedback. And every time I hear it, I take a breath before answering.',
      },
      {
        type: 'paragraph',
        text: 'Because the question is not whether to automate something. The question is what you are trying to achieve, whether automation is the right tool for it, and what the long-term cost of that automation will be.',
      },
      {
        type: 'heading',
        text: 'Automation is not free',
      },
      {
        type: 'paragraph',
        text: 'Every automated test you write is a piece of code that needs to be maintained. It will break when the UI changes. It will become flaky when the environment is unstable. It will need to be updated when the feature evolves. The cost of automation is not just writing it — it is everything that comes after.',
      },
      {
        type: 'paragraph',
        text: 'A QA engineer asks: can I automate this? An architect asks: should I, and what will it cost to keep it working?',
      },
      {
        type: 'callout',
        variant: 'insight',
        text: 'Automating the wrong things at the wrong layer is one of the most common ways QA teams create technical debt that nobody budgets for.',
      },
      {
        type: 'heading',
        text: 'The testing pyramid exists for a reason',
      },
      {
        type: 'paragraph',
        text: 'Most teams have too many UI tests and not enough API and unit tests. UI tests are slow, brittle, and expensive to maintain. API tests are faster, more stable, and catch most of the same issues. But UI tests feel more impressive in demos, so they get prioritised.',
      },
      {
        type: 'paragraph',
        text: 'An architect steers the team towards the right layer. Not because of theory, but because of the real cost they have seen from getting it wrong.',
      },
      {
        type: 'heading',
        text: 'What I actually think about before recommending automation',
      },
      {
        type: 'list',
        items: [
          'How often does this flow change? If it changes every sprint, automation will spend more time being fixed than running.',
          'What is the risk if this breaks in production? High risk areas deserve automated coverage. Low risk areas might not.',
          'Is there already coverage at a lower layer? An API test might already catch what you want to validate at the UI layer.',
          'Who will maintain this? If the team does not have the skills to maintain it, you are creating a liability.',
          'What is the business cost of a false pass? Sometimes a flaky test that sometimes passes when it should fail is worse than no test at all.',
        ],
      },
      {
        type: 'heading',
        text: 'The mindset shift',
      },
      {
        type: 'paragraph',
        text: 'Moving from engineer to architect is about moving from "how do I do this?" to "should we do this, and if so, how do we do it in a way that does not hurt us later?"',
      },
      {
        type: 'paragraph',
        text: 'That is a harder question to answer. It requires understanding the product, the team, the risk profile, and the long-term roadmap. But it is the question that separates people who build automation systems that work for years from people who build ones that get quietly abandoned six months later.',
      },
      {
        type: 'callout',
        variant: 'tip',
        text: 'Before automating anything, ask: if this test fails six months from now, will anyone know how to fix it? If the answer is no, reconsider.',
      },
    ],
  },

  {
    id: 'enterprise-automation-anti-patterns',
    slug: '5-enterprise-automation-anti-patterns-that-kill-teams',
    title: '5 Enterprise Automation Anti-Patterns That Kill Teams',
    excerpt: 'After 13 years of building automation frameworks, here are the five patterns I see repeatedly fail — and what to do instead.',
    category: 'Automation',
    tags: ['Automation', 'Best Practices', 'Enterprise'],
    date: '2025-01-20',
    readTime: '10 min',
    content: [
      {
        type: 'paragraph',
        text: 'I have seen automation projects fail in almost every way possible. Rarely from a lack of effort. Usually from patterns that seemed reasonable at the start and became liabilities over time. Here are the five that come up again and again.',
      },
      {
        type: 'heading',
        text: '1. The "automate everything" trap',
      },
      {
        type: 'paragraph',
        text: 'When a team first discovers automation, there is a natural excitement to automate everything. Every test case, every regression scenario, every edge case that was ever found. This sounds good. It is not.',
      },
      {
        type: 'paragraph',
        text: 'What happens is the team ends up with thousands of tests, many of them duplicating each other, many covering low-risk areas, and most requiring constant maintenance. The suite takes four hours to run. Engineers stop trusting it. It becomes a box-ticking exercise rather than a quality signal.',
      },
      {
        type: 'callout',
        variant: 'insight',
        text: 'Automate the right things, not all the things. Coverage percentage is a vanity metric if what you have covered is not what matters.',
      },
      {
        type: 'heading',
        text: '2. One person owns the framework',
      },
      {
        type: 'paragraph',
        text: 'This is the most dangerous pattern I see. One senior engineer builds the framework, understands it deeply, and becomes the single point of failure. When they leave or move to another project, the framework slowly decays because nobody else understands it well enough to maintain it.',
      },
      {
        type: 'paragraph',
        text: 'Fix this by treating framework knowledge the same way good engineering teams treat system knowledge — document decisions, run learning sessions, make sure at least two or three people can make changes confidently.',
      },
      {
        type: 'heading',
        text: '3. Tests are written as an afterthought',
      },
      {
        type: 'paragraph',
        text: 'When automation is something that happens after the feature is done, you end up with tests that are written around an existing implementation rather than based on the expected behaviour. They test what the code does, not what it should do.',
      },
      {
        type: 'paragraph',
        text: 'The better approach is for QA to be involved when requirements are being defined. When an engineer understands what the feature is supposed to do, the tests they write are more meaningful.',
      },
      {
        type: 'heading',
        text: '4. Flaky tests are tolerated',
      },
      {
        type: 'paragraph',
        text: 'A flaky test — one that sometimes passes and sometimes fails for no clear reason — is not just annoying. It is actively harmful. When engineers see flaky tests, they start ignoring failures. "Oh, that test is just flaky, re-run the suite." This normalises ignoring failures, and eventually a real failure gets ignored too.',
      },
      {
        type: 'list',
        items: [
          'Treat a flaky test the same way you treat a production bug — it needs to be investigated and fixed',
          'If you cannot fix it quickly, quarantine it so it does not block the pipeline while you work on it',
          'Track flakiness over time — if a test fails more than 5% of the time for environmental reasons, it is a problem',
        ],
      },
      {
        type: 'heading',
        text: '5. The framework is built for today, not for tomorrow',
      },
      {
        type: 'paragraph',
        text: 'The most common architectural mistake is building a framework that perfectly fits the current product and team size, with no thought for how it will need to evolve. Six months later the team doubles, the product adds a new platform, and the framework cannot handle it without a major rewrite.',
      },
      {
        type: 'paragraph',
        text: 'Before building a framework, ask: what will this product look like in two years? What platforms will we need to cover? How many engineers will be writing tests? Build for where you are going, not just where you are.',
      },
      {
        type: 'callout',
        variant: 'tip',
        text: 'The frameworks I have seen last the longest are the ones that are modular, opinionated about structure, and boring by design. Clever frameworks age badly.',
      },
    ],
  },

  {
    id: 'performance-testing-beyond-jmeter',
    slug: 'performance-testing-2025-beyond-jmeter',
    title: 'Performance Testing in 2025: Beyond JMeter',
    excerpt: 'JMeter is still relevant, but the ecosystem has evolved. Here is my take on the modern performance testing toolkit — and when to use which tool.',
    category: 'Performance',
    tags: ['Performance', 'JMeter', 'K6', 'Load Testing'],
    date: '2024-12-05',
    readTime: '7 min',
    content: [
      {
        type: 'paragraph',
        text: 'I have been using JMeter since 2014. It has done a lot of good work for me over the years. But in 2025, defaulting to JMeter for every performance testing need is like still using Internet Explorer because you know where everything is.',
      },
      {
        type: 'paragraph',
        text: 'The tooling landscape has genuinely improved. Here is an honest look at what exists now, where each tool fits, and when to reach for which one.',
      },
      {
        type: 'heading',
        text: 'JMeter: Still solid, but showing its age',
      },
      {
        type: 'paragraph',
        text: "JMeter is a mature tool that works well for traditional load testing — simulating many users hitting a service over time. It has a large ecosystem, good reporting, and most performance engineers already know it. If your team is comfortable with it and it covers your needs, there is no reason to switch.",
      },
      {
        type: 'paragraph',
        text: 'Where JMeter struggles: the GUI is dated, the scripting is verbose, it does not fit naturally into modern CI/CD workflows, and running it at serious scale requires infrastructure management that feels heavyweight compared to newer options.',
      },
      {
        type: 'heading',
        text: 'K6: The modern developer-friendly option',
      },
      {
        type: 'paragraph',
        text: 'K6 is written by Grafana Labs and designed for developers who want to write performance tests in JavaScript. The tests look like code, not XML configuration. They version control cleanly, integrate easily with CI/CD, and K6 Cloud gives you managed execution if you need to scale.',
      },
      {
        type: 'paragraph',
        text: "If your team writes JavaScript or TypeScript already, K6 will feel natural. Adoption is fast. The learning curve is much lower than JMeter.",
      },
      {
        type: 'callout',
        variant: 'insight',
        text: 'K6 is my default recommendation for teams starting performance testing from scratch in 2025. JMeter is my recommendation when migrating an existing JMeter-based programme.',
      },
      {
        type: 'heading',
        text: 'Locust: When you want Python',
      },
      {
        type: 'paragraph',
        text: 'Locust is a Python-based load testing tool. If your team is Python-heavy — common in data, ML, and backend Python shops — Locust is a natural fit. You write user behaviour as Python classes. It is easy to customise, easy to extend, and the web UI is clean.',
      },
      {
        type: 'paragraph',
        text: 'I used Locust at Airtel Digital for async API performance testing and it worked well. The distributed mode for high-scale tests requires a bit of setup, but once it is running, it is stable.',
      },
      {
        type: 'heading',
        text: 'Grafana for visibility',
      },
      {
        type: 'paragraph',
        text: 'Whichever tool you use for load generation, Grafana combined with InfluxDB or Prometheus is the standard for visualising performance test results in real time. Watching response times, error rates, and throughput as the test runs — rather than reading a report afterwards — changes how you interpret results.',
      },
      {
        type: 'heading',
        text: 'My current stack recommendation',
      },
      {
        type: 'list',
        items: [
          'K6 for load generation — clean code, CI-friendly, good defaults',
          'Grafana + InfluxDB for real-time dashboards during test runs',
          'K6 Cloud or AWS for distributed execution when you need serious scale',
          'JMeter when the project already has JMeter scripts and migrating is not worth the effort',
          'Locust when the team is Python-first',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        text: "The tool matters less than the practice. A team with good performance testing habits and JMeter will always outperform a team with K6 but no clear performance targets, no baseline, and no one reviewing the results.",
      },
      {
        type: 'heading',
        text: 'The thing most teams skip',
      },
      {
        type: 'paragraph',
        text: 'Define what "good" looks like before you run a single test. What is your acceptable response time at peak load? What is your acceptable error rate? What does a failed performance test actually mean for the release decision? Without answers to those questions, you have load numbers but no judgment about what to do with them.',
      },
    ],
  },
]
