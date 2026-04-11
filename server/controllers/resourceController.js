const Resource = require('../models/Resource');

// Pre-seeded Mock Resources to act as our dataset
const defaultResources = [
  {
    title: "100 DSA Interview Questions",
    description: "The ultimate curated list of top data structure and algorithm questions asked in FAANG.",
    type: "Practice",
    difficulty: "Intermediate",
    topic: "DSA",
    sourceName: "LeetCode",
    url: "https://leetcode.com",
    tags: ["arrays", "trees", "graphs", "DP"]
  },
  {
    title: "Operating Systems Crash Course",
    description: "Understand OS from scratch: Process Scheduling, Concurrency, and Deadlocks.",
    type: "Video",
    difficulty: "Beginner",
    topic: "OS",
    sourceName: "YouTube",
    url: "https://youtube.com",
    tags: ["OS", "processes", "threads"]
  },
  {
    title: "Normal Forms in DBMS Explained",
    description: "Deep dive into 1NF, 2NF, 3NF and BCNF with real-world table examples.",
    type: "Article",
    difficulty: "Intermediate",
    topic: "DBMS",
    sourceName: "GeeksforGeeks",
    url: "https://geeksforgeeks.org",
    tags: ["database", "normalization"]
  },
  {
    title: "Advanced System Design Notes",
    description: "Comprehensive notes for scaling microservices and designing highly available systems.",
    type: "Notes",
    difficulty: "Advanced",
    topic: "System Design",
    sourceName: "PrepFusion Curated",
    url: "#",
    tags: ["scaling", "microservices", "API"]
  },
  {
    title: "Dynamic Programming Patterns",
    description: "Master DP by recognizing these 5 patterns. Stop memorizing solutions.",
    type: "Video",
    difficulty: "Advanced",
    topic: "DSA",
    sourceName: "YouTube",
    url: "https://youtube.com",
    tags: ["DP", "algorithms"]
  }
];

// @route   GET /api/resources
// @desc    Get all resources with optional filtering (topic, type, difficulty)
// @access  Private
exports.getResources = async (req, res) => {
  try {
    const { topic, type, difficulty, search } = req.query;

    let query = {};
    if (topic) query.topic = topic;
    if (type) query.type = type;
    if (difficulty) query.difficulty = difficulty;
    
    // Simple text search mock
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    let resources = await Resource.find(query);

    // If empty DB, return mock data dynamically filtered
    if (resources.length === 0) {
      let filteredMocks = defaultResources;
      if (topic) filteredMocks = filteredMocks.filter(r => r.topic === topic);
      if (type) filteredMocks = filteredMocks.filter(r => r.type === type);
      if (difficulty) filteredMocks = filteredMocks.filter(r => r.difficulty === difficulty);
      if (search) filteredMocks = filteredMocks.filter(r => r.title.toLowerCase().includes(search.toLowerCase()));
      
      return res.json(filteredMocks);
    }

    res.json(resources);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
