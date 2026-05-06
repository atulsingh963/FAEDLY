// Simulated AI Engine for FAEDLY Prototype
import { useChatStore } from "@/store/useChatStore";

const MOCK_RESPONSES: Record<string, string[]> = {
  "Mathematics": [
    "That's a great question about calculus! Let's break down the chain rule.\n\n" +
    "The chain rule states that the derivative of $f(g(x))$ is $f'(g(x)) \\cdot g'(x)$.\n\n" +
    "### Example\n" +
    "If $y = (3x^2 + 1)^4$, then:\n" +
    "- Outer function: $u^4 \\rightarrow 4u^3$\n" +
    "- Inner function: $3x^2 + 1 \\rightarrow 6x$\n\n" +
    "**Result**: $4(3x^2 + 1)^3 \\cdot 6x = 24x(3x^2 + 1)^3$\n\n" +
    "Does that make sense?",
    
    "Quadratic equations follow the form $ax^2 + bx + c = 0$. You can solve them using the quadratic formula:\n\n" +
    "$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$\n\n" +
    "Would you like to try solving one together?"
  ],
  "Computer Science": [
    "Recursion is a programming pattern where a function calls itself. It usually needs two parts:\n" +
    "1. **Base Case**: The condition where it stops.\n" +
    "2. **Recursive Step**: The part where it calls itself with a smaller input.\n\n" +
    "Here is a quick Python example:\n" +
    "```python\n" +
    "def factorial(n):\n" +
    "    if n <= 1: return 1\n" +
    "    return n * factorial(n - 1)\n" +
    "```\n\n" +
    "Notice how it stops when `n <= 1`?",
    
    "Object-Oriented Programming (OOP) is based on four main pillars:\n\n" +
    "- **Encapsulation**: Hiding internal state.\n" +
    "- **Abstraction**: Hiding complex implementation.\n" +
    "- **Inheritance**: Creating new classes from existing ones.\n" +
    "- **Polymorphism**: Using a single interface for different types.\n\n" +
    "Which of these would you like me to explain further?"
  ],
  "Physics": [
    "Newton's Second Law of Motion is foundational in classical mechanics.\n\n" +
    "It states that the force acting on an object is equal to the mass of that object times its acceleration ($F = ma$).\n\n" +
    "> **Real-world example**: Pushing a car (high mass) takes much more force to accelerate than pushing a bicycle (low mass).\n\n" +
    "Ready for a practice problem?",
  ],
  "Biology": [
    "DNA replication is a semi-conservative process.\n\n" +
    "Here are the main enzymes involved:\n" +
    "- **Helicase**: Unzips the double helix.\n" +
    "- **DNA Polymerase**: Adds complementary bases.\n" +
    "- **Primase**: Places an RNA primer to start.\n" +
    "- **Ligase**: Glues Okazaki fragments together.\n\n" +
    "Do you want a mnemonic to remember these?"
  ]
};

const DEFAULT_RESPONSE = "I'm your FAEDLY AI Tutor. I can help explain concepts, generate quizzes, or walk you through practice problems. What would you like to study today?";

// Simulate a streaming AI response
export async function simulateAIResponse(prompt: string, subject: string, sessionId: string) {
  const store = useChatStore.getState();
  
  // Create an empty message for the AI first
  const messageId = crypto.randomUUID();
  store.addMessage(sessionId, {
    id: messageId,
    role: "assistant",
    content: "",
    timestamp: Date.now()
  });

  store.setTyping(true);
  
  // Simulate thinking delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));
  
  store.setTyping(false);

  // Select response
  const subjectResponses = MOCK_RESPONSES[subject] || [DEFAULT_RESPONSE];
  const fullResponse = subjectResponses[Math.floor(Math.random() * subjectResponses.length)];
  
  // Streaming simulation
  const chunks = fullResponse.split(/(?<=\s|-)/); // split by spaces but keep them
  
  for (let i = 0; i < chunks.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 15 + Math.random() * 30));
    useChatStore.getState().updateMessageContent(sessionId, messageId, chunks[i]);
  }
}
