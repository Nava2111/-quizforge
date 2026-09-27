/**
 * QuizForge - Question Bank Data Store
 * Contains technical mock test configurations and comprehensive question datasets across 9 categories.
 */

const TEST_CONFIGS = [
  {
    id: "web-dev",
    category: "Web Development",
    title: "Web Development Mock Test",
    description: "Master modern HTML5, CSS3, JavaScript ES6+, DOM manipulation, and asynchronous architecture.",
    durationMinutes: 15,
    difficulty: "Medium",
    icon: "code",
    color: "#3b82f6",
    badge: "Popular",
    questionCount: 15
  },
  {
    id: "dsa",
    category: "Data Structures & Algorithms",
    title: "DSA Core & Problem Solving",
    description: "Assess understanding of trees, graphs, sorting, searching, dynamic programming, and complexity analysis.",
    durationMinutes: 20,
    difficulty: "Hard",
    icon: "git-merge",
    color: "#8b5cf6",
    badge: "High Impact",
    questionCount: 15
  },
  {
    id: "python",
    category: "Python",
    title: "Python Engineering Assessment",
    description: "Test Pythonic idioms, memory management, decorators, OOP, generators, and standard library mastery.",
    durationMinutes: 15,
    difficulty: "Medium",
    icon: "terminal",
    color: "#10b981",
    badge: "Core",
    questionCount: 15
  },
  {
    id: "java",
    category: "Java",
    title: "Java & JVM Enterprise Concepts",
    description: "Evaluate core Java, multithreading, concurrency, JVM internals, collections framework, and OOP principles.",
    durationMinutes: 20,
    difficulty: "Hard",
    icon: "coffee",
    color: "#f59e0b",
    badge: "Enterprise",
    questionCount: 15
  },
  {
    id: "dbms",
    category: "DBMS",
    title: "Database Management & SQL",
    description: "Explore normalization, ACID properties, indexing (B-Trees), query optimization, and transactions.",
    durationMinutes: 15,
    difficulty: "Medium",
    icon: "database",
    color: "#ec4899",
    badge: "Essential",
    questionCount: 15
  },
  {
    id: "networks",
    category: "Computer Networks",
    title: "Computer Networks & Protocols",
    description: "Deep dive into OSI/TCP-IP models, routing protocols, HTTP/HTTPS/QUIC, DNS, subnetting, and socket layers.",
    durationMinutes: 15,
    difficulty: "Medium",
    icon: "globe",
    color: "#06b6d4",
    badge: "Foundational",
    questionCount: 15
  },
  {
    id: "os",
    category: "Operating Systems",
    title: "Operating Systems Internals",
    description: "Understand process scheduling, virtual memory, paging, race conditions, semaphores, and file systems.",
    durationMinutes: 20,
    difficulty: "Hard",
    icon: "cpu",
    color: "#6366f1",
    badge: "Systems",
    questionCount: 15
  },
  {
    id: "ai",
    category: "Artificial Intelligence",
    title: "AI & Machine Learning Foundations",
    description: "Test concepts in neural networks, search algorithms, loss functions, reinforcement learning, and transformers.",
    durationMinutes: 15,
    difficulty: "Medium",
    icon: "bot",
    color: "#14b8a6",
    badge: "Cutting Edge",
    questionCount: 15
  },
  {
    id: "aptitude",
    category: "Aptitude",
    title: "Quantitative & Logical Aptitude",
    description: "Benchmark analytical speed, logical deduction, permutations, probability, series, and time & work reasoning.",
    durationMinutes: 15,
    difficulty: "Easy",
    icon: "zap",
    color: "#eab308",
    badge: "General",
    questionCount: 15
  }
];

const QUESTION_BANK = {
  "Web Development": [
    {
      id: "WD-101",
      category: "Web Development",
      question: "What is the primary difference between `localStorage` and `sessionStorage` in the browser Web Storage API?",
      options: [
        "`localStorage` data persists even when the browser is closed and reopened, while `sessionStorage` expires when the page session ends.",
        "`localStorage` sends data with every HTTP request header, whereas `sessionStorage` stays client-side only.",
        "`sessionStorage` has a storage limit of 10MB whereas `localStorage` is restricted to 4KB.",
        "`localStorage` can only store numeric and boolean types, while `sessionStorage` stores full objects."
      ],
      answer: "`localStorage` data persists even when the browser is closed and reopened, while `sessionStorage` expires when the page session ends.",
      explanation: "`localStorage` provides persistent client-side key-value storage with no expiration date. In contrast, `sessionStorage` maintains a separate storage area for each given origin that is available for the duration of the page session (as long as the browser tab is open).",
      difficulty: "Easy"
    },
    {
      id: "WD-102",
      category: "Web Development",
      question: "In the JavaScript Event Loop, which queue takes highest execution priority immediately after the synchronous execution stack finishes running?",
      options: [
        "Microtask Queue (Promises, queueMicrotask, MutationObserver)",
        "Macrotask / Task Queue (setTimeout, setInterval)",
        "RequestAnimationFrame Queue",
        "I/O Polling Callback Queue"
      ],
      answer: "Microtask Queue (Promises, queueMicrotask, MutationObserver)",
      explanation: "After each task completes on the call stack, the JavaScript event loop empties the entire Microtask Queue before moving to the next macrotask (such as setTimeout or DOM event callbacks).",
      difficulty: "Medium"
    },
    {
      id: "WD-103",
      category: "Web Development",
      question: "What will the following JavaScript expression evaluate to?\n`console.log([] + {})` and `console.log({} + [])`",
      options: [
        "`\"[object Object]\"` and `\"[object Object]\"` (in standard expression context)",
        "`undefined` and `NaN`",
        "`[]` and `{}`",
        "`TypeError: Cannot convert object to primitive`"
      ],
      answer: "`\"[object Object]\"` and `\"[object Object]\"` (in standard expression context)",
      explanation: "When applying binary `+` on objects, both operands are converted to primitives. `[]` becomes `\"\"` and `{}` becomes `\"[object Object]\"`. Hence `\"\" + \"[object Object]\"` produces `\"[object Object]\"`.",
      difficulty: "Hard"
    },
    {
      id: "WD-104",
      category: "Web Development",
      question: "Which CSS layout property creates a new Block Formatting Context (BFC) without modifying layout dimensions?",
      options: [
        "`display: flow-root;`",
        "`position: relative;`",
        "`box-sizing: border-box;`",
        "`visibility: collapse;`"
      ],
      answer: "`display: flow-root;`",
      explanation: "`display: flow-root;` generates a block container element that establishes a new Block Formatting Context (BFC) cleanly without hacky side-effects like `overflow: hidden` or clearing floats.",
      difficulty: "Medium"
    },
    {
      id: "WD-105",
      category: "Web Development",
      question: "What is the purpose of HTTP/2 Multiplexing over a single TCP connection?",
      options: [
        "It allows interleaving multiple bidirectional request and response frames simultaneously without Head-of-Line blocking at the application layer.",
        "It compresses all HTTP body payloads using Gzip by default.",
        "It replaces TLS encryption with custom socket handshakes.",
        "It forces DNS lookups to cache permanently on client browsers."
      ],
      answer: "It allows interleaving multiple bidirectional request and response frames simultaneously without Head-of-Line blocking at the application layer.",
      explanation: "HTTP/2 introduces binary framing and multiplexing, allowing multiple requests and responses to be sent concurrently across one TCP connection without waiting for prior responses.",
      difficulty: "Hard"
    },
    {
      id: "WD-106",
      category: "Web Development",
      question: "What does the `defer` attribute in a `<script>` tag accomplish?",
      options: [
        "Downloads the script asynchronously during HTML parsing and executes it in document order only after HTML parsing is complete.",
        "Halts HTML parsing until the external script is completely fetched and executed.",
        "Executes the script asynchronously as soon as it arrives, potentially interrupting HTML parsing.",
        "Delays script downloading until the user triggers a click or scroll event."
      ],
      answer: "Downloads the script asynchronously during HTML parsing and executes it in document order only after HTML parsing is complete.",
      explanation: "`defer` fetches the script in the background while the HTML is parsing, then runs the script right before `DOMContentLoaded` in the exact order specified in HTML.",
      difficulty: "Easy"
    },
    {
      id: "WD-107",
      category: "Web Development",
      question: "What is the critical difference between `WeakMap` and `Map` in JavaScript?",
      options: [
        "`WeakMap` keys must be objects (or non-registered symbols) and are held weakly, permitting garbage collection if there are no other references.",
        "`WeakMap` maintains key insertion order while `Map` uses an unordered hash structure.",
        "`WeakMap` allows iteration via `for...of` loops, whereas `Map` does not support iteration.",
        "`Map` values are garbage collected automatically after 5 minutes."
      ],
      answer: "`WeakMap` keys must be objects (or non-registered symbols) and are held weakly, permitting garbage collection if there are no other references.",
      explanation: "`WeakMap` allows memory to be reclaimed when key objects become unreachable elsewhere in the app. Consequently, `WeakMap` is not iterable and has no `.size` property.",
      difficulty: "Hard"
    },
    {
      id: "WD-108",
      category: "Web Development",
      question: "Which HTTP header is mandatory for preventing Cross-Site Scripting (XSS) attacks through content restriction?",
      options: [
        "`Content-Security-Policy` (CSP)",
        "`Access-Control-Allow-Origin` (CORS)",
        "`Strict-Transport-Security` (HSTS)",
        "`X-Frame-Options`"
      ],
      answer: "`Content-Security-Policy` (CSP)",
      explanation: "CSP (Content Security Policy) restricts the sources from which scripts, images, styles, and plugins can be loaded and executed, effectively neutralizing most XSS vectors.",
      difficulty: "Medium"
    },
    {
      id: "WD-109",
      category: "Web Development",
      question: "In CSS Grid, what does `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));` do?",
      options: [
        "Creates a responsive column layout where columns wrap automatically, each being at least 250px wide and stretching equally to fill remaining space.",
        "Forces exactly 4 fixed columns of 250px each regardless of container width.",
        "Collapses empty columns into 0px width while keeping active columns fixed at 250px.",
        "Renders a horizontal masonry grid with fixed vertical track heights."
      ],
      answer: "Creates a responsive column layout where columns wrap automatically, each being at least 250px wide and stretching equally to fill remaining space.",
      explanation: "`auto-fit` with `minmax(250px, 1fr)` dynamically calculates how many 250px tracks fit into the container and stretches them to distribute leftover width.",
      difficulty: "Medium"
    },
    {
      id: "WD-110",
      category: "Web Development",
      question: "What is the difference between `Event.stopPropagation()` and `Event.stopImmediatePropagation()`?",
      options: [
        "`stopPropagation()` halts bubbling up the DOM tree; `stopImmediatePropagation()` additionally stops other listeners on the SAME element from executing.",
        "`stopPropagation()` is asynchronous whereas `stopImmediatePropagation()` is synchronous.",
        "`stopImmediatePropagation()` cancels the browser default behavior like form submission.",
        "They are identical aliases in modern ECMAScript standards."
      ],
      answer: "`stopPropagation()` halts bubbling up the DOM tree; `stopImmediatePropagation()` additionally stops other listeners on the SAME element from executing.",
      explanation: "`stopPropagation()` stops the event from propagating further in the bubbling/capturing phase. `stopImmediatePropagation()` stops both parent propagation and any other remaining event listeners attached to the current element.",
      difficulty: "Hard"
    },
    {
      id: "WD-111",
      category: "Web Development",
      question: "Which pseudo-class matches an element only if it matches all selector arguments passed inside it?",
      options: [
        "`:is()`",
        "`:where()`",
        "`:has()`",
        "`:not()`"
      ],
      answer: "`:is()`",
      explanation: "The `:is()` pseudo-class matches elements that match any of the selector list items with the specificity of its most specific argument, while `:where()` has 0 specificity.",
      difficulty: "Easy"
    },
    {
      id: "WD-112",
      category: "Web Development",
      question: "In Web Performance metrics, what does INP (Interaction to Next Paint) measure?",
      options: [
        "The overall responsiveness of a page by measuring the latency of all user interactions (clicks, taps, keypresses) throughout the session.",
        "The time taken to render the largest text block or image on the viewport.",
        "The cumulative visual shifting of layout elements during page load.",
        "The initial server response time for the root HTML document."
      ],
      answer: "The overall responsiveness of a page by measuring the latency of all user interactions (clicks, taps, keypresses) throughout the session.",
      explanation: "INP replaced FID (First Input Delay) as a Core Web Vital. It assesses a page's overall responsiveness to user interactions by sampling all clicks, taps, and keyboard inputs throughout the page lifecycle.",
      difficulty: "Medium"
    },
    {
      id: "WD-113",
      category: "Web Development",
      question: "What does the `SameSite=Strict` cookie attribute enforce?",
      options: [
        "The cookie is never sent in cross-site requests, including when clicking a normal hyperlink from an external site to your site.",
        "The cookie is only sent over HTTPS connections.",
        "The cookie cannot be read by JavaScript `document.cookie`.",
        "The cookie expires immediately when the user changes IP address."
      ],
      answer: "The cookie is never sent in cross-site requests, including when clicking a normal hyperlink from an external site to your site.",
      explanation: "`SameSite=Strict` ensures cookies are strictly withheld on cross-site requests, defending against CSRF attacks even on top-level navigation.",
      difficulty: "Medium"
    },
    {
      id: "WD-114",
      category: "Web Development",
      question: "How does the `structuredClone()` method compare to `JSON.parse(JSON.stringify(obj))` for deep copying?",
      options: [
        "`structuredClone()` properly handles cyclic references, Date objects, RegExps, Maps, Sets, and ArrayBuffers without data loss.",
        "`structuredClone()` is only compatible with Primitive types and strings.",
        "`JSON.parse(JSON.stringify(obj))` is faster and handles functions natively.",
        "`structuredClone()` creates shallow prototypes instead of deep objects."
      ],
      answer: "`structuredClone()` properly handles cyclic references, Date objects, RegExps, Maps, Sets, and ArrayBuffers without data loss.",
      explanation: "`structuredClone()` is a native browser algorithm that correctly duplicates complex objects, cyclic graphs, TypedArrays, Dates, Maps, and Sets without losing data types.",
      difficulty: "Easy"
    },
    {
      id: "WD-115",
      category: "Web Development",
      question: "What is the role of the `Service Worker` lifecycle state `activate`?",
      options: [
        "It provides a safe window to clean up outdated caches and migrate database schemas before handling fetch events.",
        "It immediately intercepts all ongoing network requests of already open tabs.",
        "It downloads the new service worker script from the server.",
        "It compiles WebAssembly binaries for the background thread."
      ],
      answer: "It provides a safe window to clean up outdated caches and migrate database schemas before handling fetch events.",
      explanation: "During the `activate` event, the new Service Worker has gained control, making it the canonical lifecycle hook to purge old cache versions.",
      difficulty: "Hard"
    }
  ],

  "Data Structures & Algorithms": [
    {
      id: "DSA-201",
      category: "Data Structures & Algorithms",
      question: "What is the worst-case time complexity of QuickSelect for finding the k-th smallest element when using Lomuto partitioning without median-of-medians?",
      options: [
        "O(n²)",
        "O(n log n)",
        "O(n)",
        "O(log n)"
      ],
      answer: "O(n²)",
      explanation: "While QuickSelect has an average time complexity of O(n), poor pivot selection (such as already sorted array with extreme pivots) can degenerate the recurrence to T(n) = T(n-1) + O(n), yielding O(n²).",
      difficulty: "Medium"
    },
    {
      id: "DSA-202",
      category: "Data Structures & Algorithms",
      question: "In an AVL tree, what is the maximum balance factor allowed for any node before rotation is triggered?",
      options: [
        "Strictly -1, 0, or +1",
        "-2, 0, or +2",
        "Any value less than the tree height",
        "0 only (perfect balance)"
      ],
      answer: "Strictly -1, 0, or +1",
      explanation: "An AVL tree is a self-balancing Binary Search Tree where the height difference (balance factor = height(left) - height(right)) of any node must remain in {-1, 0, +1}. An absolute value >= 2 requires tree rotations.",
      difficulty: "Easy"
    },
    {
      id: "DSA-203",
      category: "Data Structures & Algorithms",
      question: "Which algorithm finds the single-source shortest paths in a directed graph that may contain negative edge weights, but no negative cycles?",
      options: [
        "Bellman-Ford Algorithm",
        "Dijkstra's Algorithm",
        "Floyd-Warshall Algorithm",
        "Kruskal's Algorithm"
      ],
      answer: "Bellman-Ford Algorithm",
      explanation: "Bellman-Ford runs in O(V · E) time and supports graphs with negative edge weights while detecting negative weight cycles. Dijkstra's algorithm fails with negative edge weights.",
      difficulty: "Medium"
    },
    {
      id: "DSA-204",
      category: "Data Structures & Algorithms",
      question: "What is the amortized time complexity of the Union and Find operations in a Disjoint Set Union (DSU) with Path Compression and Union by Rank?",
      options: [
        "O(α(n)) where α is the inverse Ackermann function (nearly constant)",
        "O(log n)",
        "O(1) strictly worst case",
        "O(n)"
      ],
      answer: "O(α(n)) where α is the inverse Ackermann function (nearly constant)",
      explanation: "Combining path compression with union-by-rank reduces the amortized per-operation time to O(α(n)), which is practically less than 5 for all realistic values of n.",
      difficulty: "Hard"
    },
    {
      id: "DSA-205",
      category: "Data Structures & Algorithms",
      question: "What is the primary difference between a B-Tree and a B+ Tree?",
      options: [
        "In a B+ Tree, data records/pointers are stored exclusively in the leaf nodes, which are linked together in a sequential chain.",
        "A B-Tree stores keys only at the root level.",
        "A B+ Tree has binary branching (at most 2 children per node).",
        "B-Trees cannot support range queries."
      ],
      answer: "In a B+ Tree, data records/pointers are stored exclusively in the leaf nodes, which are linked together in a sequential chain.",
      explanation: "In a B+ Tree, internal nodes store only routing keys, while all leaf nodes hold actual records or record pointers and are linked as a doubly-linked list for ultra-fast sequential range scans.",
      difficulty: "Hard"
    },
    {
      id: "DSA-206",
      category: "Data Structures & Algorithms",
      question: "Which data structure is ideal for implementing a Monotonic Stack to find the 'Next Greater Element' for all items in an array in linear time?",
      options: [
        "Stack maintaining elements in decreasing order",
        "Min-Heap / Priority Queue",
        "Segment Tree",
        "Circular Queue"
      ],
      answer: "Stack maintaining elements in decreasing order",
      explanation: "A monotonic decreasing stack maintains elements such that the top is always smaller. When a larger number is encountered, it acts as the Next Greater Element for all popped items.",
      difficulty: "Medium"
    },
    {
      id: "DSA-207",
      category: "Data Structures & Algorithms",
      question: "What is the worst-case time complexity of building a Binary Heap of n elements using Floyd's `buildHeap` algorithm?",
      options: [
        "O(n)",
        "O(n log n)",
        "O(log n)",
        "O(n²)"
      ],
      answer: "O(n)",
      explanation: "Floyd's bottom-up `buildHeap` algorithm sifts down nodes starting from index n/2. The summation \u2211 (h / 2^h) converges, bounding total comparisons to O(n) rather than O(n log n).",
      difficulty: "Medium"
    },
    {
      id: "DSA-208",
      category: "Data Structures & Algorithms",
      question: "Which graph traversal strategy is guaranteed to find the shortest path in an unweighted graph?",
      options: [
        "Breadth-First Search (BFS)",
        "Depth-First Search (DFS)",
        "Iterative Deepening DFS (IDDFS)",
        "Topological Sort"
      ],
      answer: "Breadth-First Search (BFS)",
      explanation: "BFS explores vertices level by level in order of their hop distance from the root, guaranteeing that the first time a target vertex is reached, the path is shortest in terms of edge count.",
      difficulty: "Easy"
    },
    {
      id: "DSA-209",
      category: "Data Structures & Algorithms",
      question: "What is the recurrence relation for the classic Karatsuba Integer Multiplication algorithm?",
      options: [
        "T(n) = 3T(n/2) + O(n), yielding O(n^{log₂ 3}) \u2248 O(n^{1.585})",
        "T(n) = 2T(n/2) + O(n), yielding O(n log n)",
        "T(n) = 4T(n/2) + O(n), yielding O(n²)",
        "T(n) = T(n-1) + O(1), yielding O(n)"
      ],
      answer: "T(n) = 3T(n/2) + O(n), yielding O(n^{log₂ 3}) \u2248 O(n^{1.585})",
      explanation: "Karatsuba reduces four sub-multiplications down to 3 multiplications of half-sized numbers using algebraic identity, resulting in O(n^1.585) complexity.",
      difficulty: "Hard"
    },
    {
      id: "DSA-210",
      category: "Data Structures & Algorithms",
      question: "In a Red-Black Tree, which property ensures that the longest path from root to any leaf is no more than twice the shortest path?",
      options: [
        "Every path from a node to any of its descendant NIL leaves contains the exact same number of black nodes, and no two consecutive red nodes are permitted.",
        "Every leaf node must be coloured red.",
        "The root must always be colored red.",
        "Subtrees must have identical node counts."
      ],
      answer: "Every path from a node to any of its descendant NIL leaves contains the exact same number of black nodes, and no two consecutive red nodes are permitted.",
      explanation: "Because black-height is invariant on all paths and red nodes cannot have red children, the longest possible path alternates Red-Black while shortest is all-Black, guaranteeing max height \u2264 2 log₂(n+1).",
      difficulty: "Hard"
    },
    {
      id: "DSA-211",
      category: "Data Structures & Algorithms",
      question: "What space complexity is required to perform an In-Order traversal of a Binary Tree without recursion or an auxiliary stack?",
      options: [
        "O(1) auxiliary space using Morris Traversal",
        "O(log n) space",
        "O(n) space",
        "Impossible without auxiliary memory"
      ],
      answer: "O(1) auxiliary space using Morris Traversal",
      explanation: "Morris Traversal uses threaded binary trees by creating temporary links from in-order predecessors back to current nodes, achieving O(n) time and O(1) auxiliary space.",
      difficulty: "Hard"
    },
    {
      id: "DSA-212",
      category: "Data Structures & Algorithms",
      question: "Which of the following problems can be solved in polynomial time (P) rather than being NP-Complete?",
      options: [
        "2-SAT (2-Conjunctive Normal Form Satisfiability)",
        "3-SAT",
        "Travelling Salesperson Problem (Decision version)",
        "Vertex Cover"
      ],
      answer: "2-SAT (2-Conjunctive Normal Form Satisfiability)",
      explanation: "2-SAT can be mapped to an implication graph and solved in linear time O(V + E) using Strongly Connected Components (SCCs) via Tarjan's or Kosaraju's algorithm.",
      difficulty: "Medium"
    },
    {
      id: "DSA-213",
      category: "Data Structures & Algorithms",
      question: "What is the optimal time complexity to query the sum of a range in an array of size n with point updates using a Fenwick Tree (Binary Indexed Tree)?",
      options: [
        "O(log n) update, O(log n) query",
        "O(1) update, O(n) query",
        "O(n) update, O(1) query",
        "O(log² n) update, O(1) query"
      ],
      answer: "O(log n) update, O(log n) query",
      explanation: "Fenwick Trees use bitwise least significant bits (LSB = x & -x) to store prefix sums in O(n) space, allowing both prefix sum queries and element point updates in O(log n) time.",
      difficulty: "Medium"
    },
    {
      id: "DSA-214",
      category: "Data Structures & Algorithms",
      question: "What is the time complexity of the Knuth-Morris-Pratt (KMP) string matching algorithm for text of length N and pattern of length M?",
      options: [
        "O(N + M)",
        "O(N \u00d7 M)",
        "O(N log M)",
        "O(M²)"
      ],
      answer: "O(N + M)",
      explanation: "KMP preprocesses the pattern into a Longest Proper Prefix which is also Suffix (LPS) array in O(M) time, and performs linear text scanning in O(N), avoiding backtracking.",
      difficulty: "Easy"
    },
    {
      id: "DSA-215",
      category: "Data Structures & Algorithms",
      question: "When collision resolution in a hash table uses Open Addressing with Linear Probing, what phenomenon degrades lookup efficiency as load factor rises?",
      options: [
        "Primary Clustering",
        "Secondary Clustering",
        "Memory Fragmentation",
        "Rehashing Inversion"
      ],
      answer: "Primary Clustering",
      explanation: "Linear probing suffers from primary clustering: occupied slots tend to form contiguous runs, increasing the average probe sequence length for unoccupied and occupied slots.",
      difficulty: "Medium"
    }
  ],

  "Python": [
    {
      id: "PY-301",
      category: "Python",
      question: "What will be the output of the following Python code?\n```python\ndef append_to(element, target_list=[]):\n    target_list.append(element)\n    return target_list\n\nprint(append_to(1))\nprint(append_to(2))\n```",
      options: [
        "`[1]` and `[1, 2]`",
        "`[1]` and `[2]`",
        "`[1, 2]` and `[1, 2]`",
        "`TypeError: Default arguments cannot be modified`"
      ],
      answer: "`[1]` and `[1, 2]`",
      explanation: "In Python, default parameter expressions are evaluated only once when the function is defined. The mutable default list `[]` is shared across all subsequent invocations.",
      difficulty: "Easy"
    },
    {
      id: "PY-302",
      category: "Python",
      question: "How does the Global Interpreter Lock (GIL) in CPython affect multithreaded CPU-bound tasks?",
      options: [
        "It prevents multiple native OS threads from executing Python bytecode simultaneously on multiple CPU cores.",
        "It blocks asynchronous I/O calls from running in the background.",
        "It automatically vectorizes loops into GPU SIMD instructions.",
        "It forces all Python variables to become immutable."
      ],
      answer: "It prevents multiple native OS threads from executing Python bytecode simultaneously on multiple CPU cores.",
      explanation: "The CPython GIL is a mutex that protects access to Python objects, preventing race conditions in memory reference counts. Consequently, only one thread executes Python bytecode at any given moment.",
      difficulty: "Medium"
    },
    {
      id: "PY-303",
      category: "Python",
      question: "What is the primary benefit of declaring `__slots__` in a Python class definition?",
      options: [
        "It prevents dynamic creation of the instance `__dict__`, reducing memory footprint per instance and speeding up attribute access.",
        "It makes the class automatically thread-safe.",
        "It converts the class into a Singleton pattern.",
        "It forces private encapsulation on all methods."
      ],
      answer: "It prevents dynamic creation of the instance `__dict__`, reducing memory footprint per instance and speeding up attribute access.",
      explanation: "By defining `__slots__ = ('x', 'y')`, Python allocates a fixed descriptor array for attributes rather than a dynamic dictionary `__dict__`, saving significant RAM across millions of instances.",
      difficulty: "Hard"
    },
    {
      id: "PY-304",
      category: "Python",
      question: "What is the output of `type(type)` in standard Python 3?",
      options: [
        "`<class 'type'>`",
        "`<class 'object'>`",
        "`<class 'metaclass'>`",
        "`TypeError: circular reference`"
      ],
      answer: "`<class 'type'>`",
      explanation: "`type` is its own metaclass in Python's object model. `type` is an instance of `type`, and `object` is also an instance of `type`, while `type` inherits from `object`.",
      difficulty: "Medium"
    },
    {
      id: "PY-305",
      category: "Python",
      question: "What does the `yield from <iterable>` syntax do in Python generators?",
      options: [
        "Delegates generation to a subgenerator, transparently handling values, exceptions, and bidirectional `send()` values.",
        "Terminates the generator immediately and returns the iterable as a list.",
        "Creates a separate multiprocessing subprocess for the generator.",
        "Yields only the first element of the iterable."
      ],
      answer: "Delegates generation to a subgenerator, transparently handling values, exceptions, and bidirectional `send()` values.",
      explanation: "`yield from` establishes a bidirectional communication channel between the caller and the subgenerator, passing `.send()`, `.throw()`, and `.close()` directly.",
      difficulty: "Hard"
    },
    {
      id: "PY-306",
      category: "Python",
      question: "Which Method Resolution Order (MRO) algorithm does Python 3 utilize for multiple inheritance?",
      options: [
        "C3 Superconcurrency Linearization",
        "Depth-First Search (DFS) with left-to-right precedence",
        "Breadth-First Search (BFS)",
        "Dijkstra Linearization"
      ],
      answer: "C3 Superconcurrency Linearization",
      explanation: "Python 3 uses the C3 Linearization algorithm to determine method resolution order, ensuring monotonicity and respecting local precedence ordering in class hierarchies.",
      difficulty: "Hard"
    },
    {
      id: "PY-307",
      category: "Python",
      question: "What does `functools.wraps` do when writing custom Python decorators?",
      options: [
        "Copies metadata such as `__name__`, `__doc__`, and `__annotations__` from the decorated original function to the wrapper function.",
        "Wraps the function call in a `try...except` block automatically.",
        "Compiles the function into native C bytecode via Cython.",
        "Memosizes all function return values."
      ],
      answer: "Copies metadata such as `__name__`, `__doc__`, and `__annotations__` from the decorated original function to the wrapper function.",
      explanation: "Without `@wraps(func)`, the wrapper function overwrites the identity of the target function with generic wrapper metadata, breaking introspection and docstring tools.",
      difficulty: "Easy"
    },
    {
      id: "PY-308",
      category: "Python",
      question: "What is the difference between `is` and `==` in Python?",
      options: [
        "`is` checks for object identity (same memory address via `id()`), while `==` checks for value equality.",
        "`is` compares values while `==` compares data types.",
        "`is` is only valid for string comparisons.",
        "`==` checks memory addresses and `is` invokes `__eq__`."
      ],
      answer: "`is` checks for object identity (same memory address via `id()`), while `==` checks for value equality.",
      explanation: "`is` evaluates whether two references point to the exact same object in memory (`id(a) == id(b)`), whereas `==` invokes `a.__eq__(b)` to evaluate value equivalency.",
      difficulty: "Easy"
    },
    {
      id: "PY-309",
      category: "Python",
      question: "What happens when you create a slice with `a = [1, 2, 3, 4, 5]; b = a[1:4]`?",
      options: [
        "A new shallow copy list `[2, 3, 4]` is created in memory.",
        "A view into the original array is returned without memory allocation.",
        "An iterator generator is returned.",
        "The elements are moved from `a` into `b`."
      ],
      answer: "A new shallow copy list `[2, 3, 4]` is created in memory.",
      explanation: "List slicing in standard Python creates a new independent shallow copy list. (Unlike NumPy arrays which return memory views).",
      difficulty: "Easy"
    },
    {
      id: "PY-310",
      category: "Python",
      question: "How does Python's Garbage Collector handle cyclic references between objects?",
      options: [
        "Through a generational cyclic garbage collector that tracks container objects and identifies unreachable reference loops.",
        "Cyclic references cause permanent memory leaks that can never be freed.",
        "By enforcing strict reference counting and immediately crashing.",
        "By converting cyclic graphs into linear linked lists automatically."
      ],
      answer: "Through a generational cyclic garbage collector that tracks container objects and identifies unreachable reference loops.",
      explanation: "While reference counting handles 99% of deallocations instantly, CPython's `gc` module periodically runs a tri-color marking algorithm across 3 generations to detect isolated cyclical subgraphs.",
      difficulty: "Hard"
    },
    {
      id: "PY-311",
      category: "Python",
      question: "What is the output of `bool(all([]))` and `bool(any([]))` in Python?",
      options: [
        "`True` and `False`",
        "`False` and `True`",
        "`True` and `True`",
        "`False` and `False`"
      ],
      answer: "`True` and `False`",
      explanation: "`all([])` evaluates to `True` (vacuous truth: no element in the empty set is false). `any([])` evaluates to `False` (no element in the empty set is true).",
      difficulty: "Medium"
    },
    {
      id: "PY-312",
      category: "Python",
      question: "What is the return type and functionality of the `@classmethod` decorator compared to `@staticmethod`?",
      options: [
        "`@classmethod` passes the class object `cls` as its first parameter; `@staticmethod` receives no implicit first argument.",
        "`@classmethod` can only be invoked from instances, not classes.",
        "`@staticmethod` can mutate class-level variables directly.",
        "`@classmethod` is executed at import time only."
      ],
      answer: "`@classmethod` passes the class object `cls` as its first parameter; `@staticmethod` receives no implicit first argument.",
      explanation: "`@classmethod` methods receive the class (`cls`) allowing alternate constructors, while `@staticmethod` behaves like a plain function placed inside the class namespace.",
      difficulty: "Easy"
    },
    {
      id: "PY-313",
      category: "Python",
      question: "What does the `asyncio.gather(*tasks)` function do in Python?",
      options: [
        "Runs multiple awaitables concurrently in the event loop and returns an aggregated list of their results in the order passed.",
        "Executes tasks sequentially in blocking order.",
        "Spawns an OS subprocess for every awaitable.",
        "Cancels all other tasks as soon as the first task finishes."
      ],
      answer: "Runs multiple awaitables concurrently in the event loop and returns an aggregated list of their results in the order passed.",
      explanation: "`asyncio.gather()` registers multiple coroutines onto the active event loop, schedules them concurrently, and gathers their output into a list preserving request order.",
      difficulty: "Medium"
    },
    {
      id: "PY-314",
      category: "Python",
      question: "In Python context managers, what must `__exit__(self, exc_type, exc_val, exc_tb)` return to suppress an exception raised inside the `with` block?",
      options: [
        "A truthy value (such as `True`)",
        "`None`",
        "`False`",
        "`raise exc_val`"
      ],
      answer: "A truthy value (such as `True`)",
      explanation: "If `__exit__()` returns `True`, Python suppresses the active exception and continues execution normally outside the `with` block. Returning `False` or `None` re-raises the exception.",
      difficulty: "Hard"
    },
    {
      id: "PY-315",
      category: "Python",
      question: "Which built-in module provides high-performance container datatypes like `deque`, `Counter`, and `defaultdict`?",
      options: [
        "`collections`",
        "`itertools`",
        "`datatypes`",
        "`sys.containers`"
      ],
      answer: "`collections`",
      explanation: "The `collections` module provides specialized container datatypes implementing high performance O(1) double-ended queues (`deque`), frequency tables (`Counter`), and initialized key lookups (`defaultdict`).",
      difficulty: "Easy"
    }
  ],

  "Java": [
    {
      id: "JV-401",
      category: "Java",
      question: "In the Java Memory Model (JMM), what does the `volatile` keyword guarantee for a variable?",
      options: [
        "Visibility of writes across threads (reads/writes bypass CPU L1/L2 caches directly to main memory) and prevents instruction reordering.",
        "Atomic increments (`count++`) across concurrent threads.",
        "Exclusive mutex locking on the object monitor.",
        "Immediate heap garbage collection when assigned null."
      ],
      answer: "Visibility of writes across threads (reads/writes bypass CPU L1/L2 caches directly to main memory) and prevents instruction reordering.",
      explanation: "`volatile` establishes a happens-before relationship: changes made by one thread are immediately visible to all other threads, and prevents compiler instruction reordering. It does NOT guarantee compound atomicity (like i++).",
      difficulty: "Hard"
    },
    {
      id: "JV-402",
      category: "Java",
      question: "Why does `String` in Java use a String Constant Pool and immutable character storage?",
      options: [
        "For security, thread safety, hashcode caching, and memory optimization via interning.",
        "Because Java does not support heap memory allocation for strings.",
        "To allow strings to be cast to primitive integers automatically.",
        "To enforce UTF-32 encoding strictly."
      ],
      answer: "For security, thread safety, hashcode caching, and memory optimization via interning.",
      explanation: "Immutability guarantees that once created, string values cannot be corrupted by concurrent threads or malicious classloaders, allows caching of `.hashCode()`, and enables literal interning in the String Pool.",
      difficulty: "Medium"
    },
    {
      id: "JV-403",
      category: "Java",
      question: "In Java Generics, what does the PECS rule stand for?",
      options: [
        "Producer Extends, Consumer Super (use `? extends T` when reading, `? super T` when writing)",
        "Parameter Encapsulation, Class Specialization",
        "Public Exports, Concrete Subclasses",
        "Polymorphism Extends, Casting Super"
      ],
      answer: "Producer Extends, Consumer Super (use `? extends T` when reading, `? super T` when writing)",
      explanation: "PECS is Joshua Bloch's guideline for wildcards: if your parameterized type produces items to read, use `<? extends T>`. If it consumes items to write into, use `<? super T>`.",
      difficulty: "Hard"
    },
    {
      id: "JV-404",
      category: "Java",
      question: "What is the time complexity of `HashMap.get(key)` in Java 8+ when multiple keys collide into the same bucket exceeding the `TREEIFY_THRESHOLD` (8 items)?",
      options: [
        "O(log n) because the bucket converts from a Linked List to a Red-Black Tree (TreeNode)",
        "O(n) linear scan through the collision list",
        "O(1) strict constant lookup",
        "O(n²)"
      ],
      answer: "O(log n) because the bucket converts from a Linked List to a Red-Black Tree (TreeNode)",
      explanation: "In Java 8, when a bucket has more than 8 elements and capacity \u2265 64, the linked list is treeified into a Red-Black Tree, reducing worst-case collision lookup from O(n) to O(log n).",
      difficulty: "Medium"
    },
    {
      id: "JV-405",
      category: "Java",
      question: "What is the difference between `CompletableFuture.thenApply()` and `CompletableFuture.thenCompose()`?",
      options: [
        "`thenApply()` transforms the value with `Function<T, U>`, whereas `thenCompose()` flattens nested futures using `Function<T, CompletableFuture<U>>` (like flatMap).",
        "`thenApply()` is asynchronous whereas `thenCompose()` is strictly blocking.",
        "`thenCompose()` only handles exceptions.",
        "They are identical aliases."
      ],
      answer: "`thenApply()` transforms the value with `Function<T, U>`, whereas `thenCompose()` flattens nested futures using `Function<T, CompletableFuture<U>>` (like flatMap).",
      explanation: "`thenApply` is akin to `map` in functional programming (returns `CompletableFuture<U>`), while `thenCompose` is akin to `flatMap` preventing nested `CompletableFuture<CompletableFuture<U>>`.",
      difficulty: "Hard"
    },
    {
      id: "JV-406",
      category: "Java",
      question: "Which Garbage Collector in modern HotSpot JVM is designed for ultra-low latency with sub-millisecond max pause times?",
      options: [
        "ZGC (Z Garbage Collector)",
        "Serial GC",
        "Parallel GC (Throughput Collector)",
        "Mark-Sweep-Compact GC"
      ],
      answer: "ZGC (Z Garbage Collector)",
      explanation: "ZGC performs all heavy GC work (marking, relocation, reference processing) concurrently with application threads using colored pointers and load barriers, targeting pauses < 1ms on terabyte heaps.",
      difficulty: "Medium"
    },
    {
      id: "JV-407",
      category: "Java",
      question: "What is the contract between `.equals()` and `.hashCode()` in Java?",
      options: [
        "If two objects are equal according to `equals()`, they MUST produce the same `hashCode()`. If hashCodes are equal, objects are NOT necessarily equal.",
        "If hashCodes are equal, objects must be equal.",
        "`hashCode()` must return a distinct value for every unique instance.",
        "Overriding `equals()` does not require overriding `hashCode()`."
      ],
      answer: "If two objects are equal according to `equals()`, they MUST produce the same `hashCode()`. If hashCodes are equal, objects are NOT necessarily equal.",
      explanation: "The Java specification states that if `a.equals(b)` is true, then `a.hashCode() == b.hashCode()` must be true. Violating this breaks hash-based collections like `HashSet` and `HashMap`.",
      difficulty: "Easy"
    },
    {
      id: "JV-408",
      category: "Java",
      question: "What are Virtual Threads (Project Loom) introduced in Java 21?",
      options: [
        "Lightweight user-mode threads managed by the JVM rather than 1:1 mapped OS kernel threads, enabling millions of concurrent threads.",
        "A virtualization hypervisor for executing multiple JVM instances.",
        "Emulated threads running on GPU shaders.",
        "A compiler optimization that removes thread synchronization locks."
      ],
      answer: "Lightweight user-mode threads managed by the JVM rather than 1:1 mapped OS kernel threads, enabling millions of concurrent threads.",
      explanation: "Virtual threads decouple Java threads from OS threads: the JVM schedules millions of lightweight virtual threads onto a small pool of carrier OS threads, revolutionizing high-throughput server I/O.",
      difficulty: "Medium"
    },
    {
      id: "JV-409",
      category: "Java",
      question: "What happens when you invoke `Thread.start()` twice on the exact same `Thread` instance?",
      options: [
        "`IllegalThreadStateException` is thrown at runtime.",
        "The thread executes a second iteration in parallel.",
        "The thread resets its call stack and restarts.",
        "The JVM ignores the second invocation silently."
      ],
      answer: "`IllegalThreadStateException` is thrown at runtime.",
      explanation: "A Java thread cannot be restarted once it has started running or terminated. Doing so throws an unchecked `IllegalThreadStateException`.",
      difficulty: "Easy"
    },
    {
      id: "JV-409b",
      category: "Java",
      question: "Which feature of Java `sealed` classes (Java 17+) restricts inheritance?",
      options: [
        "The `permits` clause explicitly lists the permitted subclasses, creating a closed polymorphic hierarchy.",
        "Subclasses cannot define private variables.",
        "Sealed classes cannot implement interfaces.",
        "All methods inside sealed classes become `final` automatically."
      ],
      answer: "The `permits` clause explicitly lists the permitted subclasses, creating a closed polymorphic hierarchy.",
      explanation: "`sealed class Shape permits Circle, Square` ensures only the specified subclasses can extend `Shape`, enabling pattern matching exhaustiveness checks in switch statements.",
      difficulty: "Medium"
    },
    {
      id: "JV-410",
      category: "Java",
      question: "What is the difference between `fail-fast` and `fail-safe` iterators in Java Collections?",
      options: [
        "`fail-fast` throws `ConcurrentModificationException` if collection is structurally modified during iteration; `fail-safe` operates on a clone/snapshot.",
        "`fail-fast` iterators never throw exceptions.",
        "`fail-safe` iterators lock the entire operating system thread.",
        "`fail-fast` is used only in multi-threaded database connections."
      ],
      answer: "`fail-fast` throws `ConcurrentModificationException` if collection is structurally modified during iteration; `fail-safe` operates on a clone/snapshot.",
      explanation: "Fail-fast iterators (e.g. ArrayList) inspect `modCount` and throw immediately if concurrent change is detected. Fail-safe iterators (e.g. CopyOnWriteArrayList) work on array snapshots.",
      difficulty: "Medium"
    },
    {
      id: "JV-411",
      category: "Java",
      question: "What is the purpose of the `try-with-resources` statement introduced in Java 7?",
      options: [
        "Automatically closes any resource that implements `java.lang.AutoCloseable` at the end of the block, preventing resource leaks.",
        "Catches OutOfMemoryError and reallocates heap memory.",
        "Enables try blocks without catch or finally blocks only for file streams.",
        "Retries failed network operations 3 times automatically."
      ],
      answer: "Automatically closes any resource that implements `java.lang.AutoCloseable` at the end of the block, preventing resource leaks.",
      explanation: "`try (BufferedReader br = new BufferedReader(...))` ensures `.close()` is guaranteed to run even if exceptions are thrown, suppressing secondary closing errors cleanly.",
      difficulty: "Easy"
    },
    {
      id: "JV-412",
      category: "Java",
      question: "What is the output of `System.out.println(1.0 / 0.0)` in Java?",
      options: [
        "`Infinity` (Floating point division follows IEEE 754 standards)",
        "`ArithmeticException: / by zero`",
        "`NaN`",
        "Compilation Error"
      ],
      answer: "`Infinity` (Floating point division follows IEEE 754 standards)",
      explanation: "Integer division `1 / 0` throws `ArithmeticException`, but floating-point division `1.0 / 0.0` follows IEEE 754 and evaluates to positive infinity `Double.POSITIVE_INFINITY`.",
      difficulty: "Medium"
    },
    {
      id: "JV-413",
      category: "Java",
      question: "In Java Reflection, what is the role of `setAccessible(true)` on a private field?",
      options: [
        "Suppresses Java language access control checks, permitting read/write access to private members.",
        "Makes the field public globally across all classes permanently.",
        "Instantiates the class constructor dynamically.",
        "Exports the class to all Java 9 modular modules."
      ],
      answer: "Suppresses Java language access control checks, permitting read/write access to private members.",
      explanation: "`AccessibleObject.setAccessible(true)` bypasses compiler and runtime access modifiers, enabling frameworks like Spring and Hibernate to inject private fields.",
      difficulty: "Medium"
    },
    {
      id: "JV-414",
      category: "Java",
      question: "Which of the following interfaces is a Functional Interface suitable for `@FunctionalInterface` and lambda expressions?",
      options: [
        "An interface with exactly one abstract method (Single Abstract Method / SAM)",
        "An interface with only static methods",
        "An interface containing at least 3 default methods",
        "Any interface extending `Serializable`"
      ],
      answer: "An interface with exactly one abstract method (Single Abstract Method / SAM)",
      explanation: "A functional interface is defined as having exactly one abstract method. It may contain any number of default or static methods.",
      difficulty: "Easy"
    }
  ],

  "DBMS": [
    {
      id: "DB-501",
      category: "DBMS",
      question: "What does the 'I' in the ACID transaction guarantees stand for, and what does it prevent?",
      options: [
        "Isolation: ensures intermediate transaction states are invisible to concurrent transactions, preventing dirty reads and non-repeatable reads.",
        "Integrity: ensures foreign key constraints are not violated.",
        "Idempotence: guarantees that re-executing a query produces the exact same result.",
        "Indexing: ensures queries utilize B-Tree traversal."
      ],
      answer: "Isolation: ensures intermediate transaction states are invisible to concurrent transactions, preventing dirty reads and non-repeatable reads.",
      explanation: "Isolation guarantees that concurrent execution of transactions leaves the database in the same state that would have been obtained if the transactions were executed sequentially.",
      difficulty: "Easy"
    },
    {
      id: "DB-502",
      category: "DBMS",
      question: "In SQL transaction isolation levels, what is a 'Phantom Read'?",
      options: [
        "When a transaction re-runs a range query with a `WHERE` filter and finds new rows committed by another concurrent transaction.",
        "When a transaction reads uncommitted changes that are subsequently rolled back.",
        "When a transaction reads a row twice and finds column values modified by another transaction.",
        "When the database loses write-ahead log entries during a power failure."
      ],
      answer: "When a transaction re-runs a range query with a `WHERE` filter and finds new rows committed by another concurrent transaction.",
      explanation: "Phantom reads occur when transaction T1 queries a set of rows satisfying a condition, and transaction T2 inserts/deletes rows satisfying that condition and commits, causing T1 to see different row counts on re-query.",
      difficulty: "Medium"
    },
    {
      id: "DB-503",
      category: "DBMS",
      question: "Which Normal Form strictly eliminates all Transitive Functional Dependencies (X \u2192 Y, Y \u2192 Z where Z is non-prime)?",
      options: [
        "Third Normal Form (3NF)",
        "First Normal Form (1NF)",
        "Second Normal Form (2NF)",
        "Boyce-Codd Normal Form (BCNF)"
      ],
      answer: "Third Normal Form (3NF)",
      explanation: "A relation is in 3NF if it is in 2NF and every non-prime attribute is non-transitively dependent on every candidate key (no non-prime attribute determines another non-prime attribute).",
      difficulty: "Easy"
    },
    {
      id: "DB-504",
      category: "DBMS",
      question: "What is the key advantage of a Clustered Index over a Non-Clustered Index in relational databases like SQL Server or MySQL InnoDB?",
      options: [
        "The physical row data on disk is stored in the exact sorted order of the clustered index leaf pages, avoiding secondary lookups for full row retrieval.",
        "A table can have up to 256 clustered indexes simultaneously.",
        "Clustered indexes do not consume disk space.",
        "Clustered indexes are stored exclusively in RAM."
      ],
      answer: "The physical row data on disk is stored in the exact sorted order of the clustered index leaf pages, avoiding secondary lookups for full row retrieval.",
      explanation: "A clustered index determines the physical storage order of rows in the table. Because data rows are stored directly in leaf nodes, only one clustered index can exist per table.",
      difficulty: "Medium"
    },
    {
      id: "DB-505",
      category: "DBMS",
      question: "What is the Write-Ahead Logging (WAL) protocol used by database recovery engines?",
      options: [
        "Log records describing changes must be flushed to non-volatile disk BEFORE the corresponding dirty database buffer pages are written to disk.",
        "Transactions are written to backup tape drives every hour.",
        "All queries must be pre-compiled into binary bytecode before execution.",
        "Indexes are written to disk ahead of table definitions."
      ],
      answer: "Log records describing changes must be flushed to non-volatile disk BEFORE the corresponding dirty database buffer pages are written to disk.",
      explanation: "WAL guarantees Atomicity and Durability: by ensuring redo/undo log entries reach persistent storage before data pages, the database can safely recover from sudden crashes via ARIES protocol.",
      difficulty: "Hard"
    },
    {
      id: "DB-506",
      category: "DBMS",
      question: "What is the difference between `DELETE`, `TRUNCATE`, and `DROP` in SQL?",
      options: [
        "`DELETE` is DML (row-by-row, logged, supports WHERE); `TRUNCATE` is DDL (fast page deallocation, resets identity); `DROP` removes table definition completely.",
        "`TRUNCATE` can be filtered with a `WHERE` clause.",
        "`DELETE` cannot be rolled back inside a transaction.",
        "`DROP` only empties the rows leaving table schema intact."
      ],
      answer: "`DELETE` is DML (row-by-row, logged, supports WHERE); `TRUNCATE` is DDL (fast page deallocation, resets identity); `DROP` removes table definition completely.",
      explanation: "`DELETE` logs individual row deletions and triggers triggers; `TRUNCATE` deallocates data pages quickly as DDL; `DROP` destroys both data and schema from the database catalog.",
      difficulty: "Easy"
    },
    {
      id: "DB-507",
      category: "DBMS",
      question: "In relational algebra, what does the natural join (\u2a1d) operation perform?",
      options: [
        "An equijoin on all attributes having identical column names in both relations, projecting away duplicate join columns.",
        "A Cartesian cross product without any filtering.",
        "A union of all rows matching primary keys.",
        "An outer join returning nulls for missing values."
      ],
      answer: "An equijoin on all attributes having identical column names in both relations, projecting away duplicate join columns.",
      explanation: "Natural join matches tuples having identical values across all identically named attributes in both relations, removing redundant repeated columns in the final relation.",
      difficulty: "Medium"
    },
    {
      id: "DB-508",
      category: "DBMS",
      question: "What is the Two-Phase Locking (2PL) protocol, and what does it guarantee?",
      options: [
        "Transactions acquire locks in a growing phase and release locks in a shrinking phase, guaranteeing Conflict Serializability.",
        "Transactions replicate data to two secondary servers before committing.",
        "Transactions verify user credentials in phase 1 and query syntax in phase 2.",
        "Transactions lock the entire database table for both reads and writes."
      ],
      answer: "Transactions acquire locks in a growing phase and release locks in a shrinking phase, guaranteeing Conflict Serializability.",
      explanation: "2PL enforces that once a transaction releases any lock, it cannot acquire new locks. This growing/shrinking locking phase guarantees serializable transaction schedules.",
      difficulty: "Hard"
    },
    {
      id: "DB-509",
      category: "DBMS",
      question: "What does the CAP Theorem state for distributed data stores?",
      options: [
        "A distributed system can guarantee at most two out of three properties: Consistency, Availability, and Partition Tolerance.",
        "Computers, Algorithms, and Protocols must scale linearly.",
        "Concurrency, Atomicity, and Performance cannot be achieved together.",
        "Centralized databases are always more available than partitioned clusters."
      ],
      answer: "A distributed system can guarantee at most two out of three properties: Consistency, Availability, and Partition Tolerance.",
      explanation: "Eric Brewer's CAP Theorem proves that in the presence of a network partition (P), a distributed system must choose between returning consistent latest data (C) or remaining available (A).",
      difficulty: "Medium"
    },
    {
      id: "DB-510",
      category: "DBMS",
      question: "Which SQL clause is used in window functions to define the grouping of rows over which calculations (e.g. `ROW_NUMBER()`, `RANK()`) are performed?",
      options: [
        "`OVER (PARTITION BY ...)`",
        "`GROUP BY ... HAVING`",
        "`ORDER BY ... CASCADE`",
        "`SPLIT BY ...`"
      ],
      answer: "`OVER (PARTITION BY ...)`",
      explanation: "Window functions use `OVER (PARTITION BY column ORDER BY ...)` to perform aggregations and rankings across subsets of rows without collapsing rows like `GROUP BY` does.",
      difficulty: "Easy"
    },
    {
      id: "DB-511",
      category: "DBMS",
      question: "What is a covering index in SQL query optimization?",
      options: [
        "An index that includes all columns referenced in the `SELECT`, `WHERE`, `JOIN`, and `ORDER BY` clauses of a query, eliminating table data lookups.",
        "An index that covers all tables across the entire database.",
        "An index created automatically on foreign keys.",
        "An encrypted index used for security compliance."
      ],
      answer: "An index that includes all columns referenced in the `SELECT`, `WHERE`, `JOIN`, and `ORDER BY` clauses of a query, eliminating table data lookups.",
      explanation: "When an index contains every column needed by a query (using indexed or `INCLUDE` columns), the query engine satisfies the request entirely from the index leaf pages without fetching the base table row.",
      difficulty: "Medium"
    },
    {
      id: "DB-512",
      category: "DBMS",
      question: "In database concurrency control, how does Multi-Version Concurrency Control (MVCC) eliminate read-write blocking?",
      options: [
        "Readers do not block writers and writers do not block readers because readers access snapshot versions of data corresponding to their transaction timestamp.",
        "By enforcing global exclusive table locks on every query.",
        "By serializing all queries into a single hardware thread.",
        "By converting relational tables into immutable JSON files."
      ],
      answer: "Readers do not block writers and writers do not block readers because readers access snapshot versions of data corresponding to their transaction timestamp.",
      explanation: "MVCC maintains multiple physical versions of rows (e.g. Postgres undo tuples / MySQL InnoDB undo logs). Transactions read historical snapshots consistent with their start time.",
      difficulty: "Hard"
    },
    {
      id: "DB-513",
      category: "DBMS",
      question: "What is the difference between `UNION` and `UNION ALL` in SQL?",
      options: [
        "`UNION` runs an implicit deduplication sort on the result set, whereas `UNION ALL` concatenates all rows directly including duplicates.",
        "`UNION ALL` only works on numeric data types.",
        "`UNION` is faster because it discards duplicate rows without processing.",
        "`UNION ALL` requires tables to have different schemas."
      ],
      answer: "`UNION` runs an implicit deduplication sort on the result set, whereas `UNION ALL` concatenates all rows directly including duplicates.",
      explanation: "`UNION` removes duplicate rows by sorting and filtering, incurring performance overhead. `UNION ALL` retains all rows from both queries without sorting.",
      difficulty: "Easy"
    },
    {
      id: "DB-514",
      category: "DBMS",
      question: "Which database anomaly occurs when two transactions read the same initial state, compute updates based on it, and write back, causing one update to overwrite the other?",
      options: [
        "Lost Update Anomaly",
        "Dirty Read Anomaly",
        "Unrepeatable Read Anomaly",
        "Deadlock Inversion"
      ],
      answer: "Lost Update Anomaly",
      explanation: "Lost update occurs when transaction T1 and T2 read the same row, then T1 updates and commits, and T2 subsequently updates and commits, silently erasing T1's modification.",
      difficulty: "Medium"
    },
    {
      id: "DB-515",
      category: "DBMS",
      question: "In ER modeling, what is an 'identifying relationship' for a weak entity set?",
      options: [
        "A relationship where the weak entity's primary key contains the primary key of its parent entity owner.",
        "A relationship that has no foreign keys.",
        "A recursive self-join on an entity table.",
        "A relationship with many-to-many cardinality."
      ],
      answer: "A relationship where the weak entity's primary key contains the primary key of its parent entity owner.",
      explanation: "Weak entities cannot be identified solely by their own attributes (discriminator); they depend on an identifying relationship with an owner entity to form their composite primary key.",
      difficulty: "Medium"
    }
  ],

  "Computer Networks": [
    {
      id: "CN-601",
      category: "Computer Networks",
      question: "What is the three-way handshake sequence used by TCP to establish a reliable connection?",
      options: [
        "SYN \u2192 SYN-ACK \u2192 ACK",
        "ACK \u2192 SYN \u2192 SYN-ACK",
        "SYN \u2192 ACK \u2192 FIN",
        "HELLO \u2192 CONNECT \u2192 READY"
      ],
      answer: "SYN \u2192 SYN-ACK \u2192 ACK",
      explanation: "TCP connection setup starts with client sending SYN (synchronize sequence number), server responding with SYN-ACK, and client acknowledging with ACK.",
      difficulty: "Easy"
    },
    {
      id: "CN-602",
      category: "Computer Networks",
      question: "What is the primary role of the Address Resolution Protocol (ARP)?",
      options: [
        "Resolves an IP network layer address to a physical MAC link layer address on a local area network (LAN).",
        "Resolves domain names (e.g. example.com) to IP addresses.",
        "Assigns dynamic IP addresses to new clients via DHCP.",
        "Translates private IPv4 addresses to public IPv4 addresses."
      ],
      answer: "Resolves an IP network layer address to a physical MAC link layer address on a local area network (LAN).",
      explanation: "ARP broadcasts a query asking 'Who has this IP?', allowing the target device on the local Ethernet segment to respond with its 48-bit hardware MAC address.",
      difficulty: "Easy"
    },
    {
      id: "CN-603",
      category: "Computer Networks",
      question: "How does the QUIC protocol (underlying HTTP/3) overcome TCP Head-of-Line (HoL) blocking?",
      options: [
        "It runs over UDP and handles individual independent data streams natively at the transport layer.",
        "It uses multiple physical Ethernet network cables simultaneously.",
        "It increases TCP window size to infinity.",
        "It converts packets into uncompressed JSON payloads."
      ],
      answer: "It runs over UDP and handles individual independent data streams natively at the transport layer.",
      explanation: "In HTTP/2 over TCP, a single dropped packet stalls all streams in the TCP buffer. QUIC operates on UDP with independent stream framing, so packet loss only delays the affected stream.",
      difficulty: "Hard"
    },
    {
      id: "CN-604",
      category: "Computer Networks",
      question: "In IPv4 subnetting, how many usable host addresses are available in a `/26` subnet (subnet mask `255.255.255.192`)?",
      options: [
        "62 usable hosts (2⁶ - 2 = 64 - 2)",
        "64 usable hosts",
        "128 usable hosts",
        "30 usable hosts"
      ],
      answer: "62 usable hosts (2⁶ - 2 = 64 - 2)",
      explanation: "A `/26` leaves 32 - 26 = 6 host bits. Total IP addresses = 2⁶ = 64. Subtracting the network ID and the broadcast address leaves 62 usable host addresses.",
      difficulty: "Medium"
    },
    {
      id: "CN-605",
      category: "Computer Networks",
      question: "Which congestion control phase in TCP doubles the congestion window (CWND) every Round Trip Time (RTT) until reaching `ssthresh`?",
      options: [
        "Slow Start",
        "Congestion Avoidance",
        "Fast Recovery",
        "Tail Drop"
      ],
      answer: "Slow Start",
      explanation: "During Slow Start, CWND starts at 1-10 MSS and increases exponentially by 1 MSS for every received ACK (doubling every RTT) until the slow-start threshold (`ssthresh`) is reached.",
      difficulty: "Medium"
    },
    {
      id: "CN-606",
      category: "Computer Networks",
      question: "What is the function of the BGP (Border Gateway Protocol) on the Internet?",
      options: [
        "It is an exterior gateway path-vector routing protocol used to exchange routing and reachability information among Autonomous Systems (AS).",
        "It assigns internal IP addresses inside private enterprise subnets.",
        "It manages web server load balancing via DNS round-robin.",
        "It encrypts peer-to-peer torrent connections."
      ],
      answer: "It is an exterior gateway path-vector routing protocol used to exchange routing and reachability information among Autonomous Systems (AS).",
      explanation: "BGP is the core routing protocol of the global Internet, computing loop-free inter-domain paths between internet service providers and autonomous networks based on AS paths and routing policies.",
      difficulty: "Hard"
    },
    {
      id: "CN-607",
      category: "Computer Networks",
      question: "Which layer of the OSI model is responsible for end-to-end flow control, error checking, and port-based process multiplexing?",
      options: [
        "Transport Layer (Layer 4)",
        "Network Layer (Layer 3)",
        "Data Link Layer (Layer 2)",
        "Session Layer (Layer 5)"
      ],
      answer: "Transport Layer (Layer 4)",
      explanation: "Layer 4 (Transport layer, protocols like TCP/UDP) provides logical host-to-host process communication using port numbers, segmentation, flow control, and error detection.",
      difficulty: "Easy"
    },
    {
      id: "CN-608",
      category: "Computer Networks",
      question: "What does the Time-to-Live (TTL) / Hop Limit field in an IP packet header prevent?",
      options: [
        "Packets from circulating indefinitely in routing loops.",
        "Packet data from expiring after 24 hours.",
        "Hackers from reading unencrypted payload bytes.",
        "Bandwidth congestion on Wi-Fi access points."
      ],
      answer: "Packets from circulating indefinitely in routing loops.",
      explanation: "Every router that forwards an IP packet decrements its TTL field by 1. When TTL reaches 0, the router drops the packet and transmits an ICMP Time Exceeded message back to the sender.",
      difficulty: "Easy"
    },
    {
      id: "CN-609",
      category: "Computer Networks",
      question: "What is the primary cryptographic handshake purpose of TLS 1.3 Diffie-Hellman Key Exchange (ECDHE)?",
      options: [
        "To provide Perfect Forward Secrecy (PFS) by generating ephemeral session keys that cannot be compromised even if the server private key is leaked later.",
        "To authenticate client passwords in cleartext.",
        "To compress HTTP request headers with HPACK.",
        "To convert IPv4 packets into IPv6 format."
      ],
      answer: "To provide Perfect Forward Secrecy (PFS) by generating ephemeral session keys that cannot be compromised even if the server private key is leaked later.",
      explanation: "Ephemeral Diffie-Hellman (ECDHE) ensures that each session key is uniquely generated per connection. Past recorded sessions cannot be retroactively decrypted even if server long-term keys are stolen.",
      difficulty: "Hard"
    },
    {
      id: "CN-610",
      category: "Computer Networks",
      question: "In CSMA/CD (Carrier Sense Multiple Access with Collision Detection), what algorithm is executed when a collision is detected on an Ethernet bus?",
      options: [
        "Binary Exponential Backoff Algorithm",
        "Dijkstra Shortest Path Algorithm",
        "Sliding Window Algorithm",
        "Token Ring Rotation"
      ],
      answer: "Binary Exponential Backoff Algorithm",
      explanation: "Upon detecting collision, transmitting stations send a jam signal and choose a random backoff time from interval [0, 2^k - 1] slots before retransmitting, doubling range on successive collisions.",
      difficulty: "Medium"
    },
    {
      id: "CN-611",
      category: "Computer Networks",
      question: "Which DNS record type specifies the mail exchange server responsible for accepting email messages on behalf of a domain name?",
      options: [
        "MX Record",
        "A Record",
        "CNAME Record",
        "PTR Record"
      ],
      answer: "MX Record",
      explanation: "MX (Mail Exchange) records specify the mail servers designated to handle incoming SMTP email for a domain, along with priority preference numbers.",
      difficulty: "Easy"
    },
    {
      id: "CN-612",
      category: "Computer Networks",
      question: "What is the Maximum Transmission Unit (MTU) standard size for standard Ethernet frames?",
      options: [
        "1500 bytes",
        "64 bytes",
        "4096 bytes",
        "65535 bytes"
      ],
      answer: "1500 bytes",
      explanation: "Standard Ethernet frames carry an MTU of 1500 bytes of IP payload (plus 14 bytes header + 4 bytes FCS). Jumbo frames expand this up to 9000 bytes.",
      difficulty: "Easy"
    },
    {
      id: "CN-613",
      category: "Computer Networks",
      question: "What is the difference between Link-State (OSPF) and Distance-Vector (RIP) routing protocols?",
      options: [
        "Link-State floods complete topology maps and computes shortest paths via Dijkstra; Distance-Vector shares routing tables with direct neighbors via Bellman-Ford.",
        "Link-State only works on token ring networks.",
        "Distance-Vector protocol converges faster and has no hop limits.",
        "OSPF cannot route across subnets."
      ],
      answer: "Link-State floods complete topology maps and computes shortest paths via Dijkstra; Distance-Vector shares routing tables with direct neighbors via Bellman-Ford.",
      explanation: "OSPF nodes maintain full topological graph models of the network and run Dijkstra locally. RIP exchanges routing distances periodically and suffers from count-to-infinity limitations (max 15 hops).",
      difficulty: "Medium"
    },
    {
      id: "CN-614",
      category: "Computer Networks",
      question: "What role does the NAT (Network Address Translation) PAT (Port Address Translation) mechanism play?",
      options: [
        "Maps thousands of private IP:port combinations to a single public IP address using distinct source port numbers.",
        "Converts domain names into MAC addresses.",
        "Assigns static IPv6 blocks to IoT sensors.",
        "Encrypts TCP payloads with AES-256."
      ],
      answer: "Maps thousands of private IP:port combinations to a single public IP address using distinct source port numbers.",
      explanation: "PAT (or NAT Overload) allows an entire office LAN of private IP addresses (e.g. 192.168.1.x) to share a single public IP by tracking source port translations in a state table.",
      difficulty: "Medium"
    },
    {
      id: "CN-615",
      category: "Computer Networks",
      question: "In TCP communication, what is the purpose of the `TIME_WAIT` state on the active closing endpoint?",
      options: [
        "Ensures the final ACK is reliably delivered to the remote peer and allows delayed duplicate segments in the network to expire (2 \u00d7 MSL).",
        "Waits for the user to enter a cancellation password.",
        "Downloads remaining file chunks from secondary mirrors.",
        "Recycles OS socket descriptors without kernel intervention."
      ],
      answer: "Ensures the final ACK is reliably delivered to the remote peer and allows delayed duplicate segments in the network to expire (2 \u00d7 MSL).",
      explanation: "The endpoint that sends the final ACK enters `TIME_WAIT` for 2 \u00d7 MSL (Maximum Segment Lifetime, typically 1-2 minutes) to ensure that if the final ACK is lost, it can retransmit it when the peer resends its FIN.",
      difficulty: "Hard"
    }
  ],

  "Operating Systems": [
    {
      id: "OS-701",
      category: "Operating Systems",
      question: "Which of the following are the four necessary and sufficient Coffman conditions for a Deadlock to occur?",
      options: [
        "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait",
        "Starvation, Aging, Thrashing, Priority Inversion",
        "Paging, Segmentation, Swapping, Compaction",
        "Fork, Exec, Wait, Exit"
      ],
      answer: "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait",
      explanation: "The Coffman conditions state deadlock arises if and only if all four occur simultaneously: mutual exclusion on resources, processes holding while waiting for more, resources cannot be forcibly preempted, and a circular chain of waiting exists.",
      difficulty: "Medium"
    },
    {
      id: "OS-702",
      category: "Operating Systems",
      question: "What is 'Thrashing' in an Operating System virtual memory subsystem?",
      options: [
        "When the system spends more time swapping pages in and out of disk than executing actual instruction cycles.",
        "When the CPU fan spins at maximum RPM due to thermal throttling.",
        "When two threads execute a spinlock on a single core.",
        "When a hard disk platter develops bad sectors."
      ],
      answer: "When the system spends more time swapping pages in and out of disk than executing actual instruction cycles.",
      explanation: "Thrashing occurs when the sum of working set sizes of all active processes exceeds physical RAM capacity, causing continuous high-rate page faults and collapsing CPU utilization.",
      difficulty: "Easy"
    },
    {
      id: "OS-703",
      category: "Operating Systems",
      question: "What is the function of the Translation Lookaside Buffer (TLB) in CPU MMU hardware?",
      options: [
        "A high-speed associative hardware cache that stores recent Virtual-to-Physical page address translations.",
        "A register storing CPU execution flags.",
        "A buffer for network interface packet streaming.",
        "An instruction decoder for CISC operations."
      ],
      answer: "A high-speed associative hardware cache that stores recent Virtual-to-Physical page address translations.",
      explanation: "The TLB caches page table entries so that virtual memory lookups bypass multi-level hierarchical page table traversals in main memory, reducing address translation time to ~1 clock cycle.",
      difficulty: "Medium"
    },
    {
      id: "OS-704",
      category: "Operating Systems",
      question: "What is Priority Inversion, and how does Priority Inheritance solve it?",
      options: [
        "When a high-priority task is blocked waiting for a lock held by a low-priority task; Priority Inheritance temporarily raises the low-priority task's priority to match the high-priority task until the lock is released.",
        "When background threads starve foreground UI loops permanently.",
        "When the CPU scheduler reverses its queue order from FIFO to LIFO.",
        "When user-space processes access kernel registers directly."
      ],
      answer: "When a high-priority task is blocked waiting for a lock held by a low-priority task; Priority Inheritance temporarily raises the low-priority task's priority to match the high-priority task until the lock is released.",
      explanation: "If a medium-priority task preempts a low-priority task holding a lock needed by a high-priority task, the high-priority task is indefinitely delayed. Priority inheritance boosts the holder's priority, allowing it to finish and release the resource quickly.",
      difficulty: "Hard"
    },
    {
      id: "OS-705",
      category: "Operating Systems",
      question: "What does the `fork()` system call in Unix-like operating systems do when combined with Copy-On-Write (COW)?",
      options: [
        "Creates a child process duplicating the parent's page tables as read-only; physical pages are duplicated only when either process attempts a write.",
        "Instantly allocates an identical copy of all physical RAM memory frames.",
        "Spawns a lightweight thread within the exact same process address space.",
        "Replaces the current process image with an external binary executable."
      ],
      answer: "Creates a child process duplicating the parent's page tables as read-only; physical pages are duplicated only when either process attempts a write.",
      explanation: "Copy-On-Write (COW) defers expensive physical memory copying during `fork()`. The child shares parent pages marked read-only; writing triggers a page fault that duplicates only the modified page frame.",
      difficulty: "Hard"
    },
    {
      id: "OS-706",
      category: "Operating Systems",
      question: "Which process scheduling algorithm minimizes the average waiting time for a given set of stationary processes?",
      options: [
        "Shortest Job First (SJF) / Shortest Remaining Time First (SRTF)",
        "First-Come, First-Served (FCFS)",
        "Round Robin (RR) with large quantum",
        "Multilevel Feedback Queue"
      ],
      answer: "Shortest Job First (SJF) / Shortest Remaining Time First (SRTF)",
      explanation: "It is mathematically proven that SJF produces the minimal average waiting time because scheduling shorter bursts earlier reduces the queuing delays of subsequent jobs.",
      difficulty: "Easy"
    },
    {
      id: "OS-707",
      category: "Operating Systems",
      question: "What is Belady's Anomaly in page replacement algorithms?",
      options: [
        "For certain page reference strings, increasing the number of physical page frames results in MORE page faults (observed in FIFO).",
        "LRU page replacement degenerates to random replacement on large heaps.",
        "Page tables become larger than physical RAM.",
        "Deadlock occurs inside the disk I/O controller."
      ],
      answer: "For certain page reference strings, increasing the number of physical page frames results in MORE page faults (observed in FIFO).",
      explanation: "Belady's Anomaly shows that under FIFO replacement, allocating more memory frames can counterintuitively cause more page faults. Stack-based algorithms like LRU and Optimal are immune to this anomaly.",
      difficulty: "Medium"
    },
    {
      id: "OS-708",
      category: "Operating Systems",
      question: "What is the difference between a Monolithic Kernel (e.g. Linux) and a Microkernel (e.g. seL4, Minix)?",
      options: [
        "Monolithic kernels run all OS services (drivers, file systems, IPC) in privileged kernel space; microkernels move most services to user-space, keeping only basic IPC, scheduling, and memory in kernel space.",
        "Microkernels cannot run on 64-bit processors.",
        "Monolithic kernels do not support multithreading.",
        "Microkernels are written exclusively in assembly language."
      ],
      answer: "Monolithic kernels run all OS services (drivers, file systems, IPC) in privileged kernel space; microkernels move most services to user-space, keeping only basic IPC, scheduling, and memory in kernel space.",
      explanation: "Microkernels prioritize modularity and fault isolation: crash in a user-space file driver won't bring down the OS. Monolithic kernels optimize for raw speed by eliminating user/kernel context switches for OS subsystems.",
      difficulty: "Medium"
    },
    {
      id: "OS-709",
      category: "Operating Systems",
      question: "What is a Zombie Process in Unix?",
      options: [
        "A process that has completed execution via `exit()` but still occupies an entry in the Process Table because its parent has not yet read its exit status with `wait()`.",
        "A process consuming 100% CPU in an infinite loop.",
        "A process whose parent was killed and was adopted by init (PID 1).",
        "A kernel thread that handles hardware interrupts."
      ],
      answer: "A process that has completed execution via `exit()` but still occupies an entry in the Process Table because its parent has not yet read its exit status with `wait()`.",
      explanation: "When a process finishes, its resources are freed except its PID and return code in the process table. It remains a 'zombie' until the parent reaps it using `wait()` / `waitpid()`.",
      difficulty: "Easy"
    },
    {
      id: "OS-710",
      category: "Operating Systems",
      question: "What is the purpose of the Banker's Algorithm developed by Edsger Dijkstra?",
      options: [
        "Deadlock Avoidance: simulates allocation of maximum predetermined resources to test for safe states before granting requests.",
        "Deadlock Recovery: terminates all low priority jobs immediately.",
        "Memory Compaction: eliminates external fragmentation.",
        "File System Journaling: prevents corruption on power failure."
      ],
      answer: "Deadlock Avoidance: simulates allocation of maximum predetermined resources to test for safe states before granting requests.",
      explanation: "The Banker's Algorithm checks whether granting a resource request leaves the system in a 'Safe State' where all processes can eventually complete under their worst-case declared claims.",
      difficulty: "Medium"
    },
    {
      id: "OS-711",
      category: "Operating Systems",
      question: "How does a Counting Semaphore differ from a Binary Semaphore (Mutex)?",
      options: [
        "A Counting Semaphore has an integer counter initialized to N representing available units of a shared resource; a Binary Semaphore strictly toggles between 0 and 1.",
        "Counting Semaphores cannot be used across threads.",
        "A Mutex can be unlocked by any thread, while a semaphore cannot.",
        "Counting Semaphores operate without kernel system calls."
      ],
      answer: "A Counting Semaphore has an integer counter initialized to N representing available units of a shared resource; a Binary Semaphore strictly toggles between 0 and 1.",
      explanation: "A counting semaphore manages access to a finite pool of N identical resources (decrementing on wait/P and incrementing on signal/V), whereas a mutex enforces single-thread mutual exclusion with ownership semantics.",
      difficulty: "Easy"
    },
    {
      id: "OS-712",
      category: "Operating Systems",
      question: "What causes External Fragmentation in contiguous memory allocation systems?",
      options: [
        "Free memory is broken into many small non-contiguous blocks that cannot satisfy a large contiguous allocation request, even if total free memory is sufficient.",
        "Allocated memory blocks are larger than the requested payload size.",
        "Page tables exceed physical RAM cache size.",
        "The CPU cache is invalidated during context switching."
      ],
      answer: "Free memory is broken into many small non-contiguous blocks that cannot satisfy a large contiguous allocation request, even if total free memory is sufficient.",
      explanation: "External fragmentation occurs as variable-sized processes are loaded and freed over time, scattering free memory into small gaps. Paging eliminates external fragmentation by using fixed-size blocks.",
      difficulty: "Easy"
    },
    {
      id: "OS-713",
      category: "Operating Systems",
      question: "What is the difference between a trap and an interrupt in operating systems?",
      options: [
        "A trap (software interrupt) is synchronously generated by CPU instructions (e.g. syscall, divide by zero); an interrupt is asynchronously triggered by external hardware devices (e.g. keyboard, timer).",
        "A trap is always fatal and halts the machine.",
        "Interrupts can only be generated by GPU graphics cards.",
        "Traps run exclusively in user mode."
      ],
      answer: "A trap (software interrupt) is synchronously generated by CPU instructions (e.g. syscall, divide by zero); an interrupt is asynchronously triggered by external hardware devices (e.g. keyboard, timer).",
      explanation: "Traps are synchronous software events triggered by the currently running instruction (e.g. system calls, page faults). Interrupts are asynchronous hardware signals sent via the interrupt controller.",
      difficulty: "Medium"
    },
    {
      id: "OS-714",
      category: "Operating Systems",
      question: "Which Unix command/system call atomically switches process execution to a new program image while preserving the existing PID?",
      options: [
        "`execve()` family",
        "`fork()`",
        "`clone()`",
        "`pthread_create()`"
      ],
      answer: "`execve()` family",
      explanation: "`exec` replaces the current process's text segment, data segment, heap, and stack with a new binary program from disk, keeping the same PID and open file descriptors (unless FD_CLOEXEC is set).",
      difficulty: "Easy"
    },
    {
      id: "OS-715",
      category: "Operating Systems",
      question: "What is the Dirty Bit (Modified Bit) in a page table entry used for?",
      options: [
        "Indicates whether the page in physical RAM has been written to since being read from disk, determining if it must be written back to swap upon eviction.",
        "Detects buffer overflow attacks.",
        "Marks pages that contain invalid memory addresses.",
        "Identifies encrypted memory segments."
      ],
      answer: "Indicates whether the page in physical RAM has been written to since being read from disk, determining if it must be written back to swap upon eviction.",
      explanation: "If a page's dirty bit is 0 (unmodified), the OS can discard it immediately upon eviction because the copy on backing storage is identical, saving a disk write I/O cycle.",
      difficulty: "Medium"
    }
  ],

  "Artificial Intelligence": [
    {
      id: "AI-801",
      category: "Artificial Intelligence",
      question: "What is the key innovation of the Transformer architecture's Multi-Head Self-Attention mechanism over Recurrent Neural Networks (RNNs)?",
      options: [
        "It eliminates sequential step-by-step dependency, enabling full parallel processing of all tokens in a sequence while capturing direct pairwise token relationships.",
        "It completely removes the need for backpropagation during training.",
        "It operates without any learnable weight matrices.",
        "It restricts attention weights to adjacent tokens only."
      ],
      answer: "It eliminates sequential step-by-step dependency, enabling full parallel processing of all tokens in a sequence while capturing direct pairwise token relationships.",
      explanation: "RNNs process tokens sequentially (t depends on t-1), causing vanishing gradients over long sequences. Self-Attention computes pairwise dot-product attention scores across all tokens concurrently.",
      difficulty: "Medium"
    },
    {
      id: "AI-802",
      category: "Artificial Intelligence",
      question: "In the A* Search algorithm, what condition must the heuristic function h(n) satisfy to guarantee finding the mathematically optimal shortest path in tree search?",
      options: [
        "Admissibility: h(n) must never overestimate the true cost to reach the goal from node n (i.e., h(n) \u2264 h*(n)).",
        "h(n) must equal zero for all nodes.",
        "h(n) must be strictly negative.",
        "h(n) must be computed using quadratic regression."
      ],
      answer: "Admissibility: h(n) must never overestimate the true cost to reach the goal from node n (i.e., h(n) \u2264 h*(n)).",
      explanation: "An admissible heuristic never overestimates the actual remaining cost to the goal, ensuring A* never prematurely explores suboptimal goal paths.",
      difficulty: "Easy"
    },
    {
      id: "AI-803",
      category: "Artificial Intelligence",
      question: "What is the Vanishing Gradient Problem in deep feedforward neural networks, and which activation function mitigates it effectively?",
      options: [
        "Gradients exponentially shrink toward zero as backpropagation flows through many layers; mitigated by ReLU (Rectified Linear Unit) and its variants.",
        "Weights grow to infinity during gradient ascent; mitigated by Sigmoid.",
        "Loss reaches negative numbers; mitigated by Step functions.",
        "Bias terms become zero; mitigated by Linear activation."
      ],
      answer: "Gradients exponentially shrink toward zero as backpropagation flows through many layers; mitigated by ReLU (Rectified Linear Unit) and its variants.",
      explanation: "Functions like Sigmoid and Tanh have derivatives bounded \u2264 0.25. Multiplying many small derivatives during chain rule causes gradients to vanish. ReLU has a constant derivative of 1 for positive inputs, preventing attenuation.",
      difficulty: "Medium"
    },
    {
      id: "AI-804",
      category: "Artificial Intelligence",
      question: "In Reinforcement Learning, what is the Bellman Optimality Equation for state-action value function Q*(s, a)?",
      options: [
        "Q*(s, a) = R(s, a) + \u03b3 \u2211 P(s'|s,a) max_{a'} Q*(s', a')",
        "Q*(s, a) = R(s, a) - \u03b3 Q*(s, a)",
        "Q*(s, a) = \u2211 R(s, a) / N",
        "Q*(s, a) = argmax_{a} P(s'|s,a)"
      ],
      answer: "Q*(s, a) = R(s, a) + \u03b3 \u2211 P(s'|s,a) max_{a'} Q*(s', a')",
      explanation: "The Bellman Optimality Equation defines the value of taking action a in state s as immediate expected reward plus discounted optimal future value assuming greedy choice in the successor state.",
      difficulty: "Hard"
    },
    {
      id: "AI-805",
      category: "Artificial Intelligence",
      question: "What is the difference between L1 Regularization (Lasso) and L2 Regularization (Ridge) in loss optimization?",
      options: [
        "L1 adds the sum of absolute weight values \u2211|w| promoting weight sparsity (feature selection); L2 adds sum of squared weights \u2211w² shrinking weights smoothly.",
        "L2 sets weights strictly to zero.",
        "L1 can only be applied to convolutional layers.",
        "L2 eliminates the need for a learning rate."
      ],
      answer: "L1 adds the sum of absolute weight values \u2211|w| promoting weight sparsity (feature selection); L2 adds sum of squared weights \u2211w² shrinking weights smoothly.",
      explanation: "Due to the diamond geometry of L1 penalty constraints, gradients drive less informative weights strictly to 0 (sparse model). L2 (Ridge) penalizes large weights quadratically, shrinking them towards zero without zeroing them.",
      difficulty: "Medium"
    },
    {
      id: "AI-806",
      category: "Artificial Intelligence",
      question: "What is the purpose of Alpha-Beta Pruning in the Minimax game tree algorithm?",
      options: [
        "It prunes branches that cannot influence the final decision without altering the optimal Minimax outcome, accelerating search up to O(b^{d/2}).",
        "It converts two-player zero-sum games into cooperative games.",
        "It eliminates the need for state evaluation heuristics.",
        "It replaces depth-first search with breadth-first search."
      ],
      answer: "It prunes branches that cannot influence the final decision without altering the optimal Minimax outcome, accelerating search up to O(b^{d/2}).",
      explanation: "Alpha-Beta maintains \u03b1 (best score maximizer is assured of) and \u03b2 (best score minimizer is assured of). If \u03b1 \u2265 \u03b2, the remaining children cannot affect the outcome and are safely pruned.",
      difficulty: "Medium"
    },
    {
      id: "AI-807",
      category: "Artificial Intelligence",
      question: "In Machine Learning evaluation metrics, what is the harmonic mean of Precision and Recall?",
      options: [
        "F1-Score: 2 \u00d7 (Precision \u00d7 Recall) / (Precision + Recall)",
        "ROC-AUC Score",
        "Accuracy Ratio",
        "Mean Squared Error (MSE)"
      ],
      answer: "F1-Score: 2 \u00d7 (Precision \u00d7 Recall) / (Precision + Recall)",
      explanation: "The F1-Score balances precision and recall using their harmonic mean, giving a robust performance metric especially on imbalanced datasets where raw accuracy is misleading.",
      difficulty: "Easy"
    },
    {
      id: "AI-808",
      category: "Artificial Intelligence",
      question: "What is the fundamental objective of Generative Adversarial Networks (GANs)?",
      options: [
        "A zero-sum game where a Generator creates synthetic data while a Discriminator learns to distinguish real data from generated counterfeits.",
        "Clustering unlabelled high-dimensional vectors via k-means.",
        "Predicting continuous numerical target values via linear hyperplanes.",
        "Compressing images into low-rank matrix decompositions."
      ],
      answer: "A zero-sum game where a Generator creates synthetic data while a Discriminator learns to distinguish real data from generated counterfeits.",
      explanation: "Ian Goodfellow introduced GANs where the Generator network G tries to maximize the probability of fooling Discriminator D, while D tries to minimize its classification error: min_G max_D V(D, G).",
      difficulty: "Easy"
    },
    {
      id: "AI-809",
      category: "Artificial Intelligence",
      question: "In Convolutional Neural Networks (CNNs), what is the function of a 1x1 Convolution layer (Pointwise Convolution)?",
      options: [
        "To perform dimensionality reduction/expansion along the channel dimension with cross-channel pooling while adding non-linearity.",
        "To increase spatial image height and width.",
        "To perform optical character recognition.",
        "To replace the softmax classification output."
      ],
      answer: "To perform dimensionality reduction/expansion along the channel dimension with cross-channel pooling while adding non-linearity.",
      explanation: "1\u00d71 convolutions (popularized by Network-in-Network and Inception architectures) pool information across feature map channels without altering spatial height/width, vastly reducing parameters.",
      difficulty: "Hard"
    },
    {
      id: "AI-810",
      category: "Artificial Intelligence",
      question: "What does the 'Temperature' parameter in Large Language Model (LLM) sampling control?",
      options: [
        "It scales logits before the Softmax function; lower values make output more deterministic and focused, while higher values increase randomness and diversity.",
        "It controls the GPU hardware fan speed during inference.",
        "It increases the maximum context token window limit.",
        "It controls the learning rate during LoRA fine-tuning."
      ],
      answer: "It scales logits before the Softmax function; lower values make output more deterministic and focused, while higher values increase randomness and diversity.",
      explanation: "By dividing logits z_i by T (Softmax(z_i / T)), T \u2192 0 approaches argmax (greedy deterministic), while higher T flattens the probability distribution across vocabulary tokens.",
      difficulty: "Easy"
    },
    {
      id: "AI-811",
      category: "Artificial Intelligence",
      question: "What is the purpose of Batch Normalization in deep neural networks?",
      options: [
        "Normalizes layer inputs across the mini-batch to zero mean and unit variance, reducing internal covariate shift and stabilizing training.",
        "Ensures batches are shuffled randomly before every epoch.",
        "Compresses dataset image files into uniform 8-bit integers.",
        "Splits training batches across multiple GPUs."
      ],
      answer: "Normalizes layer inputs across the mini-batch to zero mean and unit variance, reducing internal covariate shift and stabilizing training.",
      explanation: "Batch Normalization normalizes activations for each mini-batch and applies learnable scale (\u03b3) and shift (\u03b2) parameters, allowing higher learning rates and reducing sensitivity to initialization.",
      difficulty: "Medium"
    },
    {
      id: "AI-812",
      category: "Artificial Intelligence",
      question: "What is the Bias-Variance Tradeoff in statistical machine learning?",
      options: [
        "Models with high bias underfit by oversimplifying patterns; models with high variance overfit by capturing training noise; optimal generalization balances both.",
        "Bias represents GPU hardware errors while variance measures RAM capacity.",
        "Increasing training data always increases variance.",
        "Unsupervised models have zero bias and zero variance."
      ],
      answer: "Models with high bias underfit by oversimplifying patterns; models with high variance overfit by capturing training noise; optimal generalization balances both.",
      explanation: "Total Expected Error = Bias\u00b2 + Variance + Irreducible Error. High bias indicates underfitting (inflexible model), while high variance indicates overfitting to training fluctuations.",
      difficulty: "Easy"
    },
    {
      id: "AI-813",
      category: "Artificial Intelligence",
      question: "In Deep Learning, what does the Adam optimizer (Adaptive Moment Estimation) compute?",
      options: [
        "Maintains exponential moving averages of both past gradients (1st moment / momentum) and squared gradients (2nd moment / uncentered variance) with bias corrections.",
        "Calculates the exact Hessian matrix for second-order Newton steps.",
        "Computes genetic mutation rates for weight parameters.",
        "Uses simulated annealing to escape local minima."
      ],
      answer: "Maintains exponential moving averages of both past gradients (1st moment / momentum) and squared gradients (2nd moment / uncentered variance) with bias corrections.",
      explanation: "Adam combines AdaGrad (handling sparse gradients) and RMSProp (adaptive per-parameter learning rates) along with momentum, adapting individual parameter step sizes efficiently.",
      difficulty: "Hard"
    },
    {
      id: "AI-814",
      category: "Artificial Intelligence",
      question: "Which Natural Language Processing (NLP) tokenization algorithm is used by models like GPT-4 and LLaMA?",
      options: [
        "Byte-Pair Encoding (BPE) / SentencePiece",
        "White-space regex splitting only",
        "Porter Stemming Algorithm",
        "Soundex Phonetic Tokenizer"
      ],
      answer: "Byte-Pair Encoding (BPE) / SentencePiece",
      explanation: "BPE starts at the byte/character level and iteratively merges the most frequent adjacent pairs into subwords, balancing vocabulary size with zero out-of-vocabulary (OOV) token issues.",
      difficulty: "Medium"
    },
    {
      id: "AI-815",
      category: "Artificial Intelligence",
      question: "In Reinforcement Learning from Human Feedback (RLHF), what algorithm is commonly used to optimize the language model policy against a reward model?",
      options: [
        "Proximal Policy Optimization (PPO)",
        "Q-Learning with replay buffers",
        "SARSA with linear function approximation",
        "Value Iteration on Markov Decision Processes"
      ],
      answer: "Proximal Policy Optimization (PPO)",
      explanation: "PPO uses a clipped surrogate objective to constrain policy updates, preventing catastrophic performance collapse when fine-tuning LLM generation against reward model feedback.",
      difficulty: "Hard"
    }
  ],

  "Aptitude": [
    {
      id: "APT-901",
      category: "Aptitude",
      question: "A pipe can fill a tank in 12 hours, while a second pipe empties it in 18 hours. If both pipes are opened together, in how many hours will the empty tank be filled?",
      options: [
        "36 hours",
        "30 hours",
        "24 hours",
        "15 hours"
      ],
      answer: "36 hours",
      explanation: "Net fill rate per hour = (1/12) - (1/18) = (3 - 2)/36 = 1/36. Therefore, the tank takes 36 hours to be filled completely.",
      difficulty: "Easy"
    },
    {
      id: "APT-902",
      category: "Aptitude",
      question: "A train 180 meters long running at a speed of 72 km/h crosses a bridge in 24 seconds. What is the length of the bridge?",
      options: [
        "300 meters",
        "480 meters",
        "360 meters",
        "240 meters"
      ],
      answer: "300 meters",
      explanation: "Speed in m/s = 72 \u00d7 (5/18) = 20 m/s. Total distance covered in 24 seconds = Speed \u00d7 Time = 20 \u00d7 24 = 480 meters. Bridge Length = Total Distance - Train Length = 480 - 180 = 300 meters.",
      difficulty: "Medium"
    },
    {
      id: "APT-903",
      category: "Aptitude",
      question: "In how many distinct ways can the letters of the word **'EQUATION'** be arranged such that all the vowels always appear together?",
      options: [
        "2,880 ways",
        "40,320 ways",
        "1,440 ways",
        "720 ways"
      ],
      answer: "2,880 ways",
      explanation: "Word 'EQUATION' has 8 letters: 5 vowels (E, U, A, I, O) and 3 consonants (Q, T, N). Treat 5 vowels as 1 single block: total items to arrange = (3 consonants + 1 block) = 4 items \u2192 4! = 24. Inside the block, the 5 vowels can arrange among themselves in 5! = 120 ways. Total arrangements = 4! \u00d7 5! = 24 \u00d7 120 = 2,880.",
      difficulty: "Hard"
    },
    {
      id: "APT-904",
      category: "Aptitude",
      question: "A merchant marks an item 40% above cost price and allows a discount of 25% on the marked price. What is the net percentage profit or loss?",
      options: [
        "5% Profit",
        "5% Loss",
        "15% Profit",
        "10% Profit"
      ],
      answer: "5% Profit",
      explanation: "Let Cost Price (CP) = 100. Marked Price (MP) = 100 + 40 = 140. Selling Price (SP) = 140 \u00d7 (1 - 0.25) = 140 \u00d7 0.75 = 105. Net Profit = SP - CP = 105 - 100 = 5%.",
      difficulty: "Easy"
    },
    {
      id: "APT-905",
      category: "Aptitude",
      question: "Two dice are thrown simultaneously. What is the probability that the sum of the numbers appearing on both dice is a prime number?",
      options: [
        "15/36 (i.e. 5/12)",
        "7/36",
        "1/2",
        "11/36"
      ],
      answer: "15/36 (i.e. 5/12)",
      explanation: "Possible sums: {2, 3, 5, 7, 11}. Combinations for each prime sum:\nSum=2: (1,1) [1]\nSum=3: (1,2),(2,1) [2]\nSum=5: (1,4),(2,3),(3,2),(4,1) [4]\nSum=7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) [6]\nSum=11: (5,6),(6,5) [2]\nTotal favorable outcomes = 1 + 2 + 4 + 6 + 2 = 15. Probability = 15/36 = 5/12.",
      difficulty: "Medium"
    },
    {
      id: "APT-906",
      category: "Aptitude",
      question: "A sum of money invested under Compound Interest doubles itself in 5 years. In how many years will it become 8 times of itself at the same annual interest rate?",
      options: [
        "15 years",
        "10 years",
        "20 years",
        "25 years"
      ],
      answer: "15 years",
      explanation: "In compound interest, if P becomes 2P in 5 years, it will become 4P in 10 years, and 8P (which is 2³) in 3 \u00d7 5 = 15 years.",
      difficulty: "Easy"
    },
    {
      id: "APT-907",
      category: "Aptitude",
      question: "Find the next number in the following sequence:\n**2, 10, 30, 68, 130, ?**",
      options: [
        "222",
        "216",
        "240",
        "196"
      ],
      answer: "222",
      explanation: "The pattern follows n³ + n for n = 1, 2, 3, 4, 5, 6:\n1³ + 1 = 2\n2³ + 2 = 10\n3³ + 3 = 30\n4³ + 4 = 68\n5³ + 5 = 130\n6³ + 6 = 216 + 6 = 222.",
      difficulty: "Medium"
    },
    {
      id: "APT-908",
      category: "Aptitude",
      question: "A and B can complete a work together in 12 days. B and C together in 15 days, and C and A together in 20 days. How many days will A alone take to finish the work?",
      options: [
        "30 days",
        "20 days",
        "40 days",
        "60 days"
      ],
      answer: "30 days",
      explanation: "2(A + B + C) = 1/12 + 1/15 + 1/20 = (5 + 4 + 3)/60 = 12/60 = 1/5.\nSo A + B + C = 1/10.\nA's 1-day work = (A + B + C) - (B + C) = 1/10 - 1/15 = (3 - 2)/30 = 1/30.\nHence, A alone takes 30 days.",
      difficulty: "Medium"
    },
    {
      id: "APT-909",
      category: "Aptitude",
      question: "The average age of a class of 30 students is 14 years. When the teacher's age is included, the average increases by 1 year. What is the teacher's age?",
      options: [
        "45 years",
        "44 years",
        "42 years",
        "50 years"
      ],
      answer: "45 years",
      explanation: "Total age of 30 students = 30 \u00d7 14 = 420. New total for 31 people = 31 \u00d7 15 = 465. Teacher's age = 465 - 420 = 45 years.",
      difficulty: "Easy"
    },
    {
      id: "APT-910",
      category: "Aptitude",
      question: "At what time between 4 o'clock and 5 o'clock will the hands of a clock be pointing in opposite directions (forming a straight 180° line)?",
      options: [
        "54 \u2198/11 minutes past 4 (i.e. 4 hours 54 \u2076/\u2081\u2081 min)",
        "50 minutes past 4",
        "52 \u2074/\u2081\u2081 minutes past 4",
        "48 \u2078/\u2081\u2081 minutes past 4"
      ],
      answer: "54 \u2198/11 minutes past 4 (i.e. 4 hours 54 \u2076/\u2081\u2081 min)",
      explanation: "At 4 o'clock, the minute hand is 20 minute spaces behind the hour hand. To be opposite, it must gain (20 + 30) = 50 minute spaces. Minute hand gains 55 spaces in 60 min (rate = 60/55 = 12/11). Time = 50 \u00d7 (12/11) = 600/11 = 54 \u2076/\u2081\u2081 minutes past 4.",
      difficulty: "Hard"
    },
    {
      id: "APT-911",
      category: "Aptitude",
      question: "Pointing to a photograph, a woman says: 'He is the son of the only daughter of the father of my brother.' How is the person in the photograph related to the woman?",
      options: [
        "Her Son",
        "Her Brother",
        "Her Nephew",
        "Her Uncle"
      ],
      answer: "Her Son",
      explanation: "'Father of my brother' = Woman's father. 'The only daughter of woman's father' = The woman herself. 'The son of the only daughter' = The woman's son.",
      difficulty: "Easy"
    },
    {
      id: "APT-912",
      category: "Aptitude",
      question: "If 15 men working 8 hours a day can build a wall in 10 days, in how many days can 20 men working 6 hours a day build the same wall?",
      options: [
        "10 days",
        "12 days",
        "8 days",
        "15 days"
      ],
      answer: "10 days",
      explanation: "Using (M1 \u00d7 H1 \u00d7 D1) = (M2 \u00d7 H2 \u00d7 D2): (15 \u00d7 8 \u00d7 10) = (20 \u00d7 6 \u00d7 D2) \u2192 1200 = 120 \u00d7 D2 \u2192 D2 = 10 days.",
      difficulty: "Easy"
    },
    {
      id: "APT-913",
      category: "Aptitude",
      question: "A vessel contains 60 litres of milk. 6 litres of milk are taken out and replaced with water. This process is repeated one more time. How much pure milk remains in the vessel?",
      options: [
        "48.6 litres",
        "50.4 litres",
        "48.0 litres",
        "52.2 litres"
      ],
      answer: "48.6 litres",
      explanation: "Remaining pure milk = Initial \u00d7 (1 - x/V)^n = 60 \u00d7 (1 - 6/60)² = 60 \u00d7 (9/10)² = 60 \u00d7 0.81 = 48.6 litres.",
      difficulty: "Hard"
    },
    {
      id: "APT-914",
      category: "Aptitude",
      question: "A car covers the first half of a distance at 40 km/h and the second half at 60 km/h. What is the average speed of the car for the entire journey?",
      options: [
        "48 km/h",
        "50 km/h",
        "52 km/h",
        "45 km/h"
      ],
      answer: "48 km/h",
      explanation: "For equal distances, Average Speed = (2 \u00d7 v1 \u00d7 v2) / (v1 + v2) = (2 \u00d7 40 \u00d7 60) / (40 + 60) = 4800 / 100 = 48 km/h.",
      difficulty: "Easy"
    },
    {
      id: "APT-915",
      category: "Aptitude",
      question: "A box contains 5 red, 4 green, and 3 blue balls. If 3 balls are drawn at random, what is the probability that all 3 are of different colors?",
      options: [
        "3/11 (i.e. 60/220)",
        "5/22",
        "1/6",
        "7/44"
      ],
      answer: "3/11 (i.e. 60/220)",
      explanation: "Total balls = 5 + 4 + 3 = 12. Ways to choose 3 balls = 12C3 = (12 \u00d7 11 \u00d7 10) / (3 \u00d7 2 \u00d7 1) = 220. Ways to choose 1 Red, 1 Green, 1 Blue = 5C1 \u00d7 4C1 \u00d7 3C1 = 5 \u00d7 4 \u00d7 3 = 60. Probability = 60 / 220 = 3 / 11.",
      difficulty: "Medium"
    }
  ]
};

// Export to window object for browser usage
if (typeof window !== "undefined") {
  window.TEST_CONFIGS = TEST_CONFIGS;
  window.QUESTION_BANK = QUESTION_BANK;
}
