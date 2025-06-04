import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Edit2, Save, X, CheckCircle2, Circle, Star, Calendar, Target, Zap } from 'lucide-react';

// Main App Component
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [editText, setEditText] = useState('');

  // Add new task
  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks([task, ...tasks]);
      setNewTask('');
      setShowAddForm(false);
    }
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Start editing
  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  // Save edit
  const saveEdit = () => {
    if (editText.trim()) {
      setTasks(tasks.map(task =>
        task.id === editingId ? { ...task, text: editText.trim() } : task
      ));
    }
    setEditingId(null);
    setEditText('');
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
      {/* Hero Section */}
      <HeroSection onAddTask={() => setShowAddForm(true)} />
      
      {/* Benefits Section */}
      <BenefitsSection />
      
      {/* Todo List Section */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Tasks</h2>
            {totalCount > 0 && (
              <div className="text-sm text-gray-600">
                {completedCount} of {totalCount} completed
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {totalCount > 0 && (
            <div className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Add Task Form */}
          {showAddForm && (
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="What needs to be done?"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  autoFocus
                />
                <button
                  onClick={addTask}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 font-medium"
                >
                  <Save size={18} />
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewTask('');
                  }}
                  className="px-4 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Add Task Button */}
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full mb-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-3 font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              <Plus size={24} />
              Add New Task
            </button>
          )}

          {/* Task List */}
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <CheckCircle2 size={64} className="mx-auto opacity-50" />
                </div>
                <h3 className="text-xl font-medium text-gray-500 mb-2">No tasks yet</h3>
                <p className="text-gray-400">Add your first task to get started!</p>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  isEditing={editingId === task.id}
                  editText={editText}
                  onToggle={() => toggleTask(task.id)}
                  onDelete={() => deleteTask(task.id)}
                  onStartEdit={() => startEdit(task.id, task.text)}
                  onSaveEdit={saveEdit}
                  onCancelEdit={cancelEdit}
                  onEditTextChange={setEditText}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Hero Section Component
const HeroSection = ({ onAddTask }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-yellow-300 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-pink-300 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Organize Your
            <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent animate-pulse">
              Life Today
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform chaos into clarity with our beautiful, intuitive task management system. 
            No signup required — just pure productivity.
          </p>
          
          <button
            onClick={onAddTask}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 text-gray-900 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:rotate-1"
          >
            <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            Start Organizing Now
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

// Benefits Section Component
const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Crystal Clear Focus",
      description: "Transform overwhelming thoughts into actionable tasks. See exactly what needs your attention right now."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Boost Productivity",
      description: "Studies show that writing tasks down increases completion rates by 42%. Feel the satisfaction of checking things off."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Reduce Mental Load",
      description: "Free your mind from remembering everything. Let your brain focus on doing instead of storing."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Better Time Management",
      description: "Visualize your workload and make smarter decisions about how to spend your precious time."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Why Lists Change Everything
        </h2>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Science-backed benefits that successful people have known for centuries
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:rotate-1 border border-white/20"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {benefit.title}
            </h3>
            <p className="text-white/70 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Task Item Component
const TaskItem = ({
  task,
  isEditing,
  editText,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditTextChange
}) => {
  return (
    <div className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${
      task.completed 
        ? 'bg-green-50 border-green-200 opacity-75' 
        : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
    }`}>
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          task.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-blue-500'
        }`}
      >
        {task.completed && <Check size={14} />}
      </button>

      {/* Task content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => onEditTextChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter') onSaveEdit();
                if (e.key === 'Escape') onCancelEdit();
              }}
              autoFocus
            />
            <button
              onClick={onSaveEdit}
              className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              <Save size={16} />
            </button>
            <button
              onClick={onCancelEdit}
              className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <span className={`text-gray-800 ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.text}
          </span>
        )}
      </div>

      {/* Action buttons */}
      {!isEditing && (
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={onStartEdit}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;