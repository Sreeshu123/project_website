import React, { useState } from "react";
import testimage from "../media/ip_test_material/visual_test.jpeg"; // Replace with your actual image path
import testaudio from "../media/ip_test_material/audio_test.mp4"; // Replace with your actual audio path
import queimage from "../media/ip_test_material/option3.jpg"; 

const textRecap = `
How Do We Remember Things?     
Your brain helps you remember all kinds of things, like facts for a test or what you ate for breakfast. Memory works in three steps: first, you take in information through your senses, like seeing or hearing. This is called encoding. Next, your brain stores that information in either short-term or long-term memory. Short-term memory is like a chalkboard—it can hold things for a little while. Long-term memory is like a computer that saves things for a long time. Finally, when you need to remember something, your brain retrieves it. This means it brings the information back so you can use it. Sometimes we forget things because we didn't pay attention, or because our brain got too busy!
`;

const textQuestions = [
  {
    question: "What is the first step in remembering something?",
    options: ["Storing", "Encoding", "Retrieving", "Forgetting"],
    correctAnswer: "Encoding",
  },
  {
    question: 'What happens during the "retrieving" step of memory?',
    options: [
      "Your brain brings back information so you can use it.",
      "Your brain forgets information.",
      "Your brain stores information in short-term memory.",
      "Your brain learns new things.",
    ],
    correctAnswer: "Your brain brings back information so you can use it.",
  },
  {
    question:
      "If you are trying to remember your friend's phone number until you can write it down, which type of memory are you using?",
    options: [
      "Long-term memory",
      "Forgetting memory",
      "Short-term memory",
      "Retrieval memory",
    ],
    correctAnswer: "Short-term memory",
  },
  {
    question: "Why might you forget something like where you put your keys?",
    options: [
      "Because your brain retrieved the information",
      "Because you didn’t pay enough attention when putting them down",
      "Because your long-term memory is full",
      "Because your brain encoded the information wrong",
    ],
    correctAnswer:
      "Because you didn’t pay enough attention when putting them down",
  },
  {
    question:
      "Which type of memory do you think is more important for remembering things over many years?",
    options: ["Long-term memory", "Short-term memory", "Encoding", "Retrieval"],
    correctAnswer: "Long-term memory",
  },
  {
    question: "What could help you remember a list of groceries more easily?",
    options: [
      "Reading the list once",
      "Singing the items in a song",
      "Writing it down and forgetting about it",
      "Not thinking about the list at all",
    ],
    correctAnswer: "Singing the items in a song",
  },
];

const visualRecap = `
Look carefully at the image provided and answer the questions based on your memory of it.
`;

const visualQuestions = [
  {
    question: "What shapes are in the image?",
    options: [
      "Circle, square, rectangle",
      "Triangle, circle, square",
      "Square, circle, triangle",
      "Rectangle, triangle, circle",
    ],
    correctAnswer: "Square, circle, triangle",
  },

  {
    question: " Which shape is blue?",
    options: ["Circle", "Triangle", "Square", "Rectangle"],
    correctAnswer: "Circle",
  },

  {
    question: "Which shapes are primary colors (red, blue, green)?",
    options: [
      "Circle and square",
      "Square and triangle",
      "Triangle and circle",
      "All three shapes",
    ],
    correctAnswer: "Triangle and circle",
  },
  {
    question: "Which shapes are symmetrical?",
    options: [
      "Circle and triangle",
      "Square and circle",
      "Only the square",
      "All shapes",
    ],
    correctAnswer: " All shapes",
  },

  {
    question: " Which shape would be the most difficult to replicate freehand?",
    options: ["square", "triangle", "circle", "All"],
    correctAnswer: "circle",
  },

  {
    question: "How many shapes are there in the image?",
    options: ["Two", "Three", "Four", "Five"],
    correctAnswer: "Three",
  },

  {
    question: 'Can this image be created using the shapes given',
    options: ['True', 'False'],
    correctAnswer: 'True', // Assuming the image shows a square, circle, and triangle
    image: queimage, // Path to the image generated or created from shapes
  },

  // Add other visual questions here...
];

const auditoryRecap = `
Listen carefully to the audio clip and answer the questions based on what you remember hearing.
`;

const auditoryQuestions = [
  {
    question: "What was the second sound in the audio clip?",
    options: [
      "A car honking",
      "A high-pitched bell",
      "Thunder",
      "Birds chirping",
    ],
    correctAnswer: "Thunder",
  },

  {
    question: "What does the sound of a car honking typically indicate?",
    options: [
      "A warning or attention",
      "A relaxing atmosphere",
      " The start of a storm",
      "A bird is nearby",
    ],
    correctAnswer: "A warning or attention",
  },

  {
    question:
      "If you wanted to simulate an incoming storm in a soundscape, which of these sounds would you focus on?",
    options: [
      "A car honking",
      "A high-pitched bell",
      "Thunder",
      "Birds chirping",
    ],
    correctAnswer: "Thunder",
  },

  {
    question:
      'Which two sounds in the sequence can be categorized as "natural"',
    options: [
      "Car honking and high-pitched bell",
      " Thunder and birds chirping",
      "High-pitched bell and birds chirping",
      "Thunder and car honking",
    ],
    correctAnswer: " Thunder and birds chirping",
  },

  {
    question:
      "Which sound in the sequence is most likely to be used to grab someone’s attention immediately?",
    options: [
      "A car honking",
      "A high-pitched bell",
      "Thunder",
      "Birds chirping",
    ],
    correctAnswer: "A car honking",
  },

  {
    question:
      " How would you use the sounds to enhance a storytelling scene about a peaceful morning turning into chaos?",
    options: [
      " Birds chirping → Car honking → Thunder",
      " Car honking → Birds chirping → Thunder",
      "Thunder → High-pitched bell → Birds chirping",
      "Thunder → High-pitched bell → Car honking",
    ],
    correctAnswer: "Birds chirping → Car honking → Thunder",
  },
  // Add other auditory questions here...
];

const IPAssessment = ({ updateScoresIP }) => {
  const [currentStep, setCurrentStep] = useState("intro");
  const [currentSection, setCurrentSection] = useState("text");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [sectionScore, setSectionScore] = useState({
    text: 0,
    visual: 0,
    auditory: 0,
  });

  const startSection = (section) => {
    setCurrentSection(section);
    setCurrentQuestionIndex(0);
    setCurrentStep("recap");
  };

  const handleAnswerSelect = (selectedOption) => {
    const currentQuestions = getCurrentQuestions();
    if (currentQuestions && currentQuestionIndex < currentQuestions.length) {
      if (
        selectedOption === currentQuestions[currentQuestionIndex].correctAnswer
      ) {
        setScore((prevScore) => prevScore + 1);
        updateScoresIP(score + 1);
        setSectionScore((prevSectionScore) => ({
          ...prevSectionScore,
          [currentSection]: prevSectionScore[currentSection] + 1,
        }));
      }

      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        if (currentSection === "text") {
          startSection("visual");
        } else if (currentSection === "visual") {
          startSection("auditory");
        } else {
          setCurrentStep("results");
        }
      }
    }
  };

  const getCurrentQuestions = () => {
    switch (currentSection) {
      case "text":
        return textQuestions;
      case "visual":
        return visualQuestions;
      case "auditory":
        return auditoryQuestions;
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        {currentStep === "intro" && (
          <div>
            <h2 className="text-lg font-bold mb-4">General Instructions</h2>
            <div className="mb-4">
              Welcome to the multi-section memory test! This test will assess
              your ability to remember information across three sections:{" "}
              <strong>Text, Visual, and Auditory</strong>. Each section includes
              multiple-choice questions (MCQs) based on the provided content.
              Follow these instructions for a successful attempt:
              <ul className="list-disc pl-5 mt-2 mb-4">
                <li>
                  Read the text or observe/listen carefully before answering the
                  given set of questions.
                </li>
                <li>
                  Each question has four options, and you need to select the one
                  you believe is correct.
                </li>
                <li>Click on your answer to proceed to the next question.</li>
                <li>
                  Try to stay focused and avoid distractions to maximize your
                  recall ability.
                </li>
              </ul>
              Take your time and do your best—good luck!
            </div>
            <button
              onClick={() => startSection("text")}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-200"
            >
              Next
            </button>
          </div>
        )}

        {currentStep === "recap" && (
          <div>
            <h2 className="text-lg font-bold mb-4">
              {currentSection === "text"
                ? "Read passage carefully"
                : currentSection === "visual"
                ? "Visual Memory"
                : "Auditory Memory"}
            </h2>
            <p className="mb-4">
              {currentSection === "text"
                ? textRecap
                : currentSection === "visual"
                ? visualRecap
                : auditoryRecap}
            </p>
            {currentSection === "visual" && (
              <img
                src={testimage}
                alt="Visual Memory Test"
                className="w-full mb-4"
              />
            )}
            {currentSection === "auditory" && (
              <audio controls className="w-full mb-4">
                <source src={testaudio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
            <button
              onClick={() => setCurrentStep("questions")}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-200"
            >
              Start Quiz
              {/* {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} */}
            </button>
          </div>
        )}

        {currentStep === "questions" && (
          <div>
            {getCurrentQuestions()[currentQuestionIndex] ? (
              <>
                <h2 className="text-lg font-bold mb-4">
                  Question {currentQuestionIndex + 1}
                </h2>
                <p className="mb-4">
                  {getCurrentQuestions()[currentQuestionIndex].question}
                </p>
                <div>
                {getCurrentQuestions()[currentQuestionIndex].image&& (
                  <img
                  src={getCurrentQuestions()[currentQuestionIndex].image}
                  alt="Question related visual"
                  className="mb-4"
                />
                  )}
                </div>
                <div>
                  {getCurrentQuestions()[currentQuestionIndex].options.map(
                    (option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        className="block w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow mb-2 hover:bg-blue-600 transition duration-200"
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </>
            ) : (
              <p className="text-red-500">
                Error loading question. Please try again.
              </p>
            )}
          </div>
        )}

        {currentStep === "results" && (
          <div className="text-center">
            <h2 className="text-lg font-bold">Quiz Completed!</h2>
            <p>
              Your total score: {score} out of{" "}
              {textQuestions.length +
                visualQuestions.length +
                auditoryQuestions.length}
            </p>
            <p>
              Text section score: {sectionScore.text} / {textQuestions.length}
            </p>
            <p>
              Visual section score: {sectionScore.visual} /{" "}
              {visualQuestions.length}
            </p>
            <p>
              Auditory section score: {sectionScore.auditory} /{" "}
              {auditoryQuestions.length}
            </p>
            <p className="mt-2">
              {score >= 10 ? "Excellent memory skills!" : "Keep practicing!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IPAssessment;
