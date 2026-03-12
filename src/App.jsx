import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Box,
  LinearProgress,
  Paper,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Avatar,
  IconButton,
  Badge,
} from "@mui/material";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

import Auth from "./pages/Auth";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


const COLORS = {
  ahead: "#22C55E",
  track: "#F59E0B",
  behind: "#EF4444",
  primary: "#4F8CFF",
  secondary: "#22D3EE",
  bg: "#0B1B3A",
  cardBg: "#FFFFFF",
};


const SUBJECTS_DB = {
  "DSA": {
    emoji: "📊",
    fullName: "Data Structures & Algorithms",
    description: "Master the fundamentals of computer science with in-depth coverage of data structures and algorithms",
    Beginner: [
      "Arrays & Strings - Indexing, searching, sorting basics",
      "Linked Lists - Singly linked list, operations",
      "Stacks & Queues - LIFO/FIFO operations",
      "Hash Tables - Hashing, collision handling",
      "Sorting Basics - Bubble, selection, insertion sort",
      "Big O Notation - Time & space complexity analysis",
    ],
    Intermediate: [
      "Binary Search Trees - BST operations, traversals",
      "Graphs & BFS/DFS - Graph representations, traversals",
      "Dynamic Programming Intro - Memoization basics",
      "Greedy Algorithms - Activity selection, fractional knapsack",
      "Backtracking - N-Queens, permutations, combinations",
      "Heaps & Priority Queues - Min/Max heap implementation",
    ],
    Advanced: [
      "Advanced DP - Longest subsequences, matrix chain multiplication",
      "Network Flow - Max flow, Ford-Fulkerson algorithm",
      "Segment Trees - Range queries, updates",
      "Tries & String Matching - KMP, Rabin-Karp algorithms",
      "NP-Complete Problems - Recognition & approximation",
      "Graph Algorithms - Dijkstra, Floyd-Warshall, Bellman-Ford",
    ]
  },
  "Python": {
    emoji: "🐍",
    fullName: "Python Programming",
    description: "Learn Python from basics to advanced OOP, web development, and data science applications",
    Beginner: [
      "Syntax & Variables - Data types, variable assignment",
      "Control Flow - if/else statements, loops (for, while)",
      "Functions & Scope - Function definition, parameters, return values",
      "Data Types - Lists, tuples, dictionaries, sets",
      "String Operations - String methods, f-strings, formatting",
      "File I/O - Reading, writing, file operations",
    ],
    Intermediate: [
      "OOP Basics - Classes, objects, inheritance, polymorphism",
      "Modules & Packages - Import system, creating modules",
      "Exception Handling - Try-except blocks, custom exceptions",
      "Decorators & Closures - Function decorators, nested functions",
      "Generators & Iterators - yield keyword, generator functions",
      "List Comprehensions - Concise list creation, nested comprehensions",
    ],
    Advanced: [
      "Async Programming - asyncio, async/await, event loops",
      "Metaclasses - Class creation, __new__, __init__",
      "Performance Optimization - Profiling, caching, optimization",
      "Testing & Debugging - unittest, pytest, debugging techniques",
      "Design Patterns - Singleton, Factory, Observer, Strategy",
      "Memory Management - Garbage collection, optimization tips",
    ]
  },
  "Web Dev": {
    emoji: "🌐",
    fullName: "Web Development",
    description: "Full-stack web development covering frontend, backend, and deployment",
    Beginner: [
      "HTML Basics - Semantic HTML, forms, accessibility",
      "CSS Styling - Flexbox, Grid, responsive design",
      "JavaScript Fundamentals - Variables, functions, DOM",
      "DOM Manipulation - querySelector, event listeners",
      "Forms & Validation - Form handling, client-side validation",
      "Responsive Design - Media queries, mobile-first approach",
    ],
    Intermediate: [
      "React Hooks - useState, useEffect, custom hooks",
      "Component Architecture - Composition, reusable components",
      "REST APIs - Fetch API, axios, error handling",
      "Routing - React Router, navigation, params",
      "CSS Frameworks - Tailwind CSS, Bootstrap integration",
      "Local Storage & Session - Browser storage APIs",
    ],
    Advanced: [
      "Performance Optimization - Code splitting, lazy loading, memoization",
      "Testing - Jest, React Testing Library, E2E testing",
      "Deployment - Vercel, Netlify, GitHub Pages, CI/CD",
      "Security - CORS, XSS prevention, CSRF tokens, authentication",
      "Advanced Patterns - HOC, Render Props, Compound Components",
      "Server-Side Rendering - Next.js, SSR concepts",
    ]
  },
  "Machine Learning": {
    emoji: "🤖",
    fullName: "Machine Learning & AI",
    description: "Comprehensive guide to machine learning, deep learning, and AI applications",
    Beginner: [
      "Python for ML - NumPy arrays, Pandas dataframes",
      "Data Preprocessing - Cleaning, handling missing values",
      "Exploratory Data Analysis - Statistics, visualization",
      "Linear Regression - Cost function, gradient descent",
      "Logistic Regression - Binary classification, probability",
      "Decision Trees - Tree construction, pruning, visualization",
    ],
    Intermediate: [
      "Random Forests - Ensemble methods, bagging, feature importance",
      "K-Means Clustering - Unsupervised learning, centroid updates",
      "Principal Component Analysis - Dimensionality reduction",
      "Support Vector Machines - Kernel methods, margin maximization",
      "Neural Networks Basics - Perceptron, backpropagation",
      "Model Evaluation - Confusion matrix, precision, recall, F1-score",
    ],
    Advanced: [
      "Deep Learning - CNNs for image recognition, RNNs for sequences",
      "Natural Language Processing - Tokenization, embeddings, BERT",
      "Computer Vision - Image classification, object detection",
      "Reinforcement Learning - Q-learning, policy gradient",
      "Transfer Learning - Pre-trained models, fine-tuning",
      "Model Deployment - TensorFlow Serving, containerization",
    ]
  },
  "JavaScript": {
    emoji: "⚡",
    fullName: "JavaScript Mastery",
    description: "Deep dive into JavaScript ES6+, async programming, and modern frameworks",
    Beginner: [
      "Variables & Scope - var, let, const, block scope",
      "Data Types & Operators - Primitives, type coercion",
      "Functions & Arrow Functions - Function declarations, arrow syntax",
      "Objects & Arrays - Object methods, array manipulation",
      "DOM & Events - Event handling, event delegation",
      "Promise Basics - Promise creation, then/catch chaining",
    ],
    Intermediate: [
      "Async/Await - Async functions, error handling with try-catch",
      "Closures & Hoisting - Variable hoisting, closure patterns",
      "Prototypes & Inheritance - Prototype chain, constructor functions",
      "Modules - ES6 import/export, module patterns",
      "Error Handling - Custom errors, error stack traces",
      "Regular Expressions - Regex patterns, exec, match, replace",
    ],
    Advanced: [
      "Advanced Closures - Module pattern, data privacy",
      "Event Loop & Microtasks - Execution context, call stack",
      "Web Workers - Multi-threading in JavaScript",
      "Memory Leaks - Detecting and preventing memory issues",
      "Design Patterns - Singleton, Observer, Module pattern",
      "Advanced Async - Race conditions, concurrent operations",
    ]
  },
  "React": {
    emoji: "⚛️",
    fullName: "React & Frontend",
    description: "Master React for building modern, scalable, and performant web applications",
    Beginner: [
      "JSX & Components - Function components, JSX syntax",
      "Props & State - Component props, useState hook",
      "Hooks (useState, useEffect) - Managing component lifecycle",
      "Conditional Rendering - if/else, ternary, logical AND",
      "Lists & Keys - Rendering lists, key prop importance",
      "Form Handling - Controlled components, input handling",
    ],
    Intermediate: [
      "Context API - Creating context, useContext hook",
      "Custom Hooks - Building reusable hooks, hook rules",
      "useReducer - Complex state management, reducer pattern",
      "Performance Optimization - useMemo, useCallback, React.memo",
      "Code Splitting - Dynamic imports, lazy loading",
      "Error Boundaries - Error handling in components",
    ],
    Advanced: [
      "Advanced Patterns - HOC, Render Props, composition",
      "Server Components - RSC concepts, async components",
      "Suspense & Lazy Loading - Code splitting, data fetching",
      "Concurrent Features - Transitions, startTransition",
      "React Testing - Component testing, hooks testing",
      "State Management - Redux, Zustand, Jotai integration",
    ]
  },
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserName, setCurrentUserName] = useState("Learner");
  const [subject, setSubject] = useState("DSA");
  const [days, setDays] = useState(3);
  const [hours, setHours] = useState(2);
  const [level, setLevel] = useState("Beginner");
  const [plan, setPlan] = useState([]);
  const [currentPlanId, setCurrentPlanId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const [customSubjectName, setCustomSubjectName] = useState("");
  const [customLevelTab, setCustomLevelTab] = useState(0);
  const [customTopics, setCustomTopics] = useState({
    Beginner: "",
    Intermediate: "",
    Advanced: ""
  });
  const [customSubjects, setCustomSubjects] = useState({});
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [studyHistory, setStudyHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [analysisTrack, setAnalysisTrack] = useState("Software Engineer");
  const [examDate, setExamDate] = useState("");
  const homeRef = useRef(null);
  const plannerRef = useRef(null);
  const analyticsRef = useRef(null);
  const timerRef = useRef(null);

  // Helper functions for user-specific storage
  const getCustomSubjectsKey = (userId) => `customSubjects_${userId}`;
  const getStudyHistoryKey = (userId) => `studyHistory_${userId}`;

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      const userData = JSON.parse(user);
      setCurrentUserId(userData.id);
      setCurrentUserName(userData.username || "Learner");
      setIsAuthenticated(true);
      
      // Load user-specific custom subjects
      const customSubjectsData = localStorage.getItem(getCustomSubjectsKey(userData.id));
      if (customSubjectsData) {
        setCustomSubjects(JSON.parse(customSubjectsData));
      }
      
      // Load user-specific study history
      const historyData = localStorage.getItem(getStudyHistoryKey(userData.id));
      if (historyData) {
        setStudyHistory(JSON.parse(historyData));
      }
    }
  }, []);

  // Save custom subjects to user-specific localStorage
  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem(getCustomSubjectsKey(currentUserId), JSON.stringify(customSubjects));
    }
  }, [customSubjects, currentUserId]);

  // Save study history to user-specific localStorage
  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem(getStudyHistoryKey(currentUserId), JSON.stringify(studyHistory));
    }
  }, [studyHistory, currentUserId]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem('token');
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setCurrentUserId(null);
    setCurrentUserName("Learner");
    setPlan([]);
    setStudyHistory([]);
    setCustomSubjects({});
  };

  // Show snackbar
  const showSnackbar = (message, type = 'success') => {
    setSnackbar({ open: true, message, type });
  };

  const scrollToSection = (ref, fallbackMessage) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (fallbackMessage) {
      showSnackbar(fallbackMessage, "info");
    }
    if (plannerRef.current) {
      plannerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Format timer
  const formatTimer = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // ===============================
  // CUSTOM SUBJECT CREATION
  // ===============================
  const handleCreateCustomSubject = () => {
    if (!customSubjectName.trim()) {
      showSnackbar('Please enter subject name', 'error');
      return;
    }

    if (!customTopics.Beginner.trim() && !customTopics.Intermediate.trim() && !customTopics.Advanced.trim()) {
      showSnackbar('Please add at least one topic', 'error');
      return;
    }

    const parseTopics = (text) => text.split('\n').map(t => t.trim()).filter(t => t.length > 0);

    const newSubject = {
      emoji: "🎯",
      fullName: customSubjectName,
      description: `Custom learning path for ${customSubjectName}`,
      Beginner: parseTopics(customTopics.Beginner),
      Intermediate: parseTopics(customTopics.Intermediate),
      Advanced: parseTopics(customTopics.Advanced),
    };

    setCustomSubjects({
      ...customSubjects,
      [customSubjectName]: newSubject
    });

    setSubject(customSubjectName);
    setShowCustomDialog(false);
    setCustomSubjectName("");
    setCustomTopics({ Beginner: "", Intermediate: "", Advanced: "" });
    setCustomLevelTab(0);
    showSnackbar(`Custom subject "${customSubjectName}" created.`);
  };

  const allSubjects = { ...SUBJECTS_DB, ...customSubjects };

  // ===============================
  // GENERATE PLAN - FIXED
  // ===============================
  const generatePlan = async () => {
    try {
      // Get the selected subject data
      const selectedSubjectData = allSubjects[subject];
      if (!selectedSubjectData) {
        showSnackbar('Subject not found', 'error');
        return;
      }

      // Get topics for the selected level
      const topics = selectedSubjectData[level] || [];
      if (topics.length === 0) {
        showSnackbar('No topics available for this level', 'error');
        return;
      }

      // Create plan structure locally (don't rely on backend for formatting)
      const hoursPerTopic = hours / Math.ceil(topics.length / days);
      const topicsPerDay = Math.ceil(topics.length / days);
      
      const planData = [];
      let topicIndex = 0;

      for (let day = 1; day <= days && topicIndex < topics.length; day++) {
        const dayTopics = [];
        for (let i = 0; i < topicsPerDay && topicIndex < topics.length; i++) {
          dayTopics.push({
            name: topics[topicIndex],
            completed: false,
            hours: hoursPerTopic.toFixed(1)
          });
          topicIndex++;
        }
        
        planData.push({
          day,
          topics: dayTopics
        });
      }

      // Set plan immediately with properly formatted data
      setPlan(planData);
      setCurrentPlanId(Date.now());

      // Add to history
      const historyEntry = {
        id: Date.now(),
        subject,
        level,
        days,
        hours,
        createdAt: new Date().toLocaleDateString(),
        completionPercentage: 0,
      };
      setStudyHistory([historyEntry, ...studyHistory]);

      showSnackbar('Study plan generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      showSnackbar('Error generating plan', 'error');
    }
  };

  // ===============================
  // TOGGLE COMPLETION
  // ===============================
  const toggleSubtopic = async (dayIndex, subIndex) => {
    const updated = [...plan];
    updated[dayIndex].topics[subIndex].completed =
      !updated[dayIndex].topics[subIndex].completed;

    try {
      await fetch(`${API_URL}/api/plans/1/progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          day: dayIndex + 1,
          topic: updated[dayIndex].topics[subIndex].name,
          completed: updated[dayIndex].topics[subIndex].completed,
        }),
      });

      setPlan(updated);
      const action = updated[dayIndex].topics[subIndex].completed
        ? "completed"
        : "uncompleted";
      showSnackbar(`Topic ${action}!`);
    } catch (error) {
      showSnackbar("Error updating progress", "error");
    }
  };

  // ===============================
  // PROGRESS
  // ===============================
  const dayProgress = (day) => {
    const total = day.topics.length;
    const completed = day.topics.filter((s) => s.completed).length;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  // ===============================
  // STATUS
  // ===============================
  const statusInfo = (day) => {
    const p = dayProgress(day);
    if (p < 50) return { text: "Behind", color: COLORS.behind };
    if (p < 80) return { text: "On Track", color: COLORS.track };
    return { text: "Ahead", color: COLORS.ahead };
  };

  // ===============================
  // CHART DATA
  // ===============================
  const barData = plan.map((day) => ({
    name: `Day ${day.day}`,
    progress: dayProgress(day),
  }));

  const pieData = [
    {
      name: "Completed",
      value: plan.reduce((s, d) => s + d.topics.filter((x) => x.completed).length, 0) || 0,
    },
    {
      name: "Remaining",
      value: plan.reduce((s, d) => s + d.topics.filter((x) => !x.completed).length, 0) || 0,
    },
  ];

  const totalProgress = pieData[0].value + pieData[1].value > 0
    ? Math.round((pieData[0].value / (pieData[0].value + pieData[1].value)) * 100)
    : 0;

  // Show auth page if not logged in
  if (!isAuthenticated) {
    return <Auth onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const currentSubjectData = allSubjects[subject];
  const totalTopics = plan.reduce((sum, day) => sum + (day.topics?.length || 0), 0);
  const completedTopics = plan.reduce(
    (sum, day) => sum + day.topics.filter((topic) => topic.completed).length,
    0
  );
  const productivityScore = totalTopics
    ? Math.round((completedTopics / totalTopics) * 100)
    : 0;
  const plannedHours = plan.reduce(
    (sum, day) =>
      sum +
      day.topics.reduce((topicSum, topic) => topicSum + Number(topic.hours || 0), 0),
    0
  );
  const displayHours = plannedHours > 0 ? plannedHours : days * hours;
  const upcomingTopics = plan.flatMap((day) =>
    day.topics.map((topic) => ({ day: day.day, name: topic.name }))
  ).slice(0, 3);
  const timeSlots = ["3:00 PM", "5:00 PM", "7:00 PM"];
  const planPalette = [
    { bg: "rgba(59, 130, 246, 0.16)", color: "#2563eb" },
    { bg: "rgba(239, 68, 68, 0.16)", color: "#dc2626" },
    { bg: "rgba(16, 185, 129, 0.18)", color: "#059669" },
  ];
  const missingSkills = currentSubjectData?.[level]?.slice(0, 3) || [];
  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  })();

  // ===============================
  // UI
  // ===============================
  return (
    <Box className="app-shell">
      <Box className="app-frame">
      <Box className="app-sidebar">
        <Box className="sidebar-brand">
          <SchoolRoundedIcon fontSize="small" />
        </Box>
        <Box className="nav-group" sx={{ mt: "auto" }}>
          <IconButton className="nav-btn active" onClick={() => scrollToSection(homeRef)}>
            <HomeRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton className="nav-btn" onClick={() => scrollToSection(plannerRef)}>
            <EventNoteRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton
            className="nav-btn"
            onClick={() => scrollToSection(analyticsRef, "Generate a plan to see analytics.")}
          >
            <AutoGraphRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton
            className="nav-btn"
            onClick={() => scrollToSection(timerRef, "Generate a plan to use the timer.")}
          >
            <TimerRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box className="nav-group">
          <IconButton
            className="nav-btn"
            onClick={() => setShowHistory(!showHistory)}
          >
            <HistoryRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton className="nav-btn" onClick={handleLogout}>
            <SettingsRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box className="app-main">
        <Box className="topbar">
          <Box className="topbar-title">
            <SchoolRoundedIcon />
            <Typography variant="h6">AI Study Planner</Typography>
          </Box>
          <Box className="topbar-actions">
            <IconButton
              className="icon-btn"
              onClick={() => setShowHistory(!showHistory)}
            >
              <HistoryRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton className="icon-btn">
              <Badge variant="dot" color="error">
                <NotificationsNoneRoundedIcon />
              </Badge>
            </IconButton>
            <Box className="user-pill">
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  bgcolor: "rgba(79, 140, 255, 0.6)",
                  fontSize: "0.9rem",
                }}
              >
                {(currentUserName || "U").charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body2">{currentUserName}</Typography>
              <KeyboardArrowDownRoundedIcon fontSize="small" />
            </Box>
            <Button
              variant="text"
              onClick={handleLogout}
              sx={{ color: "rgba(226, 232, 240, 0.9)", textTransform: "none" }}
            >
              Logout
            </Button>
          </Box>
        </Box>

        <Box className="app-content">
          {showHistory && (
            <Card className="panel panel-light history-card">
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Your Study History
                  </Typography>
                  <Button size="small" onClick={() => setShowHistory(false)}>Close</Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                {studyHistory.length === 0 ? (
                  <Typography color="textSecondary">No study history yet. Start planning!</Typography>
                ) : (
                  <List>
                    {studyHistory.map((entry) => (
                      <ListItem key={entry.id}>
                        <ListItemText
                          primary={`${allSubjects[entry.subject]?.fullName || entry.subject} - ${entry.level}`}
                          secondary={`${entry.createdAt} | ${entry.days} days x ${entry.hours}h/day`}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          )}

          <Box className="greeting-row" ref={homeRef}>
            <Typography variant="h4" className="greeting">
              {greeting}, {currentUserName} <span className="greeting-emoji">👋</span>
            </Typography>
            <Button
              className="cta-btn"
              variant="contained"
              sx={{
                textTransform: "none",
                boxShadow: "0 12px 24px rgba(34, 211, 238, 0.3)",
                "&:hover": {
                  boxShadow: "0 14px 28px rgba(34, 211, 238, 0.4)",
                },
              }}
              onClick={() => setShowCustomDialog(true)}
            >
              Create Custom Plan
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Card className="panel panel-dark goal-card" sx={{ mb: 3 }}>
                <CardContent>
                  <Box className="goal-header">
                    <Typography className="section-title">Today's Goal</Typography>
                    <Box className="goal-indicator">
                      <Box className={`status-dot ${plan.length ? "status-dot--active" : ""}`} />
                      <Typography variant="caption">
                        {plan.length ? "Active Plan" : "No Plan Yet"}
                      </Typography>
                    </Box>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box className="metric-card">
                        <Box className="metric-icon">
                          <EventNoteRoundedIcon fontSize="small" />
                        </Box>
                        <Box>
                          <Typography className="metric-label">Study Sessions</Typography>
                          <Typography className="metric-value">{plan.length || days}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box className="metric-card">
                        <Box className="metric-icon">
                          <TimerRoundedIcon fontSize="small" />
                        </Box>
                        <Box>
                          <Typography className="metric-label">Total Hours</Typography>
                          <Typography className="metric-value">{displayHours.toFixed(1)}h</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box className="metric-card">
                        <Box className="metric-icon">
                          <AutoGraphRoundedIcon fontSize="small" />
                        </Box>
                        <Box>
                          <Typography className="metric-label">Productivity</Typography>
                          <Typography className="metric-value">{productivityScore}%</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box className="metric-card">
                        <Box className="metric-icon">
                          <CheckCircleIcon fontSize="small" />
                        </Box>
                        <Box>
                          <Typography className="metric-label">Tasks Done</Typography>
                          <Typography className="metric-value">
                            {completedTopics}/{totalTopics || 0}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" sx={{ color: "#cbd5f5" }}>
                      Progress Snapshot
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={productivityScore}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        background: "rgba(255,255,255,0.1)",
                        mt: 1,
                        "& .MuiLinearProgress-bar": {
                          background: "linear-gradient(135deg, #4f8cff, #22d3ee)",
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>

              <Card className="panel panel-light plan-card" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography className="section-title">Smart Study Plan</Typography>
                  <Box sx={{ mt: 2 }}>
                    {upcomingTopics.length > 0 ? (
                      upcomingTopics.map((topic, index) => (
                        <Box className="plan-list-item" key={`${topic.day}-${index}`}>
                          <Box className="plan-row">
                            <Box className="plan-dot" />
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {timeSlots[index % timeSlots.length]}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                Day {topic.day}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body2" color="textSecondary">
                            {topic.name}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Generate a plan to see your upcoming study sessions.
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Box ref={plannerRef}>
                <Card className="panel panel-light planner-card" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography className="section-title">Smart Study Planner</Typography>
                  <Typography variant="body2" sx={{ color: "#475569", mt: 0.5, mb: 2 }}>
                    Build a focused schedule around your goals.
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth className="glass-input">
                        <InputLabel>Subject</InputLabel>
                        <Select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          label="Subject"
                        >
                          {Object.entries(allSubjects).map(([key, data]) => (
                            <MenuItem key={key} value={key}>
                              {data.fullName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Exam Date"
                        type="date"
                        fullWidth
                        className="glass-input"
                        value={examDate}
                        onChange={(e) => setExamDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Duration (days)"
                        type="number"
                        fullWidth
                        className="glass-input"
                        value={days}
                        onChange={(e) => setDays(Math.max(1, +e.target.value))}
                        inputProps={{ min: 1, max: 365 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Daily study hours"
                        type="number"
                        fullWidth
                        className="glass-input"
                        value={hours}
                        onChange={(e) => setHours(Math.max(0.5, +e.target.value))}
                        inputProps={{ min: 0.5, step: 0.5 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth className="glass-input">
                        <InputLabel>Level</InputLabel>
                        <Select
                          value={level}
                          onChange={(e) => setLevel(e.target.value)}
                          label="Level"
                        >
                          <MenuItem value="Beginner">Beginner</MenuItem>
                          <MenuItem value="Intermediate">Intermediate</MenuItem>
                          <MenuItem value="Advanced">Advanced</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth
                    variant="contained"
                    className="cta-btn"
                    sx={{
                      mt: 2,
                      textTransform: "none",
                      background: "linear-gradient(135deg, #4f8cff, #22d3ee)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #3b7dff, #1fc9e5)",
                      },
                    }}
                    onClick={generatePlan}
                  >
                    Generate Study Plan
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      mt: 1.5,
                      borderColor: "rgba(15, 23, 42, 0.2)",
                      color: "#0f172a",
                      textTransform: "none",
                    }}
                    onClick={() => setShowCustomDialog(true)}
                  >
                    Create Custom Plan
                  </Button>
                </CardContent>
              </Card>
              </Box>

              <Card className="panel panel-light analysis-card" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography className="section-title">Skill Gap Analysis</Typography>
                  <FormControl fullWidth className="glass-input" sx={{ mt: 2 }}>
                    <InputLabel>Focus Track</InputLabel>
                    <Select
                      value={analysisTrack}
                      onChange={(e) => setAnalysisTrack(e.target.value)}
                      label="Focus Track"
                    >
                      <MenuItem value="Software Engineer">Software Engineer</MenuItem>
                      <MenuItem value="Data Scientist">Data Scientist</MenuItem>
                      <MenuItem value="Frontend Developer">Frontend Developer</MenuItem>
                    </Select>
                  </FormControl>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                    <Chip label={subject} className="chip-skill" />
                    <Chip label={level} className="chip-skill" />
                  </Box>
                  <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 600, color: "#0f172a" }}>
                    Missing Skills
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {missingSkills.length > 0 ? (
                      missingSkills.map((skill) => (
                        <Typography key={skill} variant="body2" sx={{ color: "#475569", mb: 0.5 }}>
                          - {skill.split(" - ")[0]}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Generate a plan to see suggested skills.
                      </Typography>
                    )}
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      textTransform: "none",
                      background: "linear-gradient(135deg, #2f7ef7, #23d5ee)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #2a6ee0, #1bc3d8)",
                      },
                    }}
                  >
                    View Recommendations
                  </Button>
                </CardContent>
              </Card>

              {plan.length > 0 && (
                <Box ref={timerRef}>
                  <Card className="panel panel-dark timer-card">
                    <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                          Study Timer
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 700, color: "#e2e8f0", fontFamily: "monospace" }}>
                          {formatTimer(timerSeconds)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Button
                          variant="contained"
                          className="cta-btn"
                          startIcon={timerActive ? <PauseIcon /> : <PlayArrowIcon />}
                          sx={{
                            textTransform: "none",
                            background: "linear-gradient(135deg, #4f8cff, #22d3ee)",
                            "&:hover": {
                              background: "linear-gradient(135deg, #3b7dff, #1fc9e5)",
                            },
                          }}
                          onClick={() => setTimerActive(!timerActive)}
                        >
                          {timerActive ? "Pause" : "Start"}
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{ borderColor: "rgba(226, 232, 240, 0.4)", color: "#e2e8f0", textTransform: "none" }}
                          startIcon={<StopIcon />}
                          onClick={() => { setTimerSeconds(0); setTimerActive(false); showSnackbar('Timer reset'); }}
                        >
                          Reset
                        </Button>
                      </Box>
                    </Box>
                    </CardContent>
                  </Card>
                </Box>
              )}
            </Grid>
          </Grid>

          {/* CUSTOM SUBJECT DIALOG */}
          <Dialog open={showCustomDialog} onClose={() => setShowCustomDialog(false)} maxWidth="md" fullWidth>
            <DialogTitle sx={{ fontWeight: 600, fontSize: '1.3rem', background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`, color: '#fff' }}>
              Create Custom Study Plan
            </DialogTitle>
            <DialogContent sx={{ pt: 3 }}>
              <TextField
                fullWidth
                label="Subject Name"
                placeholder="e.g., Advanced Databases, Cloud Computing"
                value={customSubjectName}
                onChange={(e) => setCustomSubjectName(e.target.value)}
                sx={{ mb: 3 }}
              />

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Add Topics by Level
              </Typography>

              <Tabs value={customLevelTab} onChange={(e, v) => setCustomLevelTab(v)} sx={{ mb: 2, borderBottom: `2px solid ${COLORS.secondary}` }}>
                <Tab label="Beginner" sx={{ fontWeight: 600 }} />
                <Tab label="Intermediate" sx={{ fontWeight: 600 }} />
                <Tab label="Advanced" sx={{ fontWeight: 600 }} />
              </Tabs>

              <Box sx={{ display: customLevelTab === 0 ? 'block' : 'none' }}>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                  Add beginner-level topics (one per line)
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  label="Beginner Topics"
                  placeholder={"Topic 1\nTopic 2\nTopic 3"}
                  value={customTopics.Beginner}
                  onChange={(e) => setCustomTopics({ ...customTopics, Beginner: e.target.value })}
                />
              </Box>

              <Box sx={{ display: customLevelTab === 1 ? 'block' : 'none' }}>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                  Add intermediate-level topics (one per line)
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  label="Intermediate Topics"
                  placeholder={"Topic 1\nTopic 2\nTopic 3"}
                  value={customTopics.Intermediate}
                  onChange={(e) => setCustomTopics({ ...customTopics, Intermediate: e.target.value })}
                />
              </Box>

              <Box sx={{ display: customLevelTab === 2 ? 'block' : 'none' }}>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                  Add advanced-level topics (one per line)
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  label="Advanced Topics"
                  placeholder={"Topic 1\nTopic 2\nTopic 3"}
                  value={customTopics.Advanced}
                  onChange={(e) => setCustomTopics({ ...customTopics, Advanced: e.target.value })}
                />
              </Box>

              <Alert severity="info" sx={{ mt: 2 }}>
                Tip: Topics will appear exactly as you type them in your study plan!
              </Alert>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => { setShowCustomDialog(false); setCustomTopics({ Beginner: "", Intermediate: "", Advanced: "" }); setCustomLevelTab(0); }}>Cancel</Button>
              <Button variant="contained" sx={{ background: COLORS.primary }} onClick={handleCreateCustomSubject}>
                Create Custom Plan
              </Button>
            </DialogActions>
          </Dialog>

          {plan.length > 0 && (
            <Grid container spacing={3} sx={{ mt: 1, mb: 4 }} ref={analyticsRef}>
              <Grid item xs={12} md={4}>
                <Card className="panel panel-light progress-card">
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Overall Progress
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                      <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                          <Pie data={pieData} dataKey="value" innerRadius={50} outerRadius={80}>
                            <Cell fill={COLORS.ahead} />
                            <Cell fill="#E2E8F0" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: COLORS.primary }}>
                        {totalProgress}%
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {pieData[0].value} of {pieData[0].value + pieData[1].value} completed
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>
                <Card className="panel panel-light progress-card">
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Weekly Progress
                    </Typography>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={barData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Bar dataKey="progress" fill={COLORS.secondary} radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {plan.length > 0 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#e2e8f0" }}>
                Your Study Plan ({days} Days)
              </Typography>
              <Grid container spacing={3}>
                {plan.map((day, i) => {
                  const status = statusInfo(day);
                  return (
                    <Grid item xs={12} key={i}>
                      <Accordion
                        defaultExpanded={i === 0}
                        sx={{
                          borderRadius: 2,
                          border: `2px solid ${status.color}25`,
                          background: "rgba(255,255,255,0.9)",
                        }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ background: "rgba(248, 250, 252, 0.9)", py: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: COLORS.primary, minWidth: 80 }}>
                              Day {day.day}
                            </Typography>
                            <Box sx={{ flex: 1 }}>
                              <LinearProgress variant="determinate" value={dayProgress(day)} sx={{ height: 8, borderRadius: 4, background: "#E2E8F0", "& .MuiLinearProgress-bar": { background: status.color } }} />
                            </Box>
                            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                              <Typography variant="caption" sx={{ fontWeight: 600, color: status.color }}>
                                {dayProgress(day)}%
                              </Typography>
                              <Chip label={status.text} size="small" sx={{ background: status.color, color: "#fff" }} />
                            </Box>
                          </Box>
                        </AccordionSummary>

                        <AccordionDetails sx={{ pt: 3, background: "rgba(250, 251, 252, 0.9)" }}>
                          {day.topics && day.topics.length > 0 ? (
                            <>
                              <List sx={{ p: 0 }}>
                                {day.topics.map((topic, j) => (
                                  <ListItem key={j} sx={{ py: 1.5, borderBottom: "1px solid #E2E8F0", "&:last-child": { borderBottom: "none" }, transition: "all 0.2s", cursor: "pointer", "&:hover": { background: "#F0F9FF" } }} onClick={() => toggleSubtopic(i, j)}>
                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                      {topic.completed ? (
                                        <CheckCircleIcon sx={{ color: COLORS.ahead, fontSize: 24 }} />
                                      ) : (
                                        <RadioButtonUncheckedIcon sx={{ color: "#CBD5E1", fontSize: 24 }} />
                                      )}
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={
                                        <Typography sx={{ fontWeight: 600, textDecoration: topic.completed ? "line-through" : "none", color: topic.completed ? "#94A3B8" : "#1E293B" }}>
                                          {topic.name}
                                        </Typography>
                                      }
                                      secondary={
                                        <Typography variant="caption" sx={{ color: "#64748B" }}>
                                          {topic.hours}h - Click to mark complete
                                        </Typography>
                                      }
                                    />
                                  </ListItem>
                                ))}
                              </List>
                              <Box sx={{ mt: 2, pt: 2, borderTop: "2px solid #E2E8F0" }}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#64748B" }}>
                                  {day.topics.filter(t => t.completed).length} of {day.topics.length} completed
                                </Typography>
                              </Box>
                            </>
                          ) : (
                            <Typography color="textSecondary">No topics for this day</Typography>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}

          {plan.length === 0 && (
            <Paper elevation={0} className="panel panel-light" sx={{ p: 8, textAlign: "center", border: "2px dashed rgba(148, 163, 184, 0.4)" }}>
              <Typography variant="h5" sx={{ color: "#0f172a", fontWeight: 600, mb: 1 }}>
                No Plan Generated Yet
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Choose a subject and click "Generate Study Plan" to start learning.
              </Typography>
            </Paper>
          )}
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity={snackbar.type} sx={{ borderRadius: 2 }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
    </Box>
  );

}

export default App;
