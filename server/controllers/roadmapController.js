const Roadmap = require('../models/Roadmap');
const User = require('../models/User');

// Mock algorithm to generate roadmap based on user profile
const generateTemplate = (goal, skill) => {
  let milestones = [];

  if (goal === 'Placement') {
    if (skill === 'Beginner') {
      milestones = [
        {
          title: "Week 1-2: Core Language & Math Basics",
          status: 'Active',
          tasks: [
            { title: "Learn Time & Space Complexity", type: "Concept", estimatedHours: 2 },
            { title: "Basic Math for DSA", type: "Article", estimatedHours: 3 },
            { title: "Solve 10 Easy Array problems", type: "Practice", estimatedHours: 5 }
          ]
        },
        {
          title: "Week 3-5: Data Structures Deep Dive",
          status: 'Pending',
          tasks: [
            { title: "Linked Lists & Pointers", type: "Video", estimatedHours: 4 },
            { title: "Stacks and Queues implementations", type: "Practice", estimatedHours: 5 },
            { title: "Weekly Mock Test 1", type: "MockTest", estimatedHours: 2 }
          ]
        }
      ];
    } else {
      milestones = [
        {
          title: "Week 1-2: Advanced Algorithms",
          status: 'Active',
          tasks: [
            { title: "Dynamic Programming Foundations", type: "Concept", estimatedHours: 5 },
            { title: "Graph Traversals (BFS/DFS)", type: "Video", estimatedHours: 4 },
            { title: "Solve Hard DP problems on LeetCode", type: "Practice", estimatedHours: 8 }
          ]
        }
      ];
    }
  } else if (goal === 'GATE') {
    milestones = [
      {
        title: "Month 1: Engineering Mathematics & Aptitude",
        status: 'Active',
        tasks: [
          { title: "Linear Algebra Fundamentals", type: "Concept", estimatedHours: 10 },
          { title: "Probability and Statistics", type: "Video", estimatedHours: 12 },
          { title: "Previous Year Questions 2010-2023", type: "Practice", estimatedHours: 15 }
        ]
      },
      {
        title: "Month 2: Core Computer Science Subjects",
        status: 'Pending',
        tasks: [
          { title: "Operating Systems - Process Management", type: "Concept", estimatedHours: 8 },
          { title: "DBMS - Normalization", type: "Article", estimatedHours: 6 }
        ]
      }
    ];
  } else {
    // Default fallback
    milestones = [
      {
        title: "Phase 1: Fundamentals",
        status: 'Active',
        tasks: [
          { title: "Introduction to Goal", type: "Concept", estimatedHours: 2 },
          { title: "Set up preparation environment", type: "Practice", estimatedHours: 1 }
        ]
      }
    ];
  }

  return milestones;
};

// @desc    Generate or get user roadmap
// @route   GET /api/roadmap
// @access  Private
exports.getRoadmap = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let roadmap = await Roadmap.findOne({ user: user.id });

    // If no roadmap exists, let's intelligently generate one!
    if (!roadmap) {
      const generatedMilestones = generateTemplate(user.targetGoal, user.skillLevel);
      roadmap = new Roadmap({
        user: user.id,
        targetGoal: user.targetGoal,
        milestones: generatedMilestones
      });
      await roadmap.save();
    }

    res.json(roadmap);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Toggle task completion status
// @route   PUT /api/roadmap/task/:milestoneId/:taskId
// @access  Private
exports.updateTaskStatus = async (req, res) => {
  try {
    const { milestoneId, taskId } = req.params;
    const roadmap = await Roadmap.findOne({ user: req.user.id });

    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    let milestone = roadmap.milestones.id(milestoneId);
    if (!milestone) return res.status(404).json({ message: 'Milestone not found' });

    let task = milestone.tasks.id(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Toggle completion
    task.isCompleted = !task.isCompleted;

    // Recalculate progress percentage
    let totalTasks = 0;
    let completedTasks = 0;
    
    roadmap.milestones.forEach(m => {
      m.tasks.forEach(t => {
        totalTasks++;
        if (t.isCompleted) completedTasks++;
      });
    });

    roadmap.progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    // Save modifications
    await roadmap.save();

    res.json(roadmap);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
