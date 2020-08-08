import React, {useState} from 'react';
import { QuestionCard } from './Components/QuestionCard';
import {fetchQuestions, Difficulty, QuestionState} from './API' 
import {GlobalStyle, Wrapper} from './App.styles'

const TOTAL_QUESTIONS = 10;

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

function App() {
  
  const [loading,setloading] = useState(false);
  const [questions, setQuestion] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setuserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver,setGameOver] = useState(true);
  console.log(questions)
  const startQuiz = async ()=>{
    setloading(true)
    setGameOver(false)
    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS,Difficulty.EASY)
    setQuestion(newQuestions)
    setScore(0)
    setuserAnswer([])
    setNumber(0)
    setloading(false)
  }
  const nextQuestion = ()=>{
    const nextQuestion = number +1;
    if(nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true)
    }else {setNumber(nextQuestion)}
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>)=>{
    if  (!gameOver){
      const answerSelected = e.currentTarget.value;
      const correct = questions[number].correct_answer === answerSelected;
      if (correct){setScore(prev => prev+1)}
      const answerObject = {
        question: questions[number].question,
        answer:answerSelected,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setuserAnswer(prev=>[...prev,answerObject])
    }

  }

  return (
    <>
    <GlobalStyle/>
    <Wrapper>
    <div className="App">
     <h1>Quiz App</h1>
     {gameOver || userAnswers.length===TOTAL_QUESTIONS?    
     <button className='start' onClick={startQuiz}>Start Quiz</button>: null}
     {!gameOver?
     (<p className='score'> Score : {score}</p>):null}
     {loading? (<p>Loading </p>): null}
{!loading && !gameOver ?   ( <QuestionCard
     questionNum={number+1  }
     totalQuestion = {TOTAL_QUESTIONS}
     question={questions[number].question}
     answers={questions[number].answers}
     userAnswer={userAnswers? userAnswers[number]:undefined}
    callback={checkAnswer}
     ></QuestionCard>) :null }
     {!gameOver && !loading && userAnswers.length===number+1 && number !==TOTAL_QUESTIONS-1?
     (<button className='next' onClick={nextQuestion}>Next</button>):null}
     </div>
     </Wrapper>
     </>
  );
}

export default App;
